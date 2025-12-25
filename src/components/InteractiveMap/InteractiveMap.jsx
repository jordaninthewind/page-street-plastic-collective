import mapboxgl from "mapbox-gl";
import { useSnackbar } from "notistack";
import { useSearchParams } from "react-router";

import { useCallback, useEffect, useRef, useState } from "react";

import { Box, CircularProgress } from "@mui/material";

import {
  MAP_CENTER,
  PAGE_STREET_HIGHLIGHT_LAYER,
  PAGE_STREET_HIGHLIGHT_SOURCE,
} from "@app/constants";
import { useMapStore } from "@app/stores";
import { addMarkerToMapState } from "@app/utils";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const InteractiveMap = () => {
  const [_, setSearchParams] = useSearchParams();

  const { enqueueSnackbar } = useSnackbar();

  const mapContainerRef = useRef(null);

  const [map, setMap] = useState(null);
  const { markers, loading, error, fetchMarkers } = useMapStore();

  useEffect(() => {
    if (!map) {
      const newMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/jordankline/cmjkd59ot002t01sn0v1q5igw",
        center: MAP_CENTER,
        zoom: 15,
      });

      setMap(newMap);
    }
  }, [mapContainerRef]);

  const addPageStreetHighlightLayer = useCallback(() => {
    if (map) {
      map.addSource("page-street-highlight", PAGE_STREET_HIGHLIGHT_SOURCE);
      map.addLayer(PAGE_STREET_HIGHLIGHT_LAYER);
    }
  }, [map]);

  const handleMarkerClick = useCallback(
    ({ id }) => {
      setSearchParams({ overlay: "marker", id });
    },
    [setSearchParams]
  );

  const handleMapClick = useCallback(
    ({ lngLat: { lat, lng }, originalEvent: { srcElement } }) => {
      if (srcElement.tagName === "CANVAS") {
        setSearchParams({ overlay: "marker", lat: lat, lng: lng });
      }
    },
    [setSearchParams]
  );

  const addDrainCoversToMap = useCallback(() => {
    markers.forEach((marker) =>
      addMarkerToMapState(map, marker, handleMarkerClick)
    );
  }, [map, markers, handleMarkerClick]);

  useEffect(() => {
    fetchMarkers();
  }, [fetchMarkers]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [error, enqueueSnackbar]);

  useEffect(() => {
    if (map && markers.length > 0) {
      addDrainCoversToMap();
    }
  }, [map, markers, addDrainCoversToMap]);

  useEffect(() => {
    map
      ?.on("load", () => {
        addPageStreetHighlightLayer();
        addDrainCoversToMap();
      })
      ?.on("error", ({ message }) => {
        enqueueSnackbar(message, { variant: "error" });
      })
      ?.on("click", (event) => {
        handleMapClick(event);
      });
  }, [
    map,
    handleMapClick,
    addPageStreetHighlightLayer,
    addDrainCoversToMap,
    enqueueSnackbar,
  ]);

  return (
    <>
      <Box
        id="map"
        sx={{ width: "100%", height: "100%", flex: 1 }}
        ref={mapContainerRef}
      />
      {loading && (
        <CircularProgress
          color="accent"
          size={70}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </>
  );
};

export default InteractiveMap;
