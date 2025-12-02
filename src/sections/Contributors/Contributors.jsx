import { Stack } from "@mui/material";

import { ContributorCard } from "@app/components";
import { CONTRIBUTORS, COPY_PROPS } from "@app/constants";
import { Section } from "@app/containers";

import "@app/sections/Contributors/Contributors.css";

const Contributors = () => (
  <Section id="contributors" {...COPY_PROPS.contributors}>
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      {CONTRIBUTORS.map((contributor, index) => (
        <ContributorCard key={index} {...contributor} />
      ))}
    </Stack>
  </Section>
);

export default Contributors;
