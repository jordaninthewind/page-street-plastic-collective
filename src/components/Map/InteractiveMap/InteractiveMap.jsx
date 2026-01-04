import mapboxgl from "mapbox-gl";
import { useSnackbar } from "notistack";

import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { Marker } from "@app/components";
import {
  MAP_CENTER,
  PAGE_STREET_HIGHLIGHT_LAYER,
  PAGE_STREET_HIGHLIGHT_SOURCE,
} from "@app/constants";
import { useIsMobile, useMap, useSearchParamState } from "@app/hooks";
import { useMapStore } from "@app/stores";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const InteractiveMap = () => {
  const { isMobile } = useIsMobile();
  const { map, mapContainerRef } = useMap();
  const { markers, fetchMarkers } = useMapStore();

  const { id, lat, lng, setParams } = useSearchParamState();

  const { enqueueSnackbar } = useSnackbar();

  const [temporaryMarker, setTemporaryMarker] = useState(null);

  useEffect(() => {
    setTemporaryMarker(!id && lng && lat ? { id: null, lng, lat } : null);
  }, [id, lat, lng]);

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
    } else if (map && !lng && !lat) {
      map.flyTo({
        center: MAP_CENTER,
        zoom: 12,
      });
    }
  }, [map, lng, lat]);

  return (
    <>
      <Box
        id="map"
        sx={{
          width: "100%",
          minWidth: isMobile ? "100%" : "50%",
          minHeight: isMobile ? "30vh" : "100%",
        }}
        ref={mapContainerRef}
      />
      {markers.map((marker, idx) => (
        <Marker key={idx} map={map} marker={marker} />
      ))}
      {temporaryMarker && <Marker map={map} marker={temporaryMarker} />}
    </>
  );
};

export default InteractiveMap;
