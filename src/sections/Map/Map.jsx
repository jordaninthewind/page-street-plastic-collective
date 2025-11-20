import { Card, Container, Stack, Typography } from '@mui/material';

import { Section } from '@app/containers';

import '@app/sections/Map/Map.css';

const Map = (props) => (
    <Section id="map" {...props}>
        <Container>
            <Card width="100%" sx={{ textAlign: 'center', p: 12, gap: 2 }}>
                <Stack direction="column" spacing={2}>
                    <Typography variant="h5" color="text.primary">Interactive map coming soon...</Typography>
                    <Typography variant="body1" color="text.primary">Neighbors will be able to show drain covers that are missing and then we can add a pic of the fixed cover!</Typography>
                </Stack>
            </Card>
        </Container>
    </Section >
);

export default Map;
