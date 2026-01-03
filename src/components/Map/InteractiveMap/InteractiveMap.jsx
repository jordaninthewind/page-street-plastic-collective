import mapboxgl from "mapbox-gl";
import { useSnackbar } from "notistack";

import { useCallback, useEffect } from "react";

import { Box } from "@mui/material";

import { Marker } from "@app/components";
import { useMap, useSearchParamState } from "@app/hooks";
import { useMapStore } from "@app/stores";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const InteractiveMap = () => {
  const { setParams } = useSearchParamState();
  const { markers, error, fetchMarkers } = useMapStore();
  const { map, mapContainerRef } = useMap();
  const { enqueueSnackbar } = useSnackbar();

  const handleMapClick = useCallback(
    ({ lngLat: { lat, lng }, originalEvent: { srcElement } }) => {
      if (srcElement.tagName === "CANVAS") {
        setParams({ lat, lng });
      }
    },
    [setParams]
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
      map?.on("click", (event) => {
        handleMapClick(event);
      });
    }
  }, [map, handleMapClick, enqueueSnackbar]);

  return (
    <>
      <Box
        id="map"
        sx={{ width: "100%", minWidth: "50%", minHeight: "100%" }}
        ref={mapContainerRef}
      />
      {markers.map((marker) => (
        <Marker key={marker.id} map={map} marker={marker} />
      ))}
    </>
  );
};

export default InteractiveMap;
