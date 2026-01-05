import { useNavigate } from "react-router";

import DownloadIcon from "@mui/icons-material/Download";
import { Box, Button, List, ListItem, Stack, Typography } from "@mui/material";

import { InfoBlock } from "@app/components";
import { GradientButton } from "@app/components";
import { MODEL_3D_SECTION } from "@app/constants";
import { Section } from "@app/containers";
import "@app/sections/Model3D/Model3D.css";

const Model3D = () => {
  const navigate = useNavigate();

  const onViewClick = () => navigate("/?overlay=model");

  return (
    <Section {...MODEL_3D_SECTION}>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Stack direction="column" spacing={2}>
          <Button
            onClick={onViewClick}
            variant="contained"
            size="large"
            color="primary"
          >
            View V5 Model
          </Button>
          <GradientButton
            href={import.meta.env.VITE_3D_MODEL_URL}
            download
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            className="download-btn"
          >
            Download STL File
          </GradientButton>
        </Stack>
        <Box
          sx={{
            background: "#f8f9fa",
            border: "2px solid #2c3e50",
            borderRadius: "8px",
            px: 2,
            pt: 1,
            maxWidth: "fit-content",
          }}
        >
          <Typography variant="h4">Model Specifications</Typography>
          <List>
            <ListItem>Format: STL (Stereolithography)</ListItem>
            <ListItem>Compatible with all 3D printers</ListItem>
            <ListItem>Optimized for FDM printing</ListItem>
            <ListItem>Material: PLA, ABS, or stronger</ListItem>
          </List>
        </Box>
      </Stack>
    </Section>
  );
};

export default Model3D;
