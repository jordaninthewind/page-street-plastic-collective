import { Box } from "@mui/material";

import { DashedDivider, ScrollToTop } from "@app/components";
import {
  Contributors,
  CoverTheCity,
  Hero,
  Map,
  Model3D,
  Privacy,
  Problem,
  Solution,
  SupportUs,
} from "@app/sections";

const sections = [
  Hero,
  Problem,
  Solution,
  Map,
  Model3D,
  Contributors,
  CoverTheCity,
  SupportUs,
  Privacy,
];

const Home = () => (
  <>
    {sections.map((Section, idx) => (
      <Box key={idx} id={Section.id}>
        <Section />
        <DashedDivider />
      </Box>
    ))}
    <ScrollToTop />
  </>
);

export default Home;
