import CloseIcon from "@mui/icons-material/Close";
import { Dialog, IconButton, styled } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router";

import { InteractiveMap } from "@app/components";
import { Model3D, SupportUs } from "@app/sections";

const StyledDialog = styled(Dialog)({
  maxWidth: "90vw",
  maxHeight: "90vh",
  margin: "auto",
  borderRadius: "20px",
  border: "12px solid #FFF",
});

const Modal = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClose = () => {
    navigate("/");
  };

  const overlay = searchParams.get("overlay");

  return (
    <StyledDialog
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
      {overlay === "model-3d" && <Model3D />}
      {overlay === "support-us" && <SupportUs />}
    </StyledDialog>
  );
};

export default Modal;
