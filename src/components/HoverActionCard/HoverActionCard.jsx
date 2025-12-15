import { OpenInBrowser } from "@mui/icons-material";
import { Box, Card, Typography, styled } from "@mui/material";

const StyledCard = styled(Card)({
  alignItems: "center",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  padding: "16px",
  position: "relative",
  width: "100%",
});

const StyledBox = styled(Box)({
  alignItems: "center",
  backgroundColor: "transparent",
  display: "hidden",
  height: "100%",
  justifyContent: "center",
  left: 0,
  position: "absolute",
  top: 0,
  transition: "display 0.3s ease-in-out",
  width: "100%",
  zIndex: 1000,
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    transition: "background-color 0.1s ease-in-out",
  },
});

const HoverActionCard = ({
  title = "Open map",
  Icon = OpenInBrowser,
  onClick,
  children,
}) => (
  <StyledCard onClick={onClick}>
    <StyledBox>
      <Box style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h4"
          color="white"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          {title} {Icon && <Icon sx={{ fontSize: "2rem" }} />}
        </Typography>
      </Box>
    </StyledBox>
    {children}
  </StyledCard>
);

export default HoverActionCard;
