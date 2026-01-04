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
    } else {
      setMarker(null);
    }
  }, [id]);

  if (!marker) return null;

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
        {marker.address}, SF, CA
      </Typography>
      <Typography variant="h3" sx={{ mb: 2 }}>
        is {marker.covered ? "covered ✅" : "missing ❌"}
      </Typography>
      <Typography variant="body1">
        As of {new Date(marker.updated_at).toLocaleString()}
      </Typography>
      <Typography variant="body1">
        This info is {isStale(marker.updated_at) ? "stale" : "fresh"}
      </Typography>
      <Typography variant="h6">Requested By: {marker.requested_by}</Typography>
      <Typography variant="body1">
        First reported: {new Date(marker.created_at).toLocaleString()}
      </Typography>
    </Stack>
  );
};

export default MarkerInfo;
