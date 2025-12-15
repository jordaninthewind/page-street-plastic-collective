import { Grid } from "@mui/material";

import { ContributorCard } from "@app/components";
import { CONTRIBUTORS, CONTRIBUTORS_SECTION } from "@app/constants";
import { Section } from "@app/containers";
import "@app/sections/Contributors/Contributors.css";

const Contributors = () => (
  <Section {...CONTRIBUTORS_SECTION}>
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {CONTRIBUTORS.map((contributor, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
          <ContributorCard {...contributor} />
        </Grid>
      ))}
    </Grid>
  </Section>
);

export default Contributors;
