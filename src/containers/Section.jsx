import { Container, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";

const SectionContainer = styled(Container)({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
});

const Section = ({ children, title, subtitle }) => (
  <SectionContainer>
    <Box my={4}>
      <Typography variant="sectionTitle">{title}</Typography>
      {subtitle && <Typography variant="h2">{subtitle}</Typography>}
    </Box>
    <Box mb={4}>{children}</Box>
  </SectionContainer>
);

export default Section;
