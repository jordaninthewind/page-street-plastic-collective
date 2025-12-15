import { Box, Divider, Grid, Typography } from "@mui/material";

import { SOLUTION_SECTION } from "@app/constants";
import { Section } from "@app/containers";
import "@app/sections/Solution/Solution.css";

const Solution = () => (
  <Section id={SOLUTION_SECTION.id}>
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 5 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <img
            src="cover-logo.svg"
            style={{ maxWidth: "100%", width: "auto", height: "auto" }}
            alt="Cover logo"
          />
          <Typography variant="sectionTitle">
            {SOLUTION_SECTION.title}
          </Typography>
          <Divider sx={{ border: "3px solid #000", mb: 2 }} />
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 7 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="subtitle">
            {SOLUTION_SECTION.subtitle}
          </Typography>
          <img
            src="sewer-cover-type-1.jpg"
            style={{ maxWidth: "100%", width: "auto", height: "auto" }}
            alt="Printed sewer cover"
          />
        </Box>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h4">
          We have designed and are actively printing a cheap 3D printed version
          of the sewer cover to let anyone print their own and cover up theirs
          or their neighbor's sewer cover.
        </Typography>
      </Grid>
    </Grid>
  </Section>
);

export default Solution;
