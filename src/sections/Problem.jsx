import { Stack } from '@mui/material';

import { Section } from '../containers';

import './Problem.css';

const Problem = () => (
    <Section id="problem" title="Problem">
      <p>In San Francisco, homeowners are required to cover the drain pipes in front of their homes with grates to prevent litter from entering the pipes. These covers are made of steel and they a frequently stolen. Historically, they were made of brass.</p>

      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <img style={{ width: '49%' }} src="public/uncovered-sewer-cap-type-1.jpg" alt="Uncovered sewer cap type 1" />
        <img style={{ width: '49%' }} src="public/uncovered-sewer-cap-type-1-a.jpg" alt="Uncovered sewer cap type 2" />
      </Stack>
      <p>There are a few reasons that these covers are frequently stolen:</p>
      <ul>
        <li>The covers are made of recyclable materials</li>
        <li>The covers are used as a medium for art</li>
        <li>The covers are easy to steal</li>
        <li>The covers are a specific size and shape and are often in short supply</li>
      </ul>
    </Section>
  );

export default Problem; 