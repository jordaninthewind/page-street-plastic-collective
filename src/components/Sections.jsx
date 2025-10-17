import { Divider } from '@mui/material';
import { Problem, Solution, Model3D, Map, Partners, CoverTheCity, Contact, SupportUs, SocialLinks, Privacy } from '@app/sections';

const DashedDivider = () => (
    <Divider sx={{ border: '3px dashed #000', mb: 2, width: '100vw' }} />
);

const Sections = () => (
    <>
        <DashedDivider />
        <Problem />
        <DashedDivider />
        <Solution />
        <DashedDivider />
        <Model3D />
        <DashedDivider />
        <Map />
        <DashedDivider />
        <Partners />
        <DashedDivider />
        <CoverTheCity />
        <DashedDivider />
        <Contact />
        <DashedDivider />
        <SupportUs />
        <DashedDivider />
        <SocialLinks />
        <DashedDivider />
        <Privacy />
    </>
);

export default Sections;