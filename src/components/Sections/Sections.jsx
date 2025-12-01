import { Fragment } from "react";

import { DashedDivider } from "@app/components";
import {
  CoverTheCity,
  Map,
  Model3D,
  Partners,
  Privacy,
  Problem,
  SocialLinks,
  Solution,
  SupportUs,
} from "@app/sections";

const sections = [
  Problem,
  Solution,
  Model3D,
  Map,
  Partners,
  CoverTheCity,
  SupportUs,
  SocialLinks,
  Privacy,
];

const ComposedSection = (Section, idx) => (
  <Fragment key={idx}>
    <DashedDivider />
    <Section />
  </Fragment>
);

const Sections = () => sections.map(ComposedSection);

export default Sections;
