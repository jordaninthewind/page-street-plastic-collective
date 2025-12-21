import mapboxgl from "mapbox-gl";

const MARKER_TYPES = {
  TEMPORARY: "temporary",
  MISSING: "missing",
  COVERED: "covered",
};

const addMarkerToMapState = (map, lngLat, type = MARKER_TYPES.TEMPORARY) => {
  const marker = new mapboxgl.Marker({
    color:
      type === MARKER_TYPES.TEMPORARY
        ? "red"
        : type === MARKER_TYPES.MISSING
          ? "blue"
          : "green",
  })
    .setLngLat(lngLat)
    .addTo(map);
  return marker;
};

export { addMarkerToMapState };
