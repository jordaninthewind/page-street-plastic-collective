import { Stack } from "@mui/material";

import { MapFilters, MapSearch } from "@app/components";

const MapNavigation = () => {
  return (
    <Stack flexDirection="row" justifyContent="space-between" spacing={2}>
      <MapFilters />
      <MapSearch />
    </Stack>
  );
};

export default MapNavigation;
