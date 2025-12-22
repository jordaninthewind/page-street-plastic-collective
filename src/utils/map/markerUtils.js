import { Marker } from "mapbox-gl";

import { MARKER_TYPES } from "@app/constants";

export const createMarker = (marker, onClick = () => {}) => {
  const { id, lng, lat, state } = marker;

  const el = document.createElement("div");

  el.innerHTML = `
    <div>
      <h3>Marker ${id}</h3>
      <p>State: ${state || "temporary"}</p>
    </div>
  `;

  el.style.backgroundColor = MARKER_TYPES[state]?.color || "red";
  el.style.padding = "10px";
  el.style.borderRadius = "5px";
  el.style.cursor = "pointer";
  el.style.zIndex = 1000;

  el.addEventListener("click", () => {
    onClick(marker);
  });

  return new Marker(el).setLngLat([lng, lat]);
};
