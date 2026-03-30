import { usePostHog } from "@posthog/react";

import { Box, Button, Link, Stack } from "@mui/material";

import { CardSection } from "@app/components";
import { SUPPORT_US_SECTION } from "@app/constants";
import { Section } from "@app/containers";
import { useIsMobile } from "@app/hooks";
import "@app/sections/SupportUs/SupportUs.css";

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
    <Section {...SUPPORT_US_SECTION}>
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
      >
        {/* Join our community and help us make a difference! */}
        <CardSection
          title="Join our community and help us make a difference!"
          subtitle="Our only cost is the PLA filament and the time it takes to print the covers. So feel free to support however able!"
        >
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
          >
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

        {/* Spread the Word */}
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

        {/* Contact Us */}
        <CardSection
          title="💬 Contact"
          subtitle="Have questions or feedback? Email us directly."
        >
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Link
              href="mailto:hi@pagestreetplasticcollective.com"
              color="primary"
            >
              hi@pagestreetplasticcollective.com
            </Link>
          </Box>
        </CardSection>
      </Stack>
    </Section>
  );
};

export default SupportUs;
