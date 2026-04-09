import { Stack } from "@mui/material";

import { InteractiveMap, MapNavigation } from "@app/components";
import { useIsMobile } from "@app/hooks";

const Map = () => {
  const { isMobile } = useIsMobile();

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      flex={1}
      sx={{
        flex: 1,
        width: "100%",
        minHeight: "calc(100vh - var(--header-height))",
        height: "calc(100vh - var(--header-height))",
      }}
    >
      <InteractiveMap />
      <MapNavigation />
    </Stack>
  );
};

export default Map;
