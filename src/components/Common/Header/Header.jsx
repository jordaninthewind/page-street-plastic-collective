import "./Header.css";
import { useLocation, useNavigate } from "react-router";

import { Home, Map } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";

import { PROJECT_NAME } from "@app/constants";

const Header = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const letters = PROJECT_NAME.split("").map((letter, index) => (
    <span
      key={index}
      className="header-letter"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {letter === " " ? "\u00A0" : letter}
    </span>
  ));

  return (
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
        {pathname === "/" && (
          <IconButton sx={{ zIndex: 1000 }} onClick={() => navigate("/map")}>
            <Map sx={{ height: 60, width: 60 }} color="accent" />
          </IconButton>
        )}
        {pathname === "/map" && (
          <IconButton sx={{ zIndex: 1000 }} onClick={() => navigate("/")}>
            <Home sx={{ height: 60, width: 60 }} color="accent" />
          </IconButton>
        )}
      </Box>
    </Stack>
  );
};

export default Header;
