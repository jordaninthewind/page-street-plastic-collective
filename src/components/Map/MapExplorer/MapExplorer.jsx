import { Info, LocationOn } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

import CoverLogo from "@app/assets/cover-logo.svg";
import { AddressSearch, ListItemAnimation, MapFilters } from "@app/components";

const ITEMS = [
  {
    icon: <LocationOn sx={{ fontSize: 30 }} />,
    text: "Click anywhere on the screen to request one",
  },
  {
    icon: <img src={CoverLogo} alt="Cover Logo" width={30} height={30} />,
    text: "Click on a cover to see info about the request",
  },
  {
    icon: (
      <Typography
        sx={{
          fontSize: 26,
          width: 30,
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        💁‍♀️
      </Typography>
    ),
    text: "...or to let us know if it's been uncovered again 🙃.",
  },
];

const MapExplorer = () => (
  <Stack
    flexDirection="column"
    justifyContent="space-between"
    alignItems="center"
    spacing={2}
    sx={{ backgroundColor: "white", width: "100%" }}
  >
    <Stack flexDirection="row" alignItems="center" sx={{ mb: 2 }}>
      <Info sx={{ fontSize: 30, mr: 1 }} />
      <Typography variant="">Use this map to request a drain cover</Typography>
    </Stack>
    <AddressSearch />
    <MapFilters />
    <ListItemAnimation items={ITEMS} />
  </Stack>
);

export default MapExplorer;
