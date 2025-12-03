import { Box, Container } from "@mui/material";

import { COPY_PROPS } from "@app/constants";
import { Section } from "@app/containers";

const SocialLinks = () => (
  <Section {...COPY_PROPS.socialLinks}>
    <Container maxWidth="md" sx={{ pb: 3 }}></Container>
  </Section>
);

export default SocialLinks;
