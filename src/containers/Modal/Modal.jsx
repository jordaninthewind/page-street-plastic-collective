import CloseIcon from "@mui/icons-material/Close";
import { Dialog, IconButton } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router";

import { InteractiveMap, ModelViewer } from "@app/components";
import { SupportUs } from "@app/sections";

const Modal = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const overlay = searchParams.get("overlay");

  const handleClose = () => navigate("/");

  return (
    <Dialog
      open={!!overlay}
      onClose={handleClose}
      scroll="body"
      maxWidth="lg"
      fullScreen
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 255, 0.5)",
          },
        },
      }}
      sx={{
        maxWidth: "90vw",
        maxHeight: "90vh",
        margin: "auto",
        borderRadius: "20px",
        border: "12px solid #FFF",
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{ position: "absolute", top: 5, right: 5, zIndex: 1000 }}
      >
        <CloseIcon />
      </IconButton>
      {overlay === "map" && <InteractiveMap />}
      {overlay === "model" && <ModelViewer />}
      {overlay === "support-us" && <SupportUs />}
    </Dialog>
  );
};

export default Modal;
