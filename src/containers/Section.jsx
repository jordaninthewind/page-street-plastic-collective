import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Section = ({ children, title, subtitle }) => (
  <Container
    disableGutters
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      gap: 4,
    }}
  >
    <Box sx={{ width: '100%' }}>
      <Typography variant="sectionTitle">{title}</Typography>
      {subtitle && <Typography variant="h2">{subtitle}</Typography>}
    </Box>
    <Box sx={{ width: '100%' }}>
      {children}
    </Box>
  </Container>
);

export default Section;
