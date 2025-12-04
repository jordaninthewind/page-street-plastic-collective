import { Close as CloseIcon } from "@mui/icons-material";
import { Box, Drawer, IconButton } from "@mui/material";

import { MenuLink } from "@app/components";
import { SECTIONS } from "@app/constants";

const Menu = ({ open, handleClose }) => {
  const handleNavigate = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });

    handleClose();
  };

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            width: "100vw",
            height: "100vh",
            maxWidth: "100vw",
            maxHeight: "100vh",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      }}
      transitionDuration={{ enter: 400, exit: 200 }}
    >
      <Box
        p={2}
        sx={{
          maxWidth: "1580px",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 5, right: 5, zIndex: 1000 }}
        >
          <CloseIcon sx={{ height: 50, width: 50 }} color="accent" />
        </IconButton>
        {SECTIONS.map((section, idx) => (
          <MenuLink key={idx} {...section} onClick={handleNavigate} />
        ))}
      </Box>
    </Drawer>
  );
};
export default Menu;
