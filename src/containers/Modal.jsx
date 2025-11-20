import { Dialog } from "@mui/material";

import { Map, Model3D, SupportUs } from "@app/sections";

const Modal = ({ onClose } = { onClose: () => {} }) => {
  const queryParams = new URLSearchParams(window.location.search);
  const overlay = queryParams.get("overlay");

  return (
    <Dialog open={!!overlay} onClose={onClose}>
      {overlay === "map" && <Map />}
      {overlay === "model-3d" && <Model3D />}
      {overlay === "support-us" && <SupportUs />}
    </Dialog>
  );
};

export default Modal;
