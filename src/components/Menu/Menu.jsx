import { Close as CloseIcon } from "@mui/icons-material";
import { Box, Drawer, Fade, IconButton, Stack } from "@mui/material";

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
      transitionDuration={{ enter: 400, exit: 200 }}
      slotProps={{
        paper: {
          sx: {
            alignItems: "center",
            backgroundColor: "rgba(248, 246, 236, 1)",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            justifyContent: "center",
            maxWidth: "100vw",
            maxHeight: "100vh",
            width: "100vw",
          },
        },
      }}
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
        <Fade timeout={1200} in={open} mountOnEnter unmountOnExit>
          <Stack direction="column" spacing={2}>
            {SECTIONS.map((section, idx) => (
              <MenuLink key={idx} {...section} onClick={handleNavigate} />
            ))}
          </Stack>
        </Fade>
      </Box>
    </Drawer>
  );
};
export default Menu;
