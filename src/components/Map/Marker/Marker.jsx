import "./Marker.css";
import mapboxgl from "mapbox-gl";
import { createPortal } from "react-dom";

import { useCallback } from "react";
import { useEffect, useRef } from "react";

import CoverLogo from "@app/assets/cover-logo.svg";
import { useSearchParamState } from "@app/hooks";
import { isStale } from "@app/utils";

const Marker = ({ map, marker }) => {
  const markerRef = useRef(null);
  const contentRef = useRef(document.createElement("div"));

  const { filter, setParams } = useSearchParamState();

  const { id, lng, lat, covered, updated_at: updatedAt } = marker;

  useEffect(() => {
    markerRef.current = new mapboxgl.Marker(contentRef.current)
      .setLngLat([lng, lat])
      .addTo(map);

    return () => {
      markerRef.current.remove();
    };
  }, [map, lng, lat]);

  const handleClick = useCallback(() => setParams({ id }), [setParams, id]);

  if ((filter === "covered" && !covered) || (filter === "missing" && covered)) {
    return null;
  }

  return createPortal(
    <div
      className={`marker ${covered ? "marker-covered" : "marker-missing"} ${isStale(updatedAt) ? "marker-stale" : ""}`}
      onClick={handleClick}
    >
      <img src={CoverLogo} alt={`Marker ${id}`} className="marker-image" />
    </div>,
    contentRef.current
  );
};

export default Marker;
