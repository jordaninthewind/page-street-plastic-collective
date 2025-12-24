import { Box, Typography } from "@mui/material";

const MarkerInfo = ({ cover }) => {
  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 2 }}>
        Drain Cover Information
      </Typography>
      <Typography variant="h6">Requested By: {cover.requested_by}</Typography>
      <Typography variant="body1">Description: {cover.description}</Typography>
      <Typography variant="body1">State: {cover.state}</Typography>
      <Typography variant="body1">Cover Type: {cover.cover_type}</Typography>
      <Typography variant="body1">Address: {cover.address}</Typography>
      <Typography variant="body1">Location: {cover.location}</Typography>
      <Typography variant="body1">Created At: {cover.created_at}</Typography>
      <Typography variant="body1">Updated At: {cover.updated_at}</Typography>
    </Box>
  );
};

export default MarkerInfo;
