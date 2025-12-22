import { createMarker } from "@app/utils/map/markerUtils";

const addMarkerToMapState = (map, marker, onClick = () => {}) => {
  createMarker(marker, onClick).addTo(map);
};

export { addMarkerToMapState };
