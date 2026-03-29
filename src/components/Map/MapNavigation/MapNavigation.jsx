import { Stack } from "@mui/material";

import {
  AddDrainCover,
  MapExplorer,
  MarkerInfo,
  UserPanel,
} from "@app/components";
import { useSearchParamState } from "@app/hooks";

const MapNavigation = () => {
  const { id, lat, lng } = useSearchParamState();

  const baseState = !id && !lat && !lng;
  const existingMarkerState = id && lat && lng;
  const newMarkerState = !id && lat && lng;

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
        maxWidth: "500px",
        width: "100%",
      }}
    >
      {baseState ? <MapExplorer /> : null}
      {existingMarkerState ? <MarkerInfo /> : null}
      {newMarkerState ? <AddDrainCover /> : null}
      <UserPanel />
    </Stack>
  );
};
export default MapNavigation;
