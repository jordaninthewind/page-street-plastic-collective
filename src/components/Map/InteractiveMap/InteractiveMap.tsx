import mapboxgl from "mapbox-gl";
import { useSnackbar } from "notistack";

import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { Cover } from "@app/components";
import {
  MAP_CENTER,
  PAGE_STREET_HIGHLIGHT_LAYER,
  PAGE_STREET_HIGHLIGHT_SOURCE,
} from "@app/constants";
import { useIsMobile, useMap, useSearchParamState } from "@app/hooks";
import useMapStore from "@app/stores/mapStore";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

const InteractiveMap = () => {
  const { isMobile } = useIsMobile();
  const { map, mapContainerRef } = useMap();
  const { covers, fetchMapAssets } = useMapStore();
  const { id, lat, lng, setParams } = useSearchParamState();
  const { enqueueSnackbar } = useSnackbar();

  const [temporaryCover, setTemporaryCover] = useState<{
    id: null;
    lat: string | null;
    lng: string | null;
  } | null>(null);

  useEffect(() => {
    setTemporaryCover(!id && lng && lat ? { id: null, lng, lat } : null);
  }, [id, lat, lng]);

  useEffect(() => {
    fetchMapAssets();
  }, [fetchMapAssets]);

  useEffect(() => {
    map
      ?.once("load", () => {
        map.addSource("page-street-highlight", PAGE_STREET_HIGHLIGHT_SOURCE);
        map.addLayer(PAGE_STREET_HIGHLIGHT_LAYER);
        map.addControl(new mapboxgl.NavigationControl());
      })
      ?.on("click", (event) => {
        const target = event.originalEvent.target as HTMLElement | null;
        if (target?.tagName === "CANVAS") {
          setParams({
            id: "",
            lat: String(event.lngLat.lat),
            lng: String(event.lngLat.lng),
          });
        }
      })
      ?.on("error", (event) => {
        enqueueSnackbar(event.error?.message ?? "Map error", { variant: "error" });
      });
  }, [map, enqueueSnackbar, setParams]);

  useEffect(() => {
    if (map && lng && lat) {
      map.flyTo({ center: [Number(lng), Number(lat)], zoom: 15 });
    } else if (map && !lng && !lat) {
      map.flyTo({ center: MAP_CENTER, zoom: 12 });
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
      {covers.map((cover, idx) => (
        <Cover key={idx} map={map} cover={cover} />
      ))}
      {temporaryCover && <Cover map={map} cover={temporaryCover} />}
    </>
  );
};

export default InteractiveMap;
