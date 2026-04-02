import AddDrainCover from "../AddDrainCover/AddDrainCover";
import { useSearchParams } from "react-router";

import React, { useEffect, useState } from "react";

import { Box, CircularProgress } from "@mui/material";

import { CoverInfo } from "@app/components";
import { getSingleCoverFromSupabase } from "@app/services";

const CoverEditor = () => {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCover = async (id) => {
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
    <Box
      sx={{
        p: 2,
        minWidth: "fit-content",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      ) : id ? <CoverInfo /> : <AddDrainCover lat={lat} lng={lng} />}
    </Box>
  );
};

export default CoverEditor;
