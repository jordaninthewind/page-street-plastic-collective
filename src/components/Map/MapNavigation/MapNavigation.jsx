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
import { MapFilters, MapSearch } from "@app/components";

const Explainer = () => (
  <Stack
    flexDirection="column"
    justifyContent="flex-start"
    alignItems="center"
    spacing={2}
    sx={{ padding: 2, backgroundColor: "white", width: "100%", height: "100%" }}
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
        <ListItemIcon>
          <LocationOn sx={{ fontSize: 30 }} />
        </ListItemIcon>
        <ListItemText>
          Click anywhere on the screen to put in a request
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <img src={CoverLogo} alt="Cover Logo" width={28} height={28} />
        </ListItemIcon>
        <ListItemText>
          Click on any marker to see info about drain covers.
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Typography variant="h2">🤷🏻‍♂️</Typography>
        </ListItemIcon>
        <ListItemText>
          (... or to let us know if it's been uncovered again 🙃.)
        </ListItemText>
      </ListItem>
    </List>
  </Stack>
);

const MapNavigation = () => {
  return (
    <Stack
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
      sx={{
        padding: 2,
        backgroundColor: "white",
        width: "100%",
        height: "100%",
      }}
    >
      <Explainer />
      <MapSearch />
      <MapFilters />
    </Stack>
  );
};

export default MapNavigation;
