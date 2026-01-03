import { useEffect, useState } from "react";

import { Stack, Typography } from "@mui/material";

import { useSearchParamState } from "@app/hooks";
import { getSingleCoverFromSupabase } from "@app/services";
import { isStale } from "@app/utils";

const MarkerInfo = () => {
  const { id } = useSearchParamState();

  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchMarker = async () => {
        const marker = await getSingleCoverFromSupabase(id);

        setMarker(marker);
      };

      fetchMarker();
    }
  }, [id]);

  if (!marker) return null;

  const {
    address,
    covered,
    requested_by: requestedBy,
    created_at: createdAt,
    updated_at: updatedAt,
  } = marker;

  return (
    <Stack
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
      sx={{ mb: 2 }}
    >
      <Typography variant="h3" sx={{ mb: 2 }}>
        The drain at
      </Typography>
      <Typography variant="h2" sx={{ mb: 2 }}>
        {address}, SF, CA
      </Typography>
      <Typography variant="h3" sx={{ mb: 2 }}>
        is {covered ? "covered ✅" : "missing ❌"}
      </Typography>
      <Typography variant="body1">
        As of {new Date(updatedAt).toLocaleString()}
      </Typography>
      <Typography variant="body1">
        This info is {isStale(updatedAt) ? "stale" : "fresh"}
      </Typography>
      <Typography variant="h6">Requested By: {requestedBy}</Typography>
      <Typography variant="body1">
        First reported: {new Date(createdAt).toLocaleString()}
      </Typography>
    </Stack>
  );
};

export default MarkerInfo;
