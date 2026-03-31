import { useState } from "react";

import {
  Alert,
  Button,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import { Login, Signup } from "@app/components";
import { useUserStore } from "@app/stores";

const SignupOrLogin = () => {
  const [showSignup, setShowSignup] = useState(false);

  const toggleShowSignup = () => {
    setShowSignup(!showSignup);
  };

  return (
    <Stack spacing={2} alignItems="center" width="100%">
      {showSignup ? <Signup /> : <Login />}
      <Divider />
      <p>
        {showSignup ? "Already have an account? " : "Don't have an account? "}
      </p>
      <Button
        fullWidth
        variant="text"
        color="primary"
        onClick={toggleShowSignup}
      >
        {showSignup ? "Login" : "Signup"}
      </Button>
    </Stack>
  );
};

const UserInfo = () => {
  const { user, logOutUser } = useUserStore();

  const handleLogout = async () => {
    await logOutUser();
  };

  return (
    <Stack spacing={2} alignItems="center" width="100%">
      <Typography>Hey neighbor!</Typography>
      <Typography>{user?.email}</Typography>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Stack>
  );
};

const UserPanel = () => {
  const { user, loading, error } = useUserStore();

  return (
    <Stack
      spacing={2}
      alignItems="center"
      sx={{ width: "100%", minWidth: "100%" }}
    >
      {loading && <LinearProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!user ? <SignupOrLogin /> : <UserInfo />}
    </Stack>
  );
};

export default UserPanel;
