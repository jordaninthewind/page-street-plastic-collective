import mapboxgl from "mapbox-gl";

const addMarkerToMap = (map, lngLat) => {
  const marker = new mapboxgl.Marker().setLngLat(lngLat).addTo(map);
  return marker;
};

export { addMarkerToMap };
