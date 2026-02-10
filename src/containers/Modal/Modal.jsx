import { useSearchParams } from "react-router";

import { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Dialog, IconButton } from "@mui/material";

import { ModelViewer } from "@app/components";
import { useIsMobile } from "@app/hooks";
import { SupportUs } from "@app/sections";

const Modal = () => {
  const { isMobile } = useIsMobile();

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
      maxWidth="fit-content"
      maxHeight="fit-content"
      minWidth="fit-content"
      minHeight="fit-content"
      fullScreen={isMobile}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 255, 0.5)",
          },
        },
        paper: {
          sx: {
            borderRadius: "20px",
            overflow: "hidden",
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
      {overlay === "model" && <ModelViewer />}
      {overlay === "support-us" && <SupportUs />}
    </Dialog>
  );
};

export default Modal;
