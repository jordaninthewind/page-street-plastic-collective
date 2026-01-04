import { Button, ButtonGroup, CircularProgress, Stack } from "@mui/material";

import { useIsMobile, useSearchParamState } from "@app/hooks";
import { useMapStore } from "@app/stores";

const MapFilters = () => {
  const { isMobile } = useIsMobile();
  const { filter, setFilter, clearFilter } = useSearchParamState();
  const { markers, loading } = useMapStore();

  if (loading) {
    return <CircularProgress />;
  }

  const handleChangeFilter = (event) => setFilter(event.target.value);

  return (
    <Stack direction={isMobile ? "column" : "row"} spacing={2}>
      <ButtonGroup onChange={handleChangeFilter}>
        <Button
          onClick={handleChangeFilter}
          value="covered"
          color="primary"
          variant={filter === "covered" ? "contained" : "outlined"}
          size="small"
        >
          Covered ({markers.filter(({ covered }) => covered).length})
        </Button>
        <Button
          onClick={handleChangeFilter}
          value="missing"
          color="secondary"
          variant={filter === "missing" ? "contained" : "outlined"}
          size="small"
        >
          Missing ({markers.filter(({ covered }) => !covered).length})
        </Button>
      </ButtonGroup>
      <Button
        value="reset"
        color="error"
        variant="outlined"
        size="small"
        onClick={clearFilter}
      >
        Reset map
      </Button>
    </Stack>
  );
};

export default MapFilters;
