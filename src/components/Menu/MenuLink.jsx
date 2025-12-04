import {
  ButtonBase,
  Divider,
  Grow,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const MenuLink = ({ id, title, onClick }) => {
  const theme = useTheme();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <ButtonBase onClick={() => onClick(id)}>
      <Stack direction="column">
        <Typography
          key={id}
          variant="h1"
          color="black"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {title}
        </Typography>
        <Grow in={isHovered}>
          <Divider
            sx={{
              p: 0,
              height: 10,
              backgroundColor: theme.palette.accent.main,
            }}
            component="span"
          />
        </Grow>
      </Stack>
    </ButtonBase>
  );
};

export default MenuLink;
