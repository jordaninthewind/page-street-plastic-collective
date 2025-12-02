import { Card, Link, styled, Typography } from "@mui/material";

const InstagramLink = styled(Link)({
  background:
    "linear-gradient(70deg, #feda75 0%, #fa7e1e 40%, #d62976 60%, #962fbf 80%, #4f5bd5 100%)",
  border: "none",
  borderRadius: "30px",
  boxShadow: "0 4px 12px 0 rgba(220, 53, 140, 0.18)",
  color: "#fff",
  cursor: "pointer",
  display: "inline-block",
  filter: "brightness(1)",
  fontSize: "1.2rem",
  fontWeight: "bold",
  padding: "0.6em 1.3em",
  textDecoration: "none",
  textShadow: "0 1px 8px rgba(31, 31, 31, 0.22)",
  "&:hover": {
    color: "#fff",
  },
});

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  maxWidth: "500px",
  objectFit: "contain",
});

const ContributorCard = ({ title, description, image, link }) => (
  <Card
    sx={{
      alignItems: "center",
      border: "1px solid #e0e0e0",
      borderRadius: "10px",
      cursor: "pointer",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 2,
      mt: 3,
      p: 2,
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "scale(1.02)",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
      },
    }}
    onClick={() => window.open(link, "_blank")}
  >
    <Typography variant="h3" sx={{ textAlign: "center" }}>
      {title}
    </Typography>
    <StyledImage src={image} alt={title} />
    <Typography variant="body1">{description}</Typography>
    <InstagramLink href={link} target="_blank" rel="noopener noreferrer">
      @{title.split(" ").join("").toLowerCase()}
    </InstagramLink>
  </Card>
);

export default ContributorCard;
