import { Stack } from "@mui/material";

import {
  AddDrainCover,
  AddressSearch,
  Explainer,
  Legend,
  MapFilters,
  MarkerInfo,
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
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
      sx={{
        backgroundColor: "white",
        p: 2,
        height: "100%",
        maxHeight: "100%",
        maxWidth: "500px",
        width: "100%",
      }}
    >
      {baseState ? <Explainer /> : null}
      {existingMarkerState ? <MarkerInfo /> : null}
      {newMarkerState ? <AddDrainCover /> : null}
      <AddressSearch />
      <MapFilters />
      <Legend />
    </Stack>
  );
};
export default MapNavigation;
