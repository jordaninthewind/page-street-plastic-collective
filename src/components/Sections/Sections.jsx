import { DashedDivider } from "@app/components";
import {
  Contact,
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
import { Fragment } from "react";

const sections = [
  Problem,
  Solution,
  Model3D,
  Map,
  Partners,
  CoverTheCity,
  SupportUs,
  SocialLinks,
  Contact,
  Privacy,
];

const Sections = () =>
  sections.map((Section, idx) => (
    <Fragment key={idx}>
      <DashedDivider />
      <Section />
    </Fragment>
  ));

export default Sections;
