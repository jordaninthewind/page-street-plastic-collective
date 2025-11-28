import { Box, Button, Typography } from "@mui/material";
import { usePostHog } from "@posthog/react";
import { useState } from "react";
import { StlViewer } from "react-stl-viewer";

import { COPY_PROPS } from "@app/constants";
import { Section } from "@app/containers";

import "@app/sections/Model3D/Model3D.css";

const modelUrl = import.meta.env.VITE_3D_MODEL_URL;

const Model3D = () => {
  const posthog = usePostHog();

  const [loading, setLoading] = useState(false);

  const onViewClick = () => {
    setLoading(true);
    posthog.capture("model_viewed");
  };

  return (
    <Section id="model-3d" {...COPY_PROPS.model3D}>
      {loading ? (
        <Box className="model-viewer">
          <StlViewer
            style={{
              width: "100%",
              height: "500px",
              backgroundColor: "darkgray",
              borderRadius: "10px",
            }}
            orbitControls
            shadows
            url={modelUrl}
            modelProps={{
              color: "black",
              metalness: 0.3,
              roughness: 0.4,
              scale: 3,
            }}
          />
        </Box>
      ) : (
        <Box className="model-viewer" sx={{ width: "100%", height: "500px" }}>
          <Button
            onClick={onViewClick}
            variant="contained"
            size="large"
            color="primary"
          >
            View V4 Model
          </Button>
        </Box>
      )}
      <Box className="model-actions">
        <a href={modelUrl} download className="download-btn">
          📥 Download STL File
        </a>
        <Box className="model-info">
          <Typography variant="h4">Model Specifications</Typography>
          <ul>
            <li>Format: STL (Stereolithography)</li>
            <li>Compatible with all 3D printers</li>
            <li>Optimized for FDM printing</li>
            <li>Material: PLA or ABS recommended, or stronger materials</li>
          </ul>
        </Box>
      </Box>
    </Section>
  );
};

export default Model3D;
