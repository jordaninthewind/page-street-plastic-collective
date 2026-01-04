import { Box, Button, Link, Typography } from "@mui/material";

import FallbackImage from "@app/assets/fallback-image.png";

const env = import.meta.env.VITE_ENVIRONMENT;

const ErrorFallback = ({
  error = "An unexpected error occurred",
  resetErrorBoundary,
  componentStack,
  eventId,
}) => (
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
      Let's try that again..
    </Typography>
    <img
      src={FallbackImage}
      alt="Fallback"
      style={{ width: "70%", height: "100%" }}
    />
    <Typography
      variant="body1"
      color="text.secondary"
      align="center"
      sx={{ mb: 2 }}
    >
      An unexpected error occurred. Please try refreshing the page or{" "}
      <Link href="mailto:support@page-street-plastic-collective.com">
        contact us
      </Link>{" "}
      if the problem persists. support if the problem persists.
    </Typography>
    <Button
      variant="outlined"
      color="primary"
      onClick={() => resetErrorBoundary?.() || window.location.reload()}
      sx={{ m: 4 }}
    >
      Refresh the page
    </Button>

    {env === "development" && error && (
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
          {error.toString()}
        </Typography>
        {error.stack && (
          <Typography
            variant="body2"
            component="pre"
            sx={{ fontFamily: "monospace", fontSize: "0.75rem", mt: 1 }}
          >
            {error.stack}
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

export default ErrorFallback;
