import { DashedDivider } from "@app/components";
import {
  CoverTheCity,
  Map,
  Model3D,
  Contributors,
  Privacy,
  Problem,
  Solution,
  SupportUs,
} from "@app/sections";

const sections = [
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
  <div id={Section.id} key={idx}>
    <DashedDivider />
    <Section />
  </div>
);

const Sections = () => sections.map(ComposedSection);

export default Sections;
