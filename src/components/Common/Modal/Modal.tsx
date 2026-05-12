import CloseIcon from "@mui/icons-material/Close";
import { Dialog, IconButton } from "@mui/material";

import PrintACover from "@app/components/Home/PrintACover/PrintACover";
import Contribute from "@app/components/Home/Contribute/Contribute";
import withSearchParamState from "@app/components/HOC/withSearchParamState";
import { useIsMobile } from "@app/hooks";

const Modal = withSearchParamState(({ overlay, clearFilter }: { overlay: string | null, clearFilter: () => void }) => {
  const { isMobile } = useIsMobile();

  return (
    <Dialog
      open={!!overlay}
      onClose={clearFilter}
      scroll="body"
      fullScreen={isMobile}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(0, 0, 255, 0.5)" },
        },
        paper: {
          sx: { borderRadius: "20px", p: 4, height: "fit-content", maxHeight: "80vh" },
        },
      }}
    >
      <IconButton
        onClick={clearFilter}
        sx={{ position: "absolute", top: 5, right: 5, zIndex: 1000 }}
      >
        <CloseIcon />
      </IconButton>
      {overlay === "model" && <PrintACover />}
      {overlay === "contribute" && <Contribute />}
    </Dialog>
  );
});

export default Modal;
