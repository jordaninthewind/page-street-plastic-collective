import mapboxgl from "mapbox-gl";
import { useSnackbar } from "notistack";

import { useCallback, useEffect } from "react";

import { Box, CircularProgress } from "@mui/material";

import { Marker } from "@app/components";
import { useMap, useSearchParamState } from "@app/hooks";
import { useMapStore } from "@app/stores";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const InteractiveMap = () => {
  const { filter, setSearchParams } = useSearchParamState();
  const { markers, loading, error, fetchMarkers } = useMapStore();
  const { map, mapContainerRef } = useMap();
  const { enqueueSnackbar } = useSnackbar();

  const handleMarkerClick = useCallback(
    ({ id }) => {
      setSearchParams({ overlay: "marker", id });
    },
    [setSearchParams]
  );

  const handleMapClick = useCallback(
    ({ lngLat: { lat, lng }, originalEvent: { srcElement } }) => {
      if (srcElement.tagName === "CANVAS") {
        setSearchParams({ overlay: "marker", lat, lng });
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
    if (map) {
      map
        ?.on("load", () => {
          // addPageStreetHighlightLayer();
        })
        ?.on("error", ({ message }) => {
          enqueueSnackbar(message, { variant: "error" });
        })
        ?.on("click", (event) => {
          handleMapClick(event);
        });
    }
  }, [map, handleMapClick, enqueueSnackbar]);

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
        </>
      )}
    </>
  );
};

export default InteractiveMap;
