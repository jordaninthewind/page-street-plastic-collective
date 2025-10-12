import { Box, Container, Typography } from '@mui/material';

import { Section } from '@app/containers';

const title = 'Follow Us';
const subtitle = 'Stay connected with our mission to cover the city and protect our environment.';

const SocialLinks = () => (
    <Section id="social" title={title} subtitle={subtitle}>
        <Container maxWidth="md" sx={{ pb: 3 }}>
        <Box
            sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
            mt: 3
            }}
        >
            <a className="instagram-link" href="https://instagram.com/pagestreetplasticcollective" target="_blank" rel="noopener noreferrer">Follow us on Instagram</a>
        </Box>
        <Typography 
            variant="body2" 
            align="center" 
            sx={{ mt: 3, color: 'text.secondary' }}
        >
            Join our community and help us make a difference!
        </Typography>
        </Container>
    </Section>
);

export default SocialLinks;