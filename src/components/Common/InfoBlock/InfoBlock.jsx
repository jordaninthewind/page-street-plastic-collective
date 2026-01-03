import { Box, Typography, useTheme } from "@mui/material";

const InfoBlock = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      mb={2}
      sx={{
        backgroundColor: theme.palette.background.paper,
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: "8px",
        p: 2,
        maxWidth: "fit-content",
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        {children}
      </Typography>
    </Box>
  );
};

export default InfoBlock;
