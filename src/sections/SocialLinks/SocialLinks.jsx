import { Box, Container } from '@mui/material';

import { Section } from '@app/containers';

const SocialLinks = (props) => (
    <Section id="social" {...props}>
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
        </Container>
    </Section>
);

export default SocialLinks;