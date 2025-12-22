import mapboxgl from "mapbox-gl";
import { useSearchParams } from "react-router";

import { useCallback, useEffect, useRef, useState } from "react";

import { Box, CircularProgress } from "@mui/material";

import { MAP_CENTER } from "@app/constants";
import { addMarkerToMapState, getCoversFromSupabase } from "@app/utils";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const InteractiveMap = () => {
  const [_, setSearchParams] = useSearchParams();

  const mapContainerRef = useRef(null);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState(null);
  const [existingDrainCovers, setExistingDrainCovers] = useState([]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: MAP_CENTER,
      zoom: 15,
    });

    setMap(map);
  }, [mapContainerRef]);

  const handleMarkerClick = useCallback(
    (marker) => {
      setSearchParams({
        overlay: "marker",
        id: marker.id,
        lat: marker.lng,
        lng: marker.lat,
      });
    },
    [setSearchParams]
  );

  const handleMapClick = useCallback(
    ({ lngLat: { lat, lng }, originalEvent: { srcElement } }) => {
      if (map && srcElement.tagName === "CANVAS") {
        setSearchParams({ overlay: "marker", lat: lat, lng: lng });
      }
    },
    [map, setSearchParams]
  );

  useEffect(() => {
    const fetchDrainCovers = async () => {
      const data = await getCoversFromSupabase();

      setExistingDrainCovers(data || []);
    };

    fetchDrainCovers();
  }, []);

  useEffect(() => {
    if (map && existingDrainCovers.length > 0) {
      existingDrainCovers.forEach((marker) =>
        addMarkerToMapState(map, marker, handleMarkerClick)
      );
    }
  }, [map, existingDrainCovers, handleMarkerClick]);

  useEffect(() => {
    if (map) {
      map
        .on("load", () => {
          setLoading(false);
        })
        .on("error", (error) => {
          setError(error);
        })
        .on("click", (event) => {
          handleMapClick(event);
        });
    }
  }, [map, handleMapClick]);

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
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={3000}
          onClose={() => setError(null)}
        >
          {error.message}
        </Snackbar>
      )}
    </>
  );
};

export default InteractiveMap;
