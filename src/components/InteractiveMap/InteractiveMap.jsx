import mapboxgl from "mapbox-gl";
import { useSnackbar } from "notistack";

import { useCallback, useEffect, useRef, useState } from "react";

import { Box, CircularProgress } from "@mui/material";

import { MapControlsAndFilters, Marker } from "@app/components";
import {
  MAP_CENTER,
  PAGE_STREET_HIGHLIGHT_LAYER,
  PAGE_STREET_HIGHLIGHT_SOURCE,
} from "@app/constants";
import { useSearchParamState } from "@app/hooks";
import { useMapStore } from "@app/stores";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const InteractiveMap = () => {
  const mapContainerRef = useRef(null);

  const { filter, setSearchParams } = useSearchParamState();
  const { markers, loading, error, fetchMarkers } = useMapStore();
  const { enqueueSnackbar } = useSnackbar();

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map) {
      const newMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/jordankline/cmjkd59ot002t01sn0v1q5igw",
        center: MAP_CENTER,
        zoom: 14,
      });

      newMap.addControl(
        new mapboxgl.NavigationControl({
          showCompass: true,
          showZoom: false,
          showRotate: false,
          showPitch: false,
          showAltitude: false,
          showAltitudeControl: false,
        })
      );

      setMap(newMap);
    }
  }, [map, mapContainerRef]);

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

  useEffect(() => {
    fetchMarkers();
  }, [fetchMarkers]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [error, enqueueSnackbar]);

  useEffect(() => {
    map
      ?.on("load", () => {
        addPageStreetHighlightLayer();
      })
      ?.on("error", ({ message }) => {
        enqueueSnackbar(message, { variant: "error" });
      })
      ?.on("click", (event) => {
        handleMapClick(event);
      });
  }, [map, handleMapClick, addPageStreetHighlightLayer, enqueueSnackbar]);

  return (
    <>
      <Box
        id="map"
        sx={{ width: "100%", height: "100%", flex: 1 }}
        ref={mapContainerRef}
      />
      {loading ? (
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
      ) : (
        <>
          {map &&
            markers?.map((marker) => {
              if (filter === "covered" && !marker.covered) {
                return null;
              }

              if (filter === "missing" && marker.covered) {
                return null;
              }

              return (
                <Marker
                  key={marker.id}
                  map={map}
                  marker={marker}
                  onClick={handleMarkerClick}
                />
              );
            })}
          {markers.length > 0 && <MapControlsAndFilters />}
        </>
      )}
    </>
  );
};

export default InteractiveMap;
