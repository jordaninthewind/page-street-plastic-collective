import { useSearchParams } from "react-router";

import { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Dialog, IconButton } from "@mui/material";

import { ModelViewer } from "@app/components";
import { useIsMobile } from "@app/hooks";
import { SupportUs } from "@app/pages/Home/sections";

const Modal = () => {
  const { isMobile } = useIsMobile();
  const [overlay, setOverlay] = useState<string | null>(null);
  const [searchParams, setParams] = useSearchParams();

  useEffect(() => {
    const overlayParam = searchParams.get("overlay");
    setOverlay(overlayParam);
    return () => setOverlay(null);
  }, [searchParams]);

  const handleClose = () => setParams({});

  return (
    <Dialog
      open={!!overlay}
      onClose={handleClose}
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
        onClick={handleClose}
        sx={{ position: "absolute", top: 5, right: 5, zIndex: 1000 }}
      >
        <CloseIcon />
      </IconButton>
      {overlay === "model" && <ModelViewer />}
      {overlay === "support-us" && <SupportUs />}
    </Dialog>
  );
};

export default Modal;
