import { Typography } from "@mui/material";

import { CardSection, Section } from "@app/components";
import { PRIVACY_SECTION } from "@app/constants";
import "@app/pages/Home/sections/Privacy/Privacy.css";

const Privacy = () => (
  <Section title={PRIVACY_SECTION.title}>
    <CardSection subtitle={PRIVACY_SECTION.subtitle} />
    <Typography mt={2} variant="body1" color="text.secondary" align="center">
      We&apos;re just here to connect with neighbors and solve some solvable
      problems. ☺️
    </Typography>
  </Section>
);

export default Privacy;
