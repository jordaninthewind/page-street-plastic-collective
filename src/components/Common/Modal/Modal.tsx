import CloseIcon from "@mui/icons-material/Close";
import { Dialog, IconButton } from "@mui/material";

import { ModelViewer } from "@app/components";
import withSearchParamState from "@app/components/HOC/withSearchParamState";
import { useIsMobile } from "@app/hooks";

const Modal = withSearchParamState(({ overlay, clearOverlay }: { overlay: string | null, clearOverlay: () => void }) => {
  const { isMobile } = useIsMobile();

  return (
    <Dialog
      open={!!overlay}
      onClose={clearOverlay}
      scroll="body"
      fullScreen={isMobile}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(0, 0, 255, 0.5)" },
        },
        paper: {
          sx: { borderRadius: "20px", overflow: "hidden" },
        },
      }}
    >
      <IconButton
        onClick={clearOverlay}
        sx={{ position: "absolute", top: 5, right: 5, zIndex: 1000 }}
      >
        <CloseIcon />
      </IconButton>
      {overlay === "model" && <ModelViewer />}
    </Dialog>
  );
});

export default Modal;
