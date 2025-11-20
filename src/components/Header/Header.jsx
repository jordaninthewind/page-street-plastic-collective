import { Typography } from "@mui/material";

import "@app/components/Header/Header.css";

const Header = () => {
  const letters = "Page Street Plastic Collective"
    .split("")
    .map((letter, index) => (
      <span
        key={index}
        className="header-letter"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {letter === " " ? "\u00A0" : letter}
      </span>
    ));

  return (
    <div className="header-container">
      <Typography variant="sectionTitle" className="header">
        {letters}
      </Typography>
    </div>
  );
};

export default Header;
