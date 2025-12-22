import AddDrainCover from "../AddDrainCover/AddDrainCover";
import { useSearchParams } from "react-router";

import React, { useEffect, useState } from "react";

import { Box, CircularProgress, Typography } from "@mui/material";

import { MarkerInfo } from "@app/components";
import { getSingleCoverFromSupabase } from "@app/services";

const MarkerEditor = () => {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cover, setCover] = useState(null);

  useEffect(() => {
    const fetchCover = async () => {
      try {
        setLoading(true);

        if (!id) return;

        const data = await getSingleCoverFromSupabase(id);
        setCover(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCover();
  }, [id]);

  return (
    <Box sx={{ p: 3, minWidth: 350, maxWidth: 460 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {id ? `Latest Drain Cover Information` : "Request a Drain Cover"}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      ) : cover ? (
        <MarkerInfo cover={cover} />
      ) : (
        <AddDrainCover lat={lat} lng={lng} />
      )}
    </Box>
  );
};

export default MarkerEditor;
