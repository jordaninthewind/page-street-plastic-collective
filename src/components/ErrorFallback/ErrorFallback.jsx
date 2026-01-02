import { Box, Button, Typography } from "@mui/material";

const ErrorFallback = ({ error = "An unexpected error occurred" }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    minHeight="200px"
    p={3}
    sx={{
      backgroundColor: "#f5f5f5",
      borderRadius: 2,
      border: "1px solid #e0e0e0",
    }}
  >
    <Typography variant="h5" color="error" gutterBottom>
      Something went wrong
    </Typography>
    <Typography
      variant="body1"
      color="text.secondary"
      align="center"
      sx={{ mb: 2 }}
    >
      An unexpected error occurred. Please try refreshing the page or contact
      support if the problem persists.
    </Typography>

    {error && (
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

    <Button
      variant="contained"
      color="primary"
      onClick={() => window.location.reload()}
      sx={{ mt: 2 }}
    >
      Try Again
    </Button>
  </Box>
);

export default ErrorFallback;
