import mapboxgl from "mapbox-gl";

const addMarkerToMapState = (map, lngLat) => {
  const marker = new mapboxgl.Marker().setLngLat(lngLat).addTo(map);
  return marker;
};

export { addMarkerToMapState };
