import { Stack } from "@mui/material";

import { InteractiveMap, MapNavigation } from "@app/components";
import { useIsMobile } from "@app/hooks";

const Map = () => {
  const { isMobile } = useIsMobile();

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      flex={1}
      sx={{ flex: 1, width: "100%", minHeight: "100%" }}
    >
      <InteractiveMap />
      <MapNavigation />
    </Stack>
  );
};

export default Map;
