import { Close } from "@mui/icons-material";
import { Button, ButtonGroup, CircularProgress, Grow } from "@mui/material";

import { useIsMobile, useSearchParamState } from "@app/hooks";
import { useMapStore } from "@app/stores";

const MapControlsAndFilters = () => {
  const { filter, setFilter, clearFilter } = useSearchParamState();
  const { markers, loading } = useMapStore();
  const { isMobile } = useIsMobile();

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <ButtonGroup fullWidth={isMobile}>
      <Button
        onClick={() => setFilter("covered")}
        sx={{
          backgroundColor:
            filter === "covered" ? "primary.main" : "transparent",
          color: filter === "covered" ? "white" : "primary.main",
        }}
      >
        Covered ({markers.filter((marker) => marker.covered).length})
      </Button>
      <Button
        onClick={() => setFilter("missing")}
        sx={{
          backgroundColor:
            filter === "missing" ? "secondary.main" : "transparent",
          color: filter === "missing" ? "white" : "secondary.main",
        }}
      >
        Missing ({markers.filter((marker) => !marker.covered).length})
      </Button>
      {filter && (
        <Grow in={!!filter} timeout={1000} unmountOnExit>
          <Button onClick={clearFilter} sx={{ maxWidth: "fit-content" }}>
            <Close sx={{ fontSize: 16 }} />
          </Button>
        </Grow>
      )}
    </ButtonGroup>
  );
};

export default MapControlsAndFilters;
