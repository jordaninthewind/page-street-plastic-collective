import { Button } from "@mui/material";
import { usePostHog } from "posthog-js/react";
import { useState } from "react";
import { StlViewer } from "react-stl-viewer";

import { COPY_PROPS } from "@app/constants";
import { Section } from "@app/containers";

import "@app/sections/Model3D/Model3D.css";

const modelUrl = import.meta.env.VITE_3D_MODEL_URL;

const Model3D = () => {
  const { capture } = usePostHog();
  const [load, setLoad] = useState(false);

  const onViewClick = () => {
    setLoad(true);
    capture("model_viewed");
  };

  return (
    <Section id="model-3d" {...COPY_PROPS.model3D}>
      <div className="model-3d-container">
        <div className="model-3d-content">
          {load ? (
            <div className="model-viewer">
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
            </div>
          ) : (
            <div className="model-viewer">
              <Button
                onClick={onViewClick}
                variant="contained"
                size="large"
                color="secondary"
              >
                View V4 Model
              </Button>
            </div>
          )}
          <div className="model-actions">
            <a href={modelUrl} download className="download-btn">
              📥 Download STL File
            </a>
            <div className="model-info">
              <h4>Model Specifications</h4>
              <ul>
                <li>Format: STL (Stereolithography)</li>
                <li>Compatible with all 3D printers</li>
                <li>Optimized for FDM printing</li>
                <li>Material: PLA or ABS recommended, or stronger materials</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Model3D;
