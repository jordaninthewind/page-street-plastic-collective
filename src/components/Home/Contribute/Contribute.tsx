import { Box, Button, Divider, Link, Stack, Typography } from "@mui/material";
import { usePostHog } from "@posthog/react";
import { useSnackbar } from "notistack";

import DrainVaderImage from "@app/assets/draINvader.png";
import PageStreetPlasticCollectiveImage from "@app/assets/pspc.png";
import { CardSection, ContributorCard } from "@app/components";
import { useIsMobile } from "@app/hooks";

import "./Contribute.css";

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
  const { enqueueSnackbar } = useSnackbar();

  const handleShareClick = async () => {
    posthog.capture("support_share_clicked");
    try {
      await navigator.share({
        title: "Page Street Plastic Collective",
        text: "Join us in cleaning up our community!",
        url: window.location.href,
      });
    } catch (error) {
      enqueueSnackbar("Failed to share", { variant: "error" });
    }
  };

  return (
    <Stack>
      <Typography variant="h2" sx={{ textAlign: "center", mb: 2 }}>Help us cover the city!</Typography>
      <Divider sx={{ border: "2px solid #000", mb: 4 }} />
      <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>We are a loose collective of neighbors who want to solve local problems creatively and sustainably. We replace stolen steel drain covers with open-source, 3D-printable ones.</Typography>
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
    </Stack >
  );
};


const Contribute = () => (
  <Stack spacing={2}>
    <SupportUs />
    {CONTRIBUTORS.map((contributor) => <ContributorCard {...contributor} />)}
  </Stack>
)

export default Contribute;
