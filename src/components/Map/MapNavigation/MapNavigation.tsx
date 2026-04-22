import { Stack } from "@mui/material";

import { AddDrainCover, CoverInfo, MapExplorer, UserPanel } from "@app/components";
import { useSearchParamState } from "@app/hooks";

const MapNavigation = () => {
  const { id, lat, lng } = useSearchParamState();

  const baseState = !id && !lat && !lng;
  const existingCoverState = id && lat && lng;
  const newCoverState = !id && lat && lng;

  return (
    <Stack
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{
        backgroundColor: "white",
        p: 2,
        minHeight: "100%",
        maxHeight: "100%",
        maxWidth: "fit-content",
        width: "100%",
      }}
    >
      {baseState ? <MapExplorer /> : null}
      {existingCoverState ? <CoverInfo /> : null}
      {newCoverState ? <AddDrainCover /> : null}
      <UserPanel />
    </Stack>
  );
};

export default MapNavigation;
