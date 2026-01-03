import { Stack } from "@mui/material";

import { Header, InteractiveMap, MapNavigation } from "@app/components";

const Map = () => (
  <>
    <Header />
    <Stack
      direction="row"
      flex={1}
      sx={{ flex: 1, width: "100%", minHeight: "100%" }}
    >
      <InteractiveMap />
      <MapNavigation />
    </Stack>
  </>
);

export default Map;
