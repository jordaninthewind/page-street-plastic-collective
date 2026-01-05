import { useNavigate } from "react-router";

import { Box, Button, Typography } from "@mui/material";

import HeroImage from "@app/assets/hero-image.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        p: { xs: 2, md: 6 },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gap: 4,
          alignItems: "center",
          gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
        }}
      >
        <Box>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.075em",
              fontSize: { xs: 34, sm: 42, md: 54 },
              mb: 2,
            }}
          >
            Replacing stolen drain covers with open-source, community-made
            solutions.
          </Typography>

          <Typography
            sx={{
              maxWidth: 560,
              fontSize: { xs: 16, md: 18 },
              lineHeight: 1.6,
              fontWeight: 600,
              mb: 3,
              opacity: 0.9,
            }}
          >
            When steel drain covers disappear, neighborhoods are left with
            hazards. We design and share printable alternatives so anyone can
            help fix the problem.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/map")}
              sx={{
                borderRadius: 2,
                fontWeight: 700,
              }}
            >
              View the Map →
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={() =>
                document.getElementById("model-3d").scrollIntoView()
              }
              sx={{
                borderRadius: 2,
                fontWeight: 700,
              }}
            >
              Print a Cover →
            </Button>
          </Box>
        </Box>

        {/* Right: Image */}
        <Box
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            justifySelf: { xs: "stretch", md: "end" },
            width: { xs: "100%", md: "520px" },
            maxWidth: "100%",
          }}
        >
          <Box
            component="img"
            src={HeroImage}
            alt="Installing a 3D-printed drain cover"
            sx={{
              display: "block",
              width: "100%",
              height: "100%",
              maxHeight: { xs: 260, sm: 360, md: 520 },
              objectFit: "fill",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
