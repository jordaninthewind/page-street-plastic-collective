import { Box, Divider, Grid, Typography } from '@mui/material';

import { Section } from '@app/containers';

import './Solution.css';

const title = 'A Simple Solution';
const subtitle = 'As always, there\'s an opportunity to solve the issue with creativity and community.';

const Solution = () => (
  <Section id="solution">
    <Grid container spacing={4}>
      <Grid item size={{ xs: 12, md: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Typography variant="sectionTitle">{title}</Typography>
          <Divider sx={{ border: '3px solid #000', mb: 2 }} />
          <Typography variant="subtitle">{subtitle}</Typography>
        </Box>
      </Grid>
      <Grid item size={{ xs: 12, md: 7 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="sewer-cover-type-1.jpg" style={{ maxWidth: '100%', width: 'auto', height: 'auto' }} alt="Printed sewer cover" />
        </Box>
      </Grid>
      <Grid item size={{ xs: 12 }}>
        <Typography variant="h5">We have designed and are actively printing a cheap 3D printed version of the sewer cover to let anyone print their own and cover up theirs or their neighbor's sewer cover.</Typography>
      </Grid>
    </Grid>
  </Section>
);

export default Solution; 