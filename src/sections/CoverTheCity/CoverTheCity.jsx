import { Box, Card, Grid, Stack, Typography } from "@mui/material";

import { COPY_PROPS, COVER_STATS, IMPLEMENTATION_PHASES } from "@app/constants";
import { Section } from "@app/containers";

const StatItem = ({ title, value }) => (
  <Box
    component="div"
    sx={{
      p: 2,
      width: "280px",
      textAlign: "center",
    }}
  >
    <Typography variant="h1" color="white">
      {title}
    </Typography>
    <Typography variant="body1" color="white">
      {value}
    </Typography>
  </Box>
);

const PhaseItem = ({ done, number, title, description }) => (
  <Card
    sx={{
      alignItems: "center",
      border: done ? "2px solid lime" : "none",
      borderRadius: 2,
      display: "flex",
      flex: 1,
      flexDirection: "column",
      height: "100%",
      gap: 1,
      justifyContent: "space-between",
      p: 2,
      width: "100%",
    }}
  >
    <Box
      sx={{
        alignItems: "center",
        backgroundColor: done ? "lime" : "black",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        height: "85px",
        width: "85px",
      }}
    >
      <Typography variant="h1" color={"white"}>
        {done ? "✓" : number}
      </Typography>
    </Box>
    <Typography variant="h3" color="black">
      {title}
    </Typography>
    <Typography variant="body1" color="black">
      {description}
    </Typography>
  </Card>
);

const CoverTheCity = () => (
  <Section {...COPY_PROPS.coverTheCity}>
    <Stack direction="column" spacing={4}>
      <Grid container spacing={2}>
        {IMPLEMENTATION_PHASES.map((phase, index) => (
          <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <PhaseItem key={index} number={index + 1} {...phase} />
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          p: 2,
          borderRadius: 2,
        }}
        justifyContent="center"
      >
        {COVER_STATS.map((stat, index) => (
          <StatItem key={index} {...stat} />
        ))}
      </Grid>
    </Stack>
  </Section>
);

export default CoverTheCity;
