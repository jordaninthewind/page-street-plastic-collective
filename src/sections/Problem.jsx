import { Box, Divider, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';

import { Section } from '@app/containers';

import './Problem.css';

const title = 'A Frustrating Problem';
const subtitle = 'In San Francisco, homeowners are required to cover the drain pipes in front of their homes with grates to prevent litter from entering the pipes. These covers are made of steel and they a frequently stolen. Historically, they were made of brass.';

const reasons = [
  'Recyclable materials',
  'Used for art',
  'Hard to replace',
  'Easy to steal'
];

const Reason = ({ text, idx }) => (
  <ListItem>
    <Typography variant="listText">0{idx + 1}</Typography>
    <ListItemText sx={{ alignSelf: 'flex-start', ml: 2, mt: 1 }}>
      <Typography variant="subtitle">
        {text}
      </Typography>
    </ListItemText>
  </ListItem>
);

const Problem = () => (
  <Section id="problem">
    <Grid container spacing={4}>
      <Typography variant="sectionTitle">{title}</Typography>
      <Grid item size={{ xs: 12, md: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <img src="uncovered-sewer-cap-type-1.jpg" alt="Uncovered sewer cap example" />
          <img src="uncovered-sewer-cap-type-1-a.jpg" alt="Uncovered sewer cap example" />
        </Box>
      </Grid>
      <Grid item size={{ xs: 12, md: 6 }}>
        <Divider sx={{ border: '3px solid #000', mb: 2 }} />
        <Typography variant="subtitle">{subtitle}</Typography>
        <List>{reasons.map((reason, idx) => <Reason text={reason} idx={idx} key={idx} />)}</List>
      </Grid>
    </Grid>
  </Section>
);

export default Problem; 