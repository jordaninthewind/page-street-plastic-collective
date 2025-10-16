import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import { usePostHog } from 'posthog-js/react';

import { Section } from '@app/containers';

import '@app/sections/SupportUs.css';

const title = 'Support Our Mission';
const subtitle = 'Help us make a difference in our community by supporting our plastic collection initiative.';

const SupportUs = () => {
  const { capture } = usePostHog();

  const handleShareClick = () => {
    capture('support_share_clicked');

    if (navigator.share) {
      navigator.share({
        title: 'Page Street Plastic Collective',
        text: 'Join us in cleaning up our community!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <Section id="support" title={title} subtitle={subtitle}>
      <Stack direction="column" spacing={3} width="100%" justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6} width="100%">
          <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
            <h3>Join our community and help us make a difference!</h3>
            <a href="https://buymeacoffee.com/pagestreetplastic" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee" style={{ height: '40px' }} />
            </a>
            <p>Our only cost is the PLA filament and the time it takes to print the covers. So feel free to support however able!</p>
            <p>I'll find a way to link directly to filament purchases that can be sent directly to us, soon!</p>
          </Card>
        </Grid>
        <Grid item xs={12} width="100%">
          <Card width="100%">
            <CardContent>
              <Typography variant="h5" component="h3" gutterBottom align="center">
                📢 Spread the Word
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center">
                Help us reach more people by sharing our mission with your friends, family, and social networks.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleShareClick}
                  sx={{ minWidth: '120px' }}
                >
                  Share This Page
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Stack>
    </Section>
  );
};

export default SupportUs;
