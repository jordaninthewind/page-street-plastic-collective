import { Marker } from "mapbox-gl";

import CoverLogo from "@app/assets/cover-logo.svg";
import { MARKER_TYPES } from "@app/constants";

export const createMarker = (marker, onClick = () => {}) => {
  const { id, lng, lat, state = "temporary" } = marker;

  const el = document.createElement("div");

  const style = {
    backgroundColor: MARKER_TYPES[state].color,
    cursor: "pointer",
    zIndex: 1000,
    width: "80px",
    height: "80px",
    padding: "10px",
    objectFit: "contain",
    borderRadius: "50%",
  };

  el.innerHTML = `
    <img src="${CoverLogo}" alt="Marker ${id}" style="width: 100%; height: 100%;" />
  `;

  Object.assign(el.style, style);

  el.addEventListener("click", () => onClick(marker));

  return new Marker(el).setLngLat([lng, lat]);
};
