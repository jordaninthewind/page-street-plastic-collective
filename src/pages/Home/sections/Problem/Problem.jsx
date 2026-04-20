import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import { Section } from "@app/components";

import "@app/pages/Home/sections/Problem/Problem.css";

const reasons = [
  "Recyclable materials",
  "Used for art",
  "Hard to replace",
  "Easy to steal",
];

const Reason = ({ text, idx }) => (
  <ListItem>
    <Typography variant="listText">0{idx + 1}</Typography>
    <ListItemText sx={{ alignSelf: "flex-start", ml: 2, mt: 1 }}>
      <Typography variant="subtitle">{text}</Typography>
    </ListItemText>
  </ListItem>
);

const PROBLEM_SECTION = {
  id: "problem",
  title: "A Frustrating Problem",
  subtitle:
    "In SF, homeowners are required to cover the drain pipes on their sidewalks with grates. These covers are made of steel and they a frequently stolen.",
};

const SOLUTION_SECTION = {
  id: "solution",
  title: "A Simple Solution",
  subtitle:
    "As always, there's an opportunity to solve the issue with creativity and community.",
};

const Problem = () => (
  <Section id={PROBLEM_SECTION.id} title={PROBLEM_SECTION.title}>
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <img
            src="uncovered-sewer-cap-type-1.jpg"
            alt="Uncovered sewer cap example"
            loading="lazy"
            style={{ width: "100%", height: "auto", borderRadius: 20 }}
          />
          <img
            src="uncovered-sewer-cap-type-1-a.jpg"
            alt="Uncovered sewer cap example"
            loading="lazy"
            style={{ width: "100%", height: "auto", borderRadius: 20 }}
          />
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Divider sx={{ border: "3px solid #000", mb: 2 }} />
        <Typography variant="subtitle">{PROBLEM_SECTION.subtitle}</Typography>
        <List>
          {reasons.map((reason, idx) => (
            <Reason text={reason} idx={idx} key={idx} />
          ))}
        </List>
      </Grid>
    </Grid>
    <Grid container spacing={4} alignItems="center">
      <Grid size={{ xs: 12, md: 5 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <img
            src="cover-logo.svg"
            style={{ maxWidth: "100%", width: "auto", height: "auto" }}
            alt="Cover logo"
            loading="lazy"
          />
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: 34, sm: 42, md: 54 } }}
          >
            {SOLUTION_SECTION.title}
          </Typography>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 7 }}>
        <img
          src="sewer-cover-type-1.jpg"
          style={{
            maxWidth: "100%",
            width: "auto",
            height: "auto",
            borderRadius: "20px",
          }}
          alt="Printed sewer cover"
          loading="lazy"
        />
      </Grid>
    </Grid>
  </Section>
);

export default Problem;
