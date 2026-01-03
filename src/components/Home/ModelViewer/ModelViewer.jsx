import { usePostHog } from "@posthog/react";
import { StlViewer } from "react-stl-viewer";

import { useEffect } from "react";

const ModelViewer = () => {
  const posthog = usePostHog();

  useEffect(() => {
    posthog.capture("model_viewed");
  }, [posthog]);

  return (
    <StlViewer
      url={import.meta.env.VITE_3D_MODEL_URL}
      style={{ width: "100%", height: "100%", left: 0, top: 0 }}
      modelProps={{
        color: "gray",
        metalness: 0.3,
        roughness: 0.4,
        scale: 3,
      }}
      orbitControls
      shadows
    />
  );
};

export default ModelViewer;
