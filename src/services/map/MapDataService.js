// TODO: Improve error handling in ADC Component
export const searchNearbyAddresses = async (
  longitude,
  latitude,
  radius = 30
) => {
  const query = `
            [out:json];
            node(around:${radius},${latitude},${longitude})[~"^addr:"~"."];
            out;
            `;

  const response = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: "data=" + encodeURIComponent(query),
  });

  if (!response.ok) {
    return { error: "Failed to fetch from Overpass API", results: [] };
  }

  const data = await response.json();

  const results = data.elements
    .filter(
      (el) =>
        el.tags &&
        (el.tags["addr:street"] ||
          el.tags["addr:housenumber"] ||
          el.tags["addr:full"])
    )
    .map((el) => ({
      id: el.id,
      text:
        el.tags["addr:full"] ||
        [el.tags["addr:housenumber"], el.tags["addr:street"]]
          .filter(Boolean)
          .join(" ") ||
        "Unnamed Address",
    }));

  return { results, error: null };
};
