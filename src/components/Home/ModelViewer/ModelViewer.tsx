import { usePostHog } from "@posthog/react";
import { useEffect } from "react";
import { StlViewer } from "react-stl-viewer";


const ModelViewer = () => {
  const posthog = usePostHog();

  useEffect(() => {
    posthog.capture("model_viewed");
  }, [posthog]);

  return (
    <StlViewer
      url={import.meta.env.VITE_3D_MODEL_URL as string}
      style={{ width: "100%", height: "100%", left: 0, top: 0, borderRadius: 16 }}
      modelProps={{
        color: "gray",
        scale: 10,
      }}
      orbitControls
      shadows
    />
  );
};

export default ModelViewer;
