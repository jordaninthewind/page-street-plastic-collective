import "./Header.css";
import { useLocation, useNavigate } from "react-router";

import { Home, Map } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";

import { DashedDivider } from "@app/components";
import { PROJECT_NAME } from "@app/constants";
import { useIsMobile } from "@app/hooks";

const Header = () => {
  const navigate = useNavigate();
  const { isMobile } = useIsMobile();
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
    <Box
      sx={{
        minWidth: "100%",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "background.default",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant={isMobile ? "h3" : "h1"} className="header" ml={2}>
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
      <DashedDivider />
    </Box>
  );
};

export default Header;
