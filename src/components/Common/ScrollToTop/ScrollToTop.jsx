import { ArrowUpward } from "@mui/icons-material";
import { Fab } from "@mui/material";

const ScrollToTop = () => (
  <Fab
    color="secondary"
    aria-label="scroll to top"
    sx={{ position: "fixed", bottom: 20, right: 20 }}
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  >
    <ArrowUpward />
  </Fab>
);

export default ScrollToTop;
