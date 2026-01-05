import { Box, Divider, Grid, Typography } from "@mui/material";

import { SOLUTION_SECTION } from "@app/constants";
import { Section } from "@app/containers";
import "@app/sections/Solution/Solution.css";

const Solution = () => (
  <Section id={SOLUTION_SECTION.id}>
    <Grid container spacing={4} alignItems="center">
      <Grid size={{ xs: 12, md: 5 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <img
            src="cover-logo.svg"
            style={{ maxWidth: "100%", width: "auto", height: "auto" }}
            alt="Cover logo"
            loading="lazy"
          />
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: 34, sm: 42, md: 54 } }}
          >
            {SOLUTION_SECTION.title}
          </Typography>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 7 }}>
        <img
          src="sewer-cover-type-1.jpg"
          style={{
            maxWidth: "100%",
            width: "auto",
            height: "auto",
            borderRadius: "20px",
          }}
          alt="Printed sewer cover"
          loading="lazy"
        />
      </Grid>
    </Grid>
  </Section>
);

export default Solution;
