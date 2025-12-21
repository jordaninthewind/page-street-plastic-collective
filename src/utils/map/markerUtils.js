import { Marker } from "mapbox-gl";

import { MARKER_TYPES } from "@app/constants";

const createMarker = (lngLat, type = MARKER_TYPES.TEMPORARY.name) =>
  new Marker({ color: MARKER_TYPES[type].color }).setLngLat(lngLat);

export { createMarker };
