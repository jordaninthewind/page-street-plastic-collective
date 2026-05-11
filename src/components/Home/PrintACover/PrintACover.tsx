import { Box, Button, Stack, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

import { ModelViewer } from "@app/components";

const PrintACover = () => (
    <Stack>
        <Typography variant="h1">Print a Cover</Typography>
        <Typography variant="body1">
            Check out the 3D model of the cover and download it to print your own.
        </Typography>
        <ModelViewer />
        <Stack className="model-actions">
            <Box>
                <Typography variant="h4">Model Specifications</Typography>
                <Typography variant="body1">
                    <ul>
                        <li>Format: STL (Stereolithography)</li>
                        <li>Compatible with all 3D printers</li>
                        <li>Optimized for FDM printing</li>
                        <li>Material: PLA or ABS recommended, or stronger materials</li>
                    </ul>
                </Typography>
            </Box>
            <Button variant="contained" color="primary" startIcon={<DownloadIcon />} component="a" href={import.meta.env.VITE_3D_MODEL_URL as string} download style={{ fontSize: 16, fontWeight: 500 }}>
                Download STL File
            </Button>
        </Stack>
    </Stack>
);

export default PrintACover;