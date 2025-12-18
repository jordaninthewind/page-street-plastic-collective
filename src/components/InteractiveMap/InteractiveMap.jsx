import mapboxgl from "mapbox-gl";

import { useCallback, useEffect, useRef, useState } from "react";

import { Box, CircularProgress } from "@mui/material";

import { MAP_CENTER } from "@app/constants";
import { addMarkerToMap, getCoversFromSupabase } from "@app/utils";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const InteractiveMap = () => {
  const mapContainerRef = useRef(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState(null);
  const [existingDrainCovers, setExistingDrainCovers] = useState([]);

  useEffect(() => {
    if (mapContainerRef.current) {
      setMap(
        new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: MAP_CENTER,
          zoom: 15,
        })
      );
    }
  }, [mapContainerRef]);

  const handleClick = useCallback(
    ({ lngLat: { lng, lat } }) => {
      if (map) {
        addMarkerToMap(map, [lng, lat]);
      }
    },
    [map]
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
      existingDrainCovers.forEach((cover) =>
        addMarkerToMap(map, [cover.longitude, cover.latitude])
      );
    }
  }, [map, existingDrainCovers]);

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
          handleClick(event);
        });
    }
  }, [map, handleClick]);

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
