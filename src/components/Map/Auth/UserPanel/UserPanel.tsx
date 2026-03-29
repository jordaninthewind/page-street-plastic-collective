import { useState } from "react";

import { Alert, Button, Divider, LinearProgress, Stack } from "@mui/material";

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
      <Button variant="text" color="primary" onClick={toggleShowSignup}>
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
      <p>Welcome, {user?.user_metadata.name}</p>
      <Button variant="contained" color="primary" onClick={handleLogout}>
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
      {!user ? <SignupOrLogin user={user} /> : <UserInfo user={user} />}
    </Stack>
  );
};

export default UserPanel;
