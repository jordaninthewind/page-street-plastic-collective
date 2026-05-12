import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { CoverComments } from "@app/components";
import { Skeleton } from "@mui/material";
import withAuth from "@app/components/HOC/withAuth";
import { useSearchParamState } from "@app/hooks";
import { recordEventInSupabase } from "@app/services/supabase/supabaseService";
import useMapStore from "@app/stores/mapStore";
import type { Cover, Event, User } from "@app/types";
import { isStale } from "@app/utils";

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
    <div className="cover-details-block">
      <p className="cover-details-headline">The drain at</p>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={28} />
      ) : (
        <p className="cover-details-address">{cover.address}, SF, CA</p>
      )}
      <div className="cover-status-badge">
        {covered ? "Covered ✅" : "Missing ❌"}
      </div>
      <p className="cover-details-meta">
        As of {new Date(update).toLocaleString()} &mdash;{" "}
        {isStale(new Date(update)) ? "stale info" : "fresh info"}
      </p>
      <p className="cover-details-meta">
        Requested by {cover.requested_by}
      </p>
      <p className="cover-details-meta">
        First reported: {new Date(cover.created_at).toLocaleString()}
      </p>
    </div>
  );
};

interface EventHistoryProps {
  events: Event[];
}

const EventHistory = ({ events }: EventHistoryProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="history-section">
      <button
        className={`history-toggle${open ? " history-toggle--open" : ""}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="history-toggle-label">History ({events.length})</span>
        <span className="history-toggle-arrow">▾</span>
      </button>
      {open && (
        <div className="history-list">
          {events.map(({ created_at: createdAt, covered }, idx) => (
            <div key={createdAt ?? idx} className="event-row">
              <span className="event-date">{new Date(createdAt).toLocaleString()}</span>
              <span className="event-state">{covered ? "Covered ✅" : "Missing ❌"}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface CoverStateOwnProps {
  covered?: boolean;
  onClick: () => void;
  loading: boolean;
}

const CoverState = withAuth(({ user, covered, onClick, loading }: CoverStateOwnProps & { user: User | null }) => (
  <button
    className={`map-btn${covered ? "" : " map-btn--fill"}`}
    onClick={onClick}
    disabled={loading || !user}
  >
    {covered ? "Ugh, it's missing again. ❌" : "Oh look, it's covered! ✅"}
  </button>
));

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

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div className="eyebrow">Cover info</div>
        <button className="map-close-btn" onClick={() => setParams({})}>×</button>
      </div>
      <CoverDetails cover={cover} loading={loading} />
      <div className="map-divider" />
      <div className="eyebrow">Report status</div>
      <CoverState covered={mostRecentEvent?.covered} onClick={handleUpdateCoverState} loading={loading} />
      <div className="map-divider" />
      <EventHistory events={cover.events} />
      <CoverComments comments={cover.comments} />
    </div>
  );
});

export default CoverInfo;
