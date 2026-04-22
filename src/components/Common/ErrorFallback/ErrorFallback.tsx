import { Box, Button, Link, Typography } from "@mui/material";

import FallbackImage from "@app/assets/fallback-image.png";
import { useIsMobile } from "@app/hooks";

const env = import.meta.env.VITE_ENVIRONMENT as string | undefined;

interface ErrorFallbackProps {
  error?: unknown;
  resetErrorBoundary?: () => void;
  componentStack?: string | null;
  eventId?: string | null;
}

const ErrorFallback = ({
  error,
  resetErrorBoundary,
  componentStack,
  eventId,
}: ErrorFallbackProps) => {
  const { isMobile } = useIsMobile();

  const errorObj = error instanceof Error ? error : null;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={3}
      sx={{ backgroundColor: "#fefefe" }}
    >
      <Typography variant="h5" color="error" gutterBottom>
        Let&apos;s try that again..
      </Typography>
      <img
        src={FallbackImage as string}
        alt="Fallback"
        style={{ width: isMobile ? "100%" : "70%", height: "100%" }}
      />
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ mb: 2 }}
      >
        An unexpected error occurred. Please try refreshing the page or{" "}
        <Link href="mailto:hi@pagestreetplasticcollective.com">contact us</Link>{" "}
        if the problem persists.
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => resetErrorBoundary?.() ?? window.location.reload()}
        sx={{ m: 4 }}
      >
        Refresh the page
      </Button>

      {env === "development" && errorObj && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: "#f0f0f0",
            borderRadius: 1,
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <Typography variant="h6" color="error">
            Error Details (Development Mode):
          </Typography>
          <Typography
            variant="body2"
            component="pre"
            sx={{ fontFamily: "monospace", fontSize: "0.75rem", mt: 1 }}
          >
            {errorObj.toString()}
          </Typography>
          {errorObj.stack && (
            <Typography
              variant="body2"
              component="pre"
              sx={{ fontFamily: "monospace", fontSize: "0.75rem", mt: 1 }}
            >
              {errorObj.stack}
            </Typography>
          )}
        </Box>
      )}

      {env === "development" && componentStack && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: "#f0f0f0",
            borderRadius: 1,
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <Typography variant="h6" color="error">
            Component Stack (Development Mode):
          </Typography>
          <Typography
            variant="body2"
            component="pre"
            sx={{ fontFamily: "monospace", fontSize: "0.75rem", mt: 1 }}
          >
            {componentStack}
          </Typography>
        </Box>
      )}

      {env === "development" && eventId && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: "#f0f0f0",
            borderRadius: 1,
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <Typography variant="h6" color="error">
            PostHog Event ID (Development Mode):
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: "monospace", fontSize: "0.75rem", mt: 1 }}
          >
            {eventId}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ErrorFallback;
