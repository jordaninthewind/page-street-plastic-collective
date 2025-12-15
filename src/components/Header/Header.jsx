import { useState } from "react";

import { Menu as MenuIcon } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";

import { Menu } from "@app/components";
import "@app/components/Header/Header.css";

const headerText = "Page Street Plastic Collective";

const Header = () => {
  const letters = headerText.split("").map((letter, index) => (
    <span
      key={index}
      className="header-letter"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {letter === " " ? "\u00A0" : letter}
    </span>
  ));

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ minWidth: "100%" }}
      >
        <Typography variant="sectionTitle" className="header">
          {letters}
        </Typography>
        <Box>
          <IconButton sx={{ zIndex: 1000 }} onClick={() => setOpen(true)}>
            <MenuIcon sx={{ height: 60, width: 60 }} color="accent" />
          </IconButton>
        </Box>
      </Stack>
      <Menu open={open} handleClose={handleClose} />
    </>
  );
};

export default Header;
