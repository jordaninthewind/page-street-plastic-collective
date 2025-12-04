import { Box, Container, styled, Typography } from "@mui/material";

const SectionContainer = styled(Container)({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
});

const Section = ({ children, title, subtitle, id }) => (
  <SectionContainer disableGutters id={id}>
    <Box my={{ xs: 2, md: 4 }}>
      <Typography variant="sectionTitle">{title}</Typography>
      {subtitle && <Typography variant="h2">{subtitle}</Typography>}
    </Box>
    <Box mb={4}>{children}</Box>
  </SectionContainer>
);

export default Section;
