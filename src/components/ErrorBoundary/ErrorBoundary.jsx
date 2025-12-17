import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import React from "react";

import { Box, Button, Typography } from "@mui/material";

/**
 * Error fallback component that displays a user-friendly error message
 */
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
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
        onClick={resetErrorBoundary}
        sx={{ mt: 2 }}
      >
        Try Again
      </Button>
    </Box>
  );
};

/**
 * Error Boundary component that catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 */
const ErrorBoundary = ({ children, ...props }) => {
  const handleError = (error, errorInfo) => {
    // Log the error to console (and could also log to an error reporting service)
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
      {...props}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
