import { COPY_PROPS } from "@app/constants";
import { Section } from "@app/containers";

import "@app/sections/Privacy/Privacy.css";

const Privacy = () => (
  <Section id="privacy" {...COPY_PROPS.privacy}>
    <p>
      We get info about how many people have visited our page, but we don't
      collect any other information.
    </p>
    <p>
      We're just here to connect with neighbors and solve some solvable
      problems.
    </p>
  </Section>
);

export default Privacy;
