import { Close, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { CoverComments } from "@app/components";
import withAuth from "@app/components/HOC/withAuth";
import withLoading from "@app/components/HOC/withLoading";
import { useSearchParamState } from "@app/hooks";
import { recordEventInSupabase } from "@app/services/supabase/supabaseService";
import useMapStore from "@app/stores/mapStore";
import type { Cover, Event, User } from "@app/types";
import { isStale } from "@app/utils";

const TypographyWithLoading = withLoading(Typography);

interface CoverDetailsProps {
  cover: Cover;
  loading: boolean;
}

const CoverDetails = ({ cover, loading }: CoverDetailsProps) => {
  const lastEvent: Event | undefined =
    cover.events.length > 0 ? cover.events[cover.events.length - 1] : undefined;
  const update = lastEvent?.created_at ?? cover.created_at;
  const covered = lastEvent?.covered ?? cover.covered;

  return (
    <Stack flexDirection="column" justifyContent="center" alignItems="center" spacing={2}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        The drain at
      </Typography>
      <TypographyWithLoading loading={loading} variant="h2" sx={{ mb: 2 }}>
        {cover.address}, SF, CA
      </TypographyWithLoading>
      <TypographyWithLoading loading={loading} variant="h3" sx={{ mb: 2 }}>
        is {covered ? "covered ✅" : "missing ❌"}
      </TypographyWithLoading>
      <TypographyWithLoading loading={loading} variant="body1">
        As of {new Date(update).toLocaleString()}
      </TypographyWithLoading>
      <TypographyWithLoading loading={loading} variant="body1">
        This info is {isStale(new Date(update)) ? "stale" : "fresh"}
      </TypographyWithLoading>
      <TypographyWithLoading loading={loading} variant="h6">
        Requested By: {cover.requested_by}
      </TypographyWithLoading>
      <TypographyWithLoading loading={loading} variant="body1">
        First reported: {new Date(cover.created_at).toLocaleString()}
      </TypographyWithLoading>
    </Stack>
  );
};

interface CoverStateOwnProps {
  covered?: boolean;
  onClick: () => void;
  loading: boolean;
}

const CoverState = withAuth(({ user, covered, onClick, loading }: CoverStateOwnProps & { user: User | null }) => (
  <Stack flexDirection="row" justifyContent="center" alignItems="center" spacing={2}>
    <Button
      variant={covered ? "outlined" : "contained"}
      color={covered ? "error" : "success"}
      onClick={onClick}
      disabled={loading || !user}
    >
      {covered ? "Ugh, it's missing again. ❌" : "Oh look, it's covered! ✅"}
      {loading ? <CircularProgress size={20} /> : null}
    </Button>
  </Stack>
));

interface EventHistoryProps {
  events: Event[];
}

const EventHistory = ({ events }: EventHistoryProps) => (
  <Accordion
    elevation={0}
    sx={{ width: "100%", border: "1px solid #e0e0e0", borderRadius: "8px" }}
  >
    <AccordionSummary expandIcon={<ExpandMore />}>
      <Typography variant="h6">History ({events.length})</Typography>
    </AccordionSummary>
    <AccordionDetails>
      {events.map(({ created_at: createdAt, covered }, idx) => (
        <Stack
          key={createdAt ?? idx}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
          spacing={2}
        >
          <Typography variant="h6">{new Date(createdAt).toLocaleString()}</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="h6">{covered ? "Covered ✅" : "Missing ❌"}</Typography>
        </Stack>
      ))}
    </AccordionDetails>
  </Accordion>
);

const CoverInfo = withAuth(({ user }: { user: User | null }) => {
  const [cover, setCover] = useState<Cover | null>(null);
  const { id, setParams } = useSearchParamState();
  const { enqueueSnackbar } = useSnackbar();
  const { invalidateCover, getCover, loading } = useMapStore();

  useEffect(() => {
    if (loading) return;
    const matched = id !== null ? getCover(String(id)) : undefined;
    if (matched) setCover(matched);
  }, [getCover, id, loading]);

  const lastEvent: Event | undefined =
    cover && cover.events && cover.events.length > 0
      ? cover.events[cover.events.length - 1]
      : undefined;
  const mostRecentEvent = lastEvent ?? cover;

  const handleUpdateCoverState = async () => {
    try {
      if (!user) {
        enqueueSnackbar("Please login to update the cover state", { variant: "error" });
        return;
      }
      await recordEventInSupabase({
        event: {
          type: "update_cover_state",
          cover_id: id,
          covered: !mostRecentEvent?.covered,
          reported_by: user.id,
        },
      });
      await invalidateCover(String(id));
    } catch (error) {
      enqueueSnackbar((error as Error).message, { variant: "error" });
    }
  };

  if (!cover) return null;
  console.log('mostRecentEvent', mostRecentEvent);
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
      <CoverDetails cover={cover} loading={loading} />
      <Divider sx={{ width: "100%" }} />
      <Stack>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Report the status of the drain cover
        </Typography>
      </Stack>
      <CoverState covered={mostRecentEvent?.covered} onClick={handleUpdateCoverState} loading={loading} />
      <Divider sx={{ width: "100%" }} />
      <EventHistory events={cover.events} />
      <CoverComments comments={cover.comments} />
    </Stack>
  );
});

export default CoverInfo;
