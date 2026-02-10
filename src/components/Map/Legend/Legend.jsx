import { Box, Typography } from "@mui/material";

import { MARKER_TYPES } from "@app/constants";

const Legend = () => {
  return (
    <Box>
      <Typography color={MARKER_TYPES.covered.color}>Covered</Typography>
      <Typography color={MARKER_TYPES.missing.color}>Missing</Typography>
      <Typography color={MARKER_TYPES.temporary.color}>Temporary</Typography>
    </Box>
  );
};

export default Legend;
