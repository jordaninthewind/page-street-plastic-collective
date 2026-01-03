import mapboxgl from "mapbox-gl";
import { useSnackbar } from "notistack";
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
  const [searchParams, setParams] = useSearchParams();

  const id = searchParams.get("id");
  const filter = searchParams.get("filter");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const clearFilter = () => {
    setParams({});
  };

  return {
    id,
    lat,
    lng,
    filter,
    setParams,
    setFilter: (value) => setParams({ filter: value }),
    clearFilter,
  };
};

export const useMap = () => {
  const [map, setMap] = useState(null);
  const mapContainerRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
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
      map
        .once("load", () => {
          map.addSource("page-street-highlight", PAGE_STREET_HIGHLIGHT_SOURCE);
          map.addLayer(PAGE_STREET_HIGHLIGHT_LAYER);
          map.addControl(new mapboxgl.NavigationControl());
        })
        ?.on("error", ({ message }) => {
          enqueueSnackbar(message, { variant: "error" });
        });
    }
  }, [map, enqueueSnackbar]);

  return { map, mapContainerRef };
};

export const useIsMobile = () => {
  const { breakpoints } = useTheme();

  const isMobile = useMediaQuery(breakpoints.down("md"));

  return { isMobile };
};
