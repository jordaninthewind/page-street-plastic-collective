import { Button, styled } from "@mui/material";

const GradientButton = styled(Button)({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  minWidth: "fit-content",
  padding: "1rem 2rem",
  "&:hover": {
    color: "white",
    background: "linear-gradient(55deg, #667eea 0%, #764ba2 100%)",
    transform: "scale(1.05)",
    transition: "background 1s ease-in-out, transform 0.2s ease-in-out",
  },
});

export default GradientButton;
