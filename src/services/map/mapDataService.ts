interface SearchNearbyAddressesResponse {
  results: {
    id: string;
    text: string;
  }[];
  error: string | null;
}

export const searchNearbyAddresses = async (
  longitude: number,
  latitude: number,
  radius = 30
): Promise<SearchNearbyAddressesResponse> => {
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
      (el: any) =>
        el.tags &&
        (el.tags["addr:street"] ||
          el.tags["addr:housenumber"] ||
          el.tags["addr:full"])
    )
    .map((el: any) => ({
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
