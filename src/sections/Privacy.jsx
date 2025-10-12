import { Section } from '@app/containers';

import './Privacy.css';

const title = 'Privacy';
const subtitle = 'We do not collect any data from you. We do not use any cookies. We do not track you. We do not sell your data. We do not share your data with anyone.';

const Privacy = () => (
    <Section id="privacy" title={title} subtitle={subtitle}>
      <p>We're just here to connect with neighbors and solve some solvable problems.</p>
    </Section>
  );

export default Privacy; 