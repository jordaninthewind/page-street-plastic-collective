import { Card, CardContent, Grid, Typography } from "@mui/material";

const CardSection = ({ title, subtitle, children }) => (
  <Grid size={{ xs: 12 }} width="100%">
    <Card width="100%">
      <CardContent>
        <Typography variant="h5" component="h3" gutterBottom align="center">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          {subtitle}
        </Typography>
        {children}
      </CardContent>
    </Card>
  </Grid>
);

export default CardSection;
