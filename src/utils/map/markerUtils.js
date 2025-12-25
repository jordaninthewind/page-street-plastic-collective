import { Marker } from "mapbox-gl";

import CoverLogo from "@app/assets/cover-logo.svg";
import { MARKER_TYPES } from "@app/constants";

export const createMarker = (marker, onClick = () => {}) => {
  const { id, lng, lat, covered = false } = marker;

  const el = document.createElement("div");

  const style = {
    backgroundColor: MARKER_TYPES[covered ? "covered" : "missing"].color,
    cursor: "pointer",
    width: "40px",
    height: "40px",
    padding: "2px",
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
