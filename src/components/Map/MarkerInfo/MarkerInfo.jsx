import { useSnackbar } from "notistack";

import { useCallback, useEffect, useState } from "react";

import { Close } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { MarkerComments } from "@app/components";
import withLoading from "@app/components/HOC/withLoading";
import { useSearchParamState } from "@app/hooks";
import {
  getCommentsFromSupabase,
  getSingleCoverFromSupabase,
  recordEventInSupabase,
  updateMarkerStateInSupabase,
} from "@app/services";
import { isStale } from "@app/utils";

const TypographyWithLoading = withLoading(Typography);

const MarkerDetails = ({ marker, ...props }) => (
  <Stack
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    spacing={2}
  >
    <Typography variant="h3" sx={{ mb: 2 }}>
      The drain at
    </Typography>
    <TypographyWithLoading {...props} variant="h2" sx={{ mb: 2 }}>
      {marker.address}, SF, CA
    </TypographyWithLoading>
    <TypographyWithLoading {...props} variant="h3" sx={{ mb: 2 }}>
      is {marker.covered ? "covered ✅" : "missing ❌"}
    </TypographyWithLoading>
    <TypographyWithLoading {...props} variant="body1">
      As of {new Date(marker.updated_at).toLocaleString()}
    </TypographyWithLoading>
    <TypographyWithLoading {...props} variant="body1">
      This info is {isStale(marker.updated_at) ? "stale" : "fresh"}
    </TypographyWithLoading>
    <TypographyWithLoading {...props} variant="h6">
      Requested By: {marker.requested_by}
    </TypographyWithLoading>
    <TypographyWithLoading {...props} variant="body1">
      First reported: {new Date(marker.created_at).toLocaleString()}
    </TypographyWithLoading>
  </Stack>
);

const MarkerState = ({ covered, onClick, loading }) => (
  <Stack
    flexDirection="row"
    justifyContent="center"
    alignItems="center"
    spacing={2}
  >
    <ButtonGroup>
      {loading ? <CircularProgress size={20} /> : null}
      <Button
        variant={covered ? "contained" : "outlined"}
        color={"primary"}
        onClick={() => onClick(true)}
        disabled={loading}
      >
        Covered
      </Button>
      <Button
        variant={!covered ? "contained" : "outlined"}
        color={"secondary"}
        onClick={() => onClick(false)}
        disabled={loading}
      >
        Missing
      </Button>
    </ButtonGroup>
  </Stack>
);

const MarkerInfo = () => {
  const { id, setParams } = useSearchParamState();

  const { enqueueSnackbar } = useSnackbar();

  const [marker, setMarker] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMarkerAndComments();
  }, [fetchMarkerAndComments]);

  const fetchMarkerAndComments = useCallback(async () => {
    try {
      setLoading(true);

      if (id) {
        const fetchMarker = async () => {
          const [marker, comments] = await Promise.all([
            getSingleCoverFromSupabase(id),
            getCommentsFromSupabase(id),
          ]);

          setMarker(marker);
          setComments(comments || []);
        };

        fetchMarker();
      } else {
        setMarker(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdateMarkerState = async (updatedCovered) => {
    try {
      setLoading(true);
      await recordEventInSupabase({
        event: {
          type: "update_marker_state",
          cover_id: id,
          covered: updatedCovered,
        },
      });
      await updateMarkerStateInSupabase({ id, covered: updatedCovered });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (!marker) return null;

  return (
    <Stack
      alignItems="center"
      flexDirection="column"
      justifyContent="flex-start"
      position="relative"
      spacing={2}
      width="100%"
    >
      <IconButton
        onClick={() => setParams({})}
        sx={{ position: "absolute", top: 0, right: 0 }}
      >
        <Close />
      </IconButton>
      <MarkerDetails marker={marker} loading={loading} />
      <Divider sx={{ width: "100%" }} />
      <Typography variant="h4" sx={{ mb: 2 }}>
        Update Marker State
      </Typography>
      <MarkerState covered={marker.covered} onClick={handleUpdateMarkerState} />
      <Divider sx={{ width: "100%" }} />
      <MarkerComments comments={comments} />
    </Stack>
  );
};

export default MarkerInfo;
