import { usePostHog } from "@posthog/react";
import { Box, Button, Grid, Link, Stack } from "@mui/material";

import DrainVaderImage from "@app/assets/draINvader.png";
import PageStreetPlasticCollectiveImage from "@app/assets/pspc.png";
import { CardSection, ContributorCard } from "@app/components";
import { useIsMobile } from "@app/hooks";

import "@app/pages/Home/sections/Contribute/Contribute.css";

const CONTRIBUTORS = [
  {
    name: "Page Street Plastic Collective",
    description: "Functional minimalism to cover the city.",
    image: PageStreetPlasticCollectiveImage as string,
    link: "https://instagram.com/pagestreetplasticcollective",
  },
  {
    name: "draINvader",
    description:
      "Inspired by Space Invader, draINvader uses multi-colored filament to create art and cover the city!",
    image: DrainVaderImage as string,
    link: "https://www.instagram.com/drainvader/",
  },
];


const SupportUs = () => {
  const posthog = usePostHog();
  const { isMobile } = useIsMobile();

  const handleShareClick = async () => {
    posthog.capture("support_share_clicked");
    await navigator.share({
      title: "Page Street Plastic Collective",
      text: "Join us in cleaning up our community!",
      url: window.location.href,
    });
  };

  return (
    <Stack>
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
      >
        <CardSection
          title="Join our community and help us make a difference!"
          subtitle="Our only cost is the PLA filament and the time it takes to print the covers. So feel free to support however able!"
        >
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
            <a
              href="https://buymeacoffee.com/pagestreetplastic"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me a Coffee"
                style={{ height: "50px" }}
              />
            </a>
          </Box>
        </CardSection>

        <CardSection
          title="📢 Spread the Word"
          subtitle="Help us reach more people by sharing our mission with your friends, family, and social networks."
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleShareClick}
            fullWidth
          >
            Share This Page
          </Button>
        </CardSection>

        <CardSection
          title="💬 Contact"
          subtitle="Have questions or feedback? Email us directly."
        >
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Link href="mailto:hi@pagestreetplasticcollective.com" color="primary">
              hi@pagestreetplasticcollective.com
            </Link>
          </Box>
        </CardSection>
      </Stack>
    </Stack>
  );
};


const Contributors = () => (
  <Grid container spacing={2} justifyContent="center" alignItems="center">
    {CONTRIBUTORS.map((contributor, index) => (
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
        <ContributorCard {...contributor} />
      </Grid>
    ))}
  </Grid>
);

const Contribute = () => (
  <Stack>
    <Contributors />
    <SupportUs />
  </Stack>
)

export default Contribute;
