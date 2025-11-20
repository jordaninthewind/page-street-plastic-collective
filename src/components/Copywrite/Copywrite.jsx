import { Typography } from '@mui/material';

const Copywrite = () => (
    <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} Page Street Plastic Collective. All rights reserved.
    </Typography>
);

export default Copywrite;