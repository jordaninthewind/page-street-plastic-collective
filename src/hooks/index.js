import mapboxgl from "mapbox-gl";
import { useSearchParams } from "react-router";

import { useEffect, useRef, useState } from "react";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import {
  MAP_BOUNDS,
  MAP_CENTER,
  PAGE_STREET_HIGHLIGHT_LAYER,
  PAGE_STREET_HIGHLIGHT_SOURCE,
} from "@app/constants";

export const useSearchParamState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get("filter");

  const clearFilter = () => {
    setSearchParams({});
  };

  return {
    filter,
    setSearchParams,
    setFilter: (value) => setSearchParams({ filter: value }),
    clearFilter,
  };
};

export const useMap = () => {
  const [map, setMap] = useState(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!map) {
      const newMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/jordankline/cmjkd59ot002t01sn0v1q5igw",
        center: MAP_CENTER,
        maxBounds: MAP_BOUNDS,
      });

      setMap(newMap);
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      map.once("load", () => {
        map.addSource("page-street-highlight", PAGE_STREET_HIGHLIGHT_SOURCE);
        map.addLayer(PAGE_STREET_HIGHLIGHT_LAYER);
        map.addControl(new mapboxgl.NavigationControl());
      });
    }
  }, [map]);

  return { map, mapContainerRef };
};

export const useIsMobile = () => {
  const { breakpoints } = useTheme();

  const isMobile = useMediaQuery(breakpoints.down("md"));

  return { isMobile };
};
