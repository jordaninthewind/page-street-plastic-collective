import mapboxgl from "mapbox-gl";
import { createPortal } from "react-dom";

import React, { useEffect, useRef } from "react";

import { useTheme } from "@mui/material/styles";

import CoverLogo from "@app/assets/cover-logo.svg";

const Marker = ({ map, marker, onClick }) => {
  const { palette } = useTheme();
  const { id, lng, lat, covered = false } = marker;

  const markerRef = useRef(null);
  const contentRef = useRef(document.createElement("div"));

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
          onClick={() => onClick(marker)}
          style={{
            backgroundColor: covered
              ? palette.primary.main
              : palette.secondary.main,
            cursor: "pointer",
            width: "40px",
            height: "40px",
            padding: "2px",
            objectFit: "contain",
            borderRadius: "50%",
          }}
        >
          <img
            src={CoverLogo}
            alt={`Marker ${id}`}
            style={{ width: "100%", height: "100%" }}
          />
        </div>,
        contentRef.current
      )}
    </>
  );
};

export default Marker;
