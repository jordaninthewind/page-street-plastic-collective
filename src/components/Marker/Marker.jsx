import "./Marker.css";
import mapboxgl from "mapbox-gl";
import { createPortal } from "react-dom";

import React, { useEffect, useRef } from "react";

import CoverLogo from "@app/assets/cover-logo.svg";
import { isStale } from "@app/utils";

const Marker = ({ map, marker, onClick }) => {
  const markerRef = useRef(null);
  const contentRef = useRef(document.createElement("div"));
  const { id, lng, lat, covered, updated_at } = marker;

  useEffect(() => {
    markerRef.current = new mapboxgl.Marker(contentRef.current)
      .setLngLat([lng, lat])
      .addTo(map);

    return () => {
      markerRef.current.remove();
    };
  }, [map, lng, lat]);

  return (
    <>
      {createPortal(
        <div
          className={`marker ${covered ? "marker-covered" : "marker-missing"} ${isStale(updated_at) ? "marker-stale" : ""}`}
          onClick={() => onClick(marker)}
        >
          <img src={CoverLogo} alt={`Marker ${id}`} className="marker-image" />
        </div>,
        contentRef.current
      )}
    </>
  );
};

export default Marker;
