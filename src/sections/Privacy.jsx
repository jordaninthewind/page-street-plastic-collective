import { Section } from '@app/containers';

import './Privacy.css';

const title = 'Simple Privacy';

const Privacy = () => (
  <Section id="privacy" title={title}>
    <p>We get info about how many people have visited our page, but we don't collect any other information.</p>
    <p>We're just here to connect with neighbors and solve some solvable problems.</p>
  </Section>
);

export default Privacy; 