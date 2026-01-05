import { Box } from "@mui/material";

import { DashedDivider, Header, ScrollToTop } from "@app/components";
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
    <Header />
    {sections.map((Section, idx) => (
      <Box key={idx} id={Section.id}>
        <DashedDivider />
        <Section />
      </Box>
    ))}
    <ScrollToTop />
  </>
);

export default Home;
