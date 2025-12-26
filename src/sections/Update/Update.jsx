import { Link } from "react-router";

import { Box, Typography } from "@mui/material";

import { InfoBlock } from "@app/components";
import { UPDATE_SECTION } from "@app/constants";
import { Section } from "@app/containers";

const Update = () => (
  <Section title={UPDATE_SECTION.title} sx={{ alignItems: "flex-start" }}>
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box mb={2}>
        <Typography variant="h2">
          Check out the <Link to="/map">interactive map</Link> to let us know if
          you need a drain cover
        </Typography>
      </Box>
      <InfoBlock>{UPDATE_SECTION.subtitle}</InfoBlock>
    </Box>
  </Section>
);

export default Update;
