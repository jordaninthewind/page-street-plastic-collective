import { Stack } from "@mui/material";

import { AddDrainCover, CoverInfo, MapExplorer, UserPanel } from "@app/components";
import withSearchParamState from "@app/components/HOC/withSearchParamState";

const baseState = (id: number, lat: string, lng: string) => !id && !lat && !lng;
const existingCoverState = (id: number, lat: string, lng: string) => id && lat && lng;
const newCoverState = (id: number, lat: string, lng: string) => !id && lat && lng;

const MAP_NAVIGATION_STATES = [
  { Component: MapExplorer, condition: baseState },
  { Component: CoverInfo, condition: existingCoverState },
  { Component: AddDrainCover, condition: newCoverState },
];

const MapNavigation = withSearchParamState(({ id, lat, lng }) => (
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
    {MAP_NAVIGATION_STATES.map(({ Component, condition }, idx) => (
      condition(id, lat, lng) ? <Component key={idx} /> : null
    ))}
    <UserPanel />
  </Stack>
));

export default MapNavigation;
