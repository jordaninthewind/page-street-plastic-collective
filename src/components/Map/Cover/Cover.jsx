import "./Cover.css";
import mapboxgl from "mapbox-gl";
import { createPortal } from "react-dom";

import { useEffect, useRef } from "react";

import CoverLogo from "@app/assets/cover-logo.svg";
import { useSearchParamState } from "@app/hooks";
import { isStale } from "@app/utils";

const Cover = ({ map, cover }) => {
  const markerRef = useRef(null);
  const contentRef = useRef(document.createElement("div"));

  const { filter, setParams, id: selectedId } = useSearchParamState();

  const { id, lng, lat, covered, updated_at: updatedAt } = cover;

  const state = covered ? "cover-covered" : "cover-missing";
  const temporary = !id ? "cover-temporary" : "";
  const isStaleCover = isStale(new Date(updatedAt)) ? "cover-stale" : "";
  const isSelected = selectedId === id ? "cover-selected" : "";

  useEffect(() => {
    if (map) {
      markerRef.current = new mapboxgl.Marker(contentRef.current)
        .setLngLat([lng, lat])
        .addTo(map);
    }

    return () => markerRef.current?.remove();
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
      className={`cover ${temporary || state} ${isStaleCover} ${isSelected}`}
      onClick={handleClick}
    >
      <img src={CoverLogo} alt={`Cover ${id}`} className="cover-image" />
    </div>,
    contentRef.current
  );
};

export default Cover;
