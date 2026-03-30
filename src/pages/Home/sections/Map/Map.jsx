import { useNavigate } from "react-router";

import { Container } from "@mui/material";

import PageStreetMap from "@app/assets/page-street-map.png";
import { HoverActionCard } from "@app/components";
import { INTERACTIVE_MAP_SECTION } from "@app/constants";
import { Section } from "@app/containers";

const Map = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/map`);

  return (
    <Section {...INTERACTIVE_MAP_SECTION}>
      <Container disableGutters>
        <HoverActionCard onClick={handleClick}>
          <img
            src={PageStreetMap}
            alt="Page Street Map"
            width="100%"
            loading="lazy"
            style={{ borderRadius: "10px" }}
          />
        </HoverActionCard>
      </Container>
    </Section>
  );
};

export default Map;
