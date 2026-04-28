import mapboxgl from "mapbox-gl";
import { useSearchParams } from "react-router";

import { useEffect, useRef, useState } from "react";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { MAP_BOUNDS, MAP_CENTER } from "@app/constants/index";

interface MapState {
  map: mapboxgl.Map | null;
  mapContainerRef: React.RefObject<HTMLDivElement>;
}

interface MobileState {
  isMobile: boolean;
}

interface SearchParamState {
  id?: number | null;
  overlay?: string | null;
  filter?: string | null;
  lat?: string | null;
  lng?: string | null;
  setParams: (params: Record<string, string>) => void;
  setFilter: (value: string) => void;
  clearFilter: () => void;
}

export const useSearchParamState = (): SearchParamState => {
  const [searchParams, setParams] = useSearchParams();

  const id = Number(searchParams.get("id"));
  const overlay = searchParams.get("overlay");
  const filter = searchParams.get("filter");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const clearFilter = () => {
    setParams({});
  };

  return {
    id,
    overlay,
    lat,
    lng,
    filter,
    setParams,
    setFilter: (value: string) => setParams({ filter: value }),
    clearFilter,
  };
};

export const useMap = (): MapState => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!map) {
      const newMap = new mapboxgl.Map({
        container: mapContainerRef.current as HTMLElement,
        style: "mapbox://styles/jordankline/cmjkd59ot002t01sn0v1q5igw",
        center: MAP_CENTER,
        maxBounds: MAP_BOUNDS,
      });

      setMap(newMap as unknown as mapboxgl.Map);
    }
  }, [map]);
  return { map, mapContainerRef: mapContainerRef as unknown as React.RefObject<HTMLDivElement> };
};

export const useIsMobile = (): MobileState => {
  const { breakpoints } = useTheme();

  const isMobile = useMediaQuery(breakpoints.down("md"));

  return { isMobile };
};
