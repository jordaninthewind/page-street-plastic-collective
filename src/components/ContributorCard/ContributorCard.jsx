import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  styled,
} from "@mui/material";

const StyledCard = styled(Card)({
  cursor: "pointer",
  maxWidth: "500px",
  width: "100%",
  "&:hover": {
    transform: "translateY(-10px)",
    transition: "transform 0.2s ease-in-out",
  },
});

const ContributorCard = ({ name, description, image, link }) => (
  <StyledCard onClick={() => window.open(link, "_blank")}>
    <CardActionArea
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <CardMedia component="img" image={image} alt={name} />
      <CardContent>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          {name}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </StyledCard>
);

export default ContributorCard;
