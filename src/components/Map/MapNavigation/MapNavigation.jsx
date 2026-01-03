import { Info, LocationOn } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import CoverLogo from "@app/assets/cover-logo.svg";
import {
  AddDrainCover,
  AddressSearch,
  DashedDivider,
  MapFilters,
  MarkerInfo,
} from "@app/components";

const Explainer = () => (
  <Stack
    flexDirection="column"
    justifyContent="space-between"
    alignItems="center"
    spacing={2}
    sx={{ backgroundColor: "white" }}
  >
    <Stack flexDirection="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
      <Info sx={{ fontSize: 30 }} />
    </Stack>
    <Stack flexDirection="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
      <Typography variant="h6">
        Use this map to request a drain cover
      </Typography>
    </Stack>
    <List>
      <ListItem>
        <ListItemIcon
          sx={{
            color: "primary.main",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LocationOn sx={{ fontSize: 30 }} />
        </ListItemIcon>
        <ListItemText>Click anywhere on the screen to request one</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon
          sx={{
            color: "primary.main",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={CoverLogo} alt="Cover Logo" width={30} height={30} />
        </ListItemIcon>
        <ListItemText>
          Click on a marker to see info about the request
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon
          sx={{
            color: "primary.main",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
        </ListItemIcon>
        <ListItemText>
          ...or to let us know if it's been uncovered again 🙃.
        </ListItemText>
      </ListItem>
    </List>
  </Stack>
);

const MapNavigation = () => (
  <Stack
    flexDirection="column"
    justifyContent="flex-start"
    alignItems="center"
    spacing={2}
    sx={{
      p: 2,
      backgroundColor: "white",
      width: "100%",
      height: "100%",
    }}
  >
    <Explainer />
    <DashedDivider />
    <MarkerInfo />
    <AddDrainCover />
    <AddressSearch />
    <MapFilters />
  </Stack>
);

export default MapNavigation;
