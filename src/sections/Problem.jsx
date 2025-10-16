import { List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import { Section } from '@app/containers';

import './Problem.css';

const title = 'A Frustrating Problem';
const subtitle = 'In San Francisco, homeowners are required to cover the drain pipes in front of their homes with grates to prevent litter from entering the pipes. These covers are made of steel and they a frequently stolen. Historically, they were made of brass.';

const reasons = [
  'Recyclable materials',
  'Used as a medium for art',
  'Specific size and shape and are often in short supply',
  'Easy to steal'
];

const Reason = ({ text }) => (
  <ListItem key={text} >
    <ListItemIcon>
      <CheckCircle color='success' />
    </ListItemIcon>
    <ListItemText>
      <Typography variant="list">
        {text}
      </Typography>
    </ListItemText>
  </ListItem>
);

const Problem = () => (
  <Section id="problem" title={title} subtitle={subtitle}>
    <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
      <img style={{ width: '49%' }} src="uncovered-sewer-cap-type-1.jpg" alt="Uncovered sewer cap type 1" />
      <img style={{ width: '49%' }} src="uncovered-sewer-cap-type-1-a.jpg" alt="Uncovered sewer cap type 2" />
    </Stack>
    <Typography variant="h5" sx={{ mt: 2 }}>There are a few reasons that these covers are frequently stolen:</Typography>
    <List>{reasons.map((reason, idx) => <Reason text={reason} key={idx} />)}</List>
  </Section>
);

export default Problem; 