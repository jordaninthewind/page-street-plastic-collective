import { Box, Container, Typography, styled } from "@mui/material";

const SectionContainer = styled(Container)({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
});

const Section = ({ children, title, subtitle, id }) => (
  <SectionContainer disableGutters id={id} sx={{ p: { xs: 2, md: 6 } }}>
    <Box my={{ xs: 2, md: 4 }}>
      {title && (
        <Typography variant="h1" sx={{ fontSize: { xs: 34, sm: 42, md: 54 } }}>
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography variant="h4" sx={{ fontSize: { xs: 24, sm: 32, md: 40 } }}>
          {subtitle}
        </Typography>
      )}
    </Box>
    <Box mb={4}>{children}</Box>
  </SectionContainer>
);

export default Section;
