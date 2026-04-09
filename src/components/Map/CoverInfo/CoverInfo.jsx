import { useSnackbar } from "notistack";

import { useEffect, useState } from "react";

import { Close, ExpandMore, Info } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { CoverComments } from "@app/components";
import withLoading from "@app/components/HOC/withLoading";
import { useSearchParamState } from "@app/hooks";
import {
  recordEventInSupabase,
  updateCoverStateInSupabase,
} from "@app/services";
import { useCoverStore, useMapStore } from "@app/stores";
import { isStale } from "@app/utils";
import withAuth from "@app/components/HOC/withAuth";
import { Login } from "@app/components";

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

const CoverState = withAuth(({ user, covered, onClick, loading }) => (
  <Stack flexDirection="row" justifyContent="center" alignItems="center" spacing={2}>
    <Tooltip title="Login to update cover state">
      <Button
        variant={covered ? "outlined" : "contained"}
        color={covered ? "error" : "success"}
        onClick={user ? onClick : undefined}
        disabled={loading}
      >
        {covered ? "Ugh, it's missing again. ❌" : "Oh look, it's covered! ✅"}
        {loading ? <CircularProgress size={20} /> : null}
      </Button>
    </Tooltip>
  </Stack >
));

const EventHistory = ({ events }) => {
  const [collapsed, setCollapsed] = useState(true);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Accordion onChange={handleCollapse} elevation={0} sx={{ width: "100%", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">History ({events.length})</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {events.map(({ created_at: createdAt, covered }) => (
          <Stack key={createdAt} flexDirection="row" justifyContent="space-between" alignItems="flex-end" spacing={2}>
            <Typography variant="h6">{new Date(createdAt).toLocaleString()}</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="h6">{covered ? "Covered ✅" : "Missing ❌"}</Typography>
          </Stack>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

const CoverInfo = () => {
  const { id, setParams } = useSearchParamState();

  const { enqueueSnackbar } = useSnackbar();
  const {
    cover,
    comments,
    events,
    loading,
    fetchCover,
  } = useCoverStore();

  const { invalidateMapAssets } = useMapStore();

  useEffect(() => {
    fetchCover(id);
  }, [fetchCover, id]);

  const handleUpdateCoverState = async (covered) => {
    try {
      await recordEventInSupabase({
        event: {
          type: "update_cover_state",
          cover_id: id,
          covered
        },
      });
      await updateCoverStateInSupabase({ id, covered });
      await fetchCover(id);
      invalidateMapAssets();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
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
      <Stack>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Report the status of the drain cover
        </Typography>
      </Stack>
      <CoverState covered={cover.covered} onClick={handleUpdateCoverState} />
      <Divider sx={{ width: "100%" }} />
      <EventHistory events={events} />
      <CoverComments comments={comments} />
    </Stack>
  );
};

export default CoverInfo;
