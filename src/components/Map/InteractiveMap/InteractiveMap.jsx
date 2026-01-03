import mapboxgl from "mapbox-gl";
import { useSnackbar } from "notistack";

import { useEffect } from "react";

import { Box } from "@mui/material";

import { Marker } from "@app/components";
import {
  PAGE_STREET_HIGHLIGHT_LAYER,
  PAGE_STREET_HIGHLIGHT_SOURCE,
} from "@app/constants";
import { useMap, useSearchParamState } from "@app/hooks";
import { useMapStore } from "@app/stores";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const InteractiveMap = () => {
  const { lat, lng, setParams } = useSearchParamState();
  const { map, mapContainerRef } = useMap();
  const { markers, fetchMarkers } = useMapStore();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchMarkers();
  }, [fetchMarkers]);

  useEffect(() => {
    map
      ?.once("load", () => {
        map.addSource("page-street-highlight", PAGE_STREET_HIGHLIGHT_SOURCE);
        map.addLayer(PAGE_STREET_HIGHLIGHT_LAYER);
        map.addControl(new mapboxgl.NavigationControl());
      })
      ?.on("click", (event) => {
        if (event.originalEvent.srcElement.tagName === "CANVAS") {
          setParams({ id: "", lat: event.lngLat.lat, lng: event.lngLat.lng });
        }
      })
      ?.on("error", ({ message }) => {
        enqueueSnackbar(message, { variant: "error" });
      });
  }, [map, enqueueSnackbar, setParams]);

  useEffect(() => {
    if (map && lng && lat) {
      map.flyTo({
        center: [lng, lat],
        zoom: 15,
      });
    }
  }, [map, lng, lat]);

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
      {/* TODO: Temporary Marker */}
    </>
  );
};

export default InteractiveMap;
