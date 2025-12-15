import mapboxgl from "mapbox-gl";

import { useEffect } from "react";

import { Box } from "@mui/material";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const InteractiveMap = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-122.4347310677153, 37.77261132114993],
      zoom: 15,
    });

    return () => map.remove();
  }, []);

  return <Box id="map" sx={{ width: "100%", height: "100%", flex: 1 }} />;
};

export default InteractiveMap;
