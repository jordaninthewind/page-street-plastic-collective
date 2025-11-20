import { Divider } from '@mui/material';
import { Problem, Solution, Model3D, Map, Partners, CoverTheCity, Contact, SupportUs, SocialLinks, Privacy } from '@app/sections';
import { COPY_PROPS } from '@app/constants';

const DashedDivider = () => (
    <Divider sx={{ border: '3px dashed #000', mb: 2, width: '100vw' }} />
);

const Sections = () => (
    <>
        <DashedDivider />
        <Problem {...COPY_PROPS.problem} />
        <DashedDivider />
        <Solution {...COPY_PROPS.solution} />
        <DashedDivider />
        <Model3D {...COPY_PROPS.model3D} />
        <DashedDivider />
        <Map {...COPY_PROPS.map} />
        <DashedDivider />
        <Partners {...COPY_PROPS.partners} />
        <DashedDivider />
        <CoverTheCity {...COPY_PROPS.coverTheCity} />
        <DashedDivider />
        <Contact {...COPY_PROPS.contact} />
        <DashedDivider />
        <SupportUs {...COPY_PROPS.supportUs} />
        <DashedDivider />
        <SocialLinks {...COPY_PROPS.socialLinks} />
        <DashedDivider />
        <Privacy {...COPY_PROPS.privacy} />
    </>
);

export default Sections;