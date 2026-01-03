import { useSearchParams } from "react-router";

import { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Dialog, IconButton, useMediaQuery } from "@mui/material";

import { MarkerEditor, ModelViewer } from "@app/components";
import { SupportUs } from "@app/sections";

const Modal = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [overlay, setOverlay] = useState(null);

  const [searchParams, setParams] = useSearchParams();

  useEffect(() => {
    const overlay = searchParams.get("overlay");

    if (overlay) {
      setOverlay(overlay);
    } else {
      setOverlay(null);
    }

    return () => {
      setOverlay(null);
    };
  }, [searchParams, overlay]);

  const handleClose = () => setParams({});

  return (
    <Dialog
      open={!!overlay}
      onClose={handleClose}
      scroll="body"
      fullScreen={isMobile}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 255, 0.5)",
          },
        },
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{ position: "absolute", top: 5, right: 5, zIndex: 1000 }}
      >
        <CloseIcon />
      </IconButton>
      {overlay === "marker" && <MarkerEditor />}
      {overlay === "model" && <ModelViewer />}
      {overlay === "support-us" && <SupportUs />}
    </Dialog>
  );
};

export default Modal;
