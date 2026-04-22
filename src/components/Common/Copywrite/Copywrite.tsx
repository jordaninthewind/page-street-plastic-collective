import { Stack, Typography } from "@mui/material";

const Copywrite = () => (
  <Stack>
    <Typography variant="overline" color="text.secondary">
      &copy; {new Date().getFullYear()} Page Street Plastic Collective. All
      rights reserved.
    </Typography>
  </Stack>
);

export default Copywrite;
