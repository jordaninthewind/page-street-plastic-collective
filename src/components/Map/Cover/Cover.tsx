import "./Cover.css";
import mapboxgl from "mapbox-gl";
import { createPortal } from "react-dom";

import { useEffect, useRef } from "react";

import CoverLogo from "@app/assets/cover-logo.svg";
import { useSearchParamState } from "@app/hooks";
import { isStale } from "@app/utils";
import type { Cover as CoverType, Event } from "@app/types";

interface TemporaryCover {
  id: null;
  lat: string | null;
  lng: string | null;
}

type CoverProps = {
  map: mapboxgl.Map | null;
  cover: CoverType | TemporaryCover;
};

const Cover = ({ map, cover }: CoverProps) => {
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const contentRef = useRef<HTMLDivElement>(document.createElement("div"));

  const { filter, setParams, id: selectedId } = useSearchParamState();

  const { id, lng, lat } = cover;
  const events = "events" in cover ? cover.events : undefined;
  const updatedAt = "created_at" in cover ? cover.created_at : undefined;

  const lastEvent: Event | undefined = events && events.length > 0 ? events[events.length - 1] : undefined;
  const covered = lastEvent?.covered ?? ("covered" in cover ? cover.covered : false);

  const state = covered ? "cover-covered" : "cover-missing";
  const temporary = !id ? "cover-temporary" : "";
  const isStaleCover = updatedAt && isStale(new Date(updatedAt)) ? "cover-stale" : "";
  const isSelected = selectedId && String(selectedId) === String(id) ? "cover-selected" : "";

  useEffect(() => {
    const lngNum = Number(lng);
    const latNum = Number(lat);

    if (map && !isNaN(lngNum) && !isNaN(latNum)) {
      markerRef.current = new mapboxgl.Marker(contentRef.current)
        .setLngLat([lngNum, latNum])
        .addTo(map);
    }

    return () => {
      markerRef.current?.remove();
    };
  }, [map, lng, lat]);

  const handleClick = () => {
    if (id && lat && lng) {
      setParams({ id: String(id), lat: String(lat), lng: String(lng) });
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
      <img src={CoverLogo as string} alt={`Cover ${String(id)}`} className="cover-image" />
    </div>,
    contentRef.current
  );
};

export default Cover;
