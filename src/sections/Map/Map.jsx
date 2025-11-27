import { Container } from "@mui/material";
import { useNavigate } from "react-router";

import PageStreetMap from "@app/assets/page-street-map.png";
import { HoverActionCard } from "@app/components";
import { COPY_PROPS } from "@app/constants";
import { Section } from "@app/containers";

const Map = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("overlay", "map");
    window.history.pushState({}, "", `?${queryParams.toString()}`);
    navigate(`/?overlay=map`);
  };

  return (
    <Section id="map" {...COPY_PROPS.map}>
      <Container disableGutters>
        <HoverActionCard onClick={handleClick}>
          <img
            src={PageStreetMap}
            alt="Page Street Map"
            width="100%"
            style={{ borderRadius: "10px" }}
          />
        </HoverActionCard>
      </Container>
    </Section>
  );
};

export default Map;
