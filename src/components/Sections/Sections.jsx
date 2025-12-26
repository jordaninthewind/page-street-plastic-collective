import { Box } from "@mui/material";

import { DashedDivider } from "@app/components";
import {
  Contributors,
  CoverTheCity,
  Map,
  Model3D,
  Privacy,
  Problem,
  Solution,
  SupportUs,
  Update,
} from "@app/sections";

const sections = [
  Update,
  Problem,
  Solution,
  Model3D,
  Map,
  Contributors,
  CoverTheCity,
  SupportUs,
  Privacy,
];

const ComposedSection = (Section, idx) => (
  <Box key={idx} id={Section.id}>
    <DashedDivider />
    <Section />
  </Box>
);

const Sections = () => sections.map(ComposedSection);

export default Sections;
