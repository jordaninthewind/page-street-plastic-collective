import "./Marker.css";
import mapboxgl from "mapbox-gl";
import { createPortal } from "react-dom";

import { useEffect, useRef } from "react";

import CoverLogo from "@app/assets/cover-logo.svg";
import { useSearchParamState } from "@app/hooks";
import { isStale } from "@app/utils";

const Marker = ({ map, marker }) => {
  const markerRef = useRef(null);
  const contentRef = useRef(document.createElement("div"));

  const { filter, setParams, id: selectedId } = useSearchParamState();

  const { id, lng, lat, covered, updated_at: updatedAt } = marker;

  const state = covered ? "marker-covered" : "marker-missing";
  const temporary = !id ? "marker-temporary" : "";
  const isStaleMarker = isStale(updatedAt) ? "marker-stale" : "";
  const isSelected = selectedId === id ? "marker-selected" : "";

  useEffect(() => {
    markerRef.current = new mapboxgl.Marker(contentRef.current)
      .setLngLat([lng, lat])
      .addTo(map);

    return () => {
      markerRef.current.remove();
    };
  }, [map, lng, lat]);

  const handleClick = () => {
    if (id && lat && lng) {
      setParams({ id, lat, lng });
    }
  };

  if ((filter === "covered" && !covered) || (filter === "missing" && covered)) {
    return null;
  }

  return createPortal(
    <div
      className={`marker ${temporary || state} ${isStaleMarker} ${isSelected}`}
      onClick={handleClick}
    >
      <img src={CoverLogo} alt={`Marker ${id}`} className="marker-image" />
    </div>,
    contentRef.current
  );
};

export default Marker;
