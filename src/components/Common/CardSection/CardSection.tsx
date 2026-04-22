import { type ReactNode } from "react";

import { Card, CardContent, Grid, Typography } from "@mui/material";

interface CardSectionProps {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}

const CardSection = ({ title, subtitle, children }: CardSectionProps) => (
  <Grid size={{ xs: 12 }} width="100%">
    <Card sx={{ width: "100%" }}>
      <CardContent>
        {title && (
          <Typography variant="h5" component="h3" gutterBottom align="center">
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography variant="body1" color="text.secondary" align="center">
            {subtitle}
          </Typography>
        )}
        {children}
      </CardContent>
    </Card>
  </Grid>
);

export default CardSection;
