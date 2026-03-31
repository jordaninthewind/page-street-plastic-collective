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

import { CoverComments } from "@app/components";
import withLoading from "@app/components/HOC/withLoading";
import { useSearchParamState } from "@app/hooks";
import {
  getCommentsFromSupabase,
  getEventsFromSupabase,
  getSingleCoverFromSupabase,
  recordEventInSupabase,
  updateCoverStateInSupabase,
} from "@app/services";
import { useCoverStore } from "@app/stores";
import { isStale } from "@app/utils";

const TypographyWithLoading = withLoading(Typography);

const CoverDetails = ({ cover, mostRecentEvent, ...props }) => {
  const { created_at: update } = mostRecentEvent || cover;

  return (
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
        {cover.address}, SF, CA
      </TypographyWithLoading>
      <TypographyWithLoading {...props} variant="h3" sx={{ mb: 2 }}>
        is {cover.covered ? "covered ✅" : "missing ❌"}
      </TypographyWithLoading>
      <TypographyWithLoading {...props} variant="body1">
        As of {new Date(update).toLocaleString()}
      </TypographyWithLoading>
      <TypographyWithLoading {...props} variant="body1">
        This info is {isStale(update) ? "stale" : "fresh"}
      </TypographyWithLoading>
      <TypographyWithLoading {...props} variant="h6">
        Requested By: {cover.requested_by}
      </TypographyWithLoading>
      <TypographyWithLoading {...props} variant="body1">
        First reported: {new Date(cover.created_at).toLocaleString()}
      </TypographyWithLoading>
    </Stack>
  );
};
const CoverState = ({ covered, onClick, loading }) => (
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

const EventHistory = ({ events }) => {
  return (
    <div>
      {events.map((event) => {
        console.log(event)
        return <p>{event.toString()}</p>;
      })}
    </div>
  );
};

const CoverInfo = () => {
  const { id, setParams } = useSearchParamState();

  const { enqueueSnackbar } = useSnackbar();
  const { cover, setCover, comments, setComments, events, setEvents } =
    useCoverStore();

  const [loading, setLoading] = useState(false);

  const fetchCoverAndComments = useCallback(async () => {
    try {
      setLoading(true);

      if (id) {
        const fetchCover = async () => {
          const [markerData, eventsData, commentsData] = await Promise.all([
            getSingleCoverFromSupabase(id),
            getEventsFromSupabase(id),
            getCommentsFromSupabase(id),
          ]);

          setCover(markerData);
          setEvents(eventsData);
          setComments(commentsData);
          console.log(events);
        };

        fetchCover();
      } else {
        setCover(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id, setComments, setEvents, setCover]);

  useEffect(() => {
    fetchCoverAndComments();
  }, [fetchCoverAndComments]);

  const handleUpdateCoverState = async (updatedCovered) => {
    try {
      setLoading(true);
      await recordEventInSupabase({
        event: {
          type: "update_marker_state",
          cover_id: id,
          covered: updatedCovered,
        },
      });
      await updateCoverStateInSupabase({ id, covered: updatedCovered });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (!cover) return null;

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
      <CoverDetails
        cover={cover}
        mostRecentEvent={events[events.length - 1]}
        loading={loading}
      />
      <Divider sx={{ width: "100%" }} />
      <Typography variant="h4" sx={{ mb: 2 }}>
        Update Cover State
      </Typography>
      <CoverState covered={cover.covered} onClick={handleUpdateCoverState} />
      <Divider sx={{ width: "100%" }} />
      <EventHistory events={events} />
      <CoverComments comments={comments} />
    </Stack>
  );
};

export default CoverInfo;
