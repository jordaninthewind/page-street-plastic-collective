import { usePostHog } from "@posthog/react";
import { useEffect } from "react";
import { StlViewer } from "react-stl-viewer";

const modelProps = {
  color: "gray",
  metalness: 0.3,
  roughness: 0.4,
  scale: 3,
};

const ModelViewer = () => {
  const posthog = usePostHog();

  useEffect(() => {
    posthog.capture("model_viewed");
  }, [posthog]);

  return (
    <StlViewer
      url={import.meta.env.VITE_3D_MODEL_URL}
      modelProps={modelProps}
      orbitControls
      shadows
    />
  );
};

export default ModelViewer;
