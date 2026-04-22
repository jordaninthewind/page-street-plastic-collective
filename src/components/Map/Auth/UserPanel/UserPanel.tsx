import {
  Button,
  Divider,
  Stack,
  Typography
} from "@mui/material";
import { useState } from "react";

import withAuth from "@app/components/HOC/withAuth";
import Login from "@app/components/Map/Auth/Login/Login";
import Signup from "@app/components/Map/Auth/Signup/Signup";
import useUserStore from "@app/stores/userStore";
import { type User } from "@app/types";

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
        {showSignup ? "Been here before?" : "New here? Tell us who you are!"}
      </p>
      <Button
        fullWidth
        variant="text"
        color="primary"
        onClick={toggleShowSignup}
      >
        {showSignup ? "Login" : "Make an account"}
      </Button>
    </Stack>
  );
};


const UserInfo = () => {
  const { user, logOutUser, loading } = useUserStore();

  return (
    <Stack spacing={2} alignItems="center" width="100%">
      <Typography>Hey {user?.name ? user.name : "neighbor"}!</Typography>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={logOutUser}
        disabled={loading}
      >
        Logout
      </Button>
    </Stack>
  )
}


const UserPanel = withAuth(({ user }: { user: User | null }) => user ? <UserInfo /> : <SignupOrLogin />)

export default UserPanel;
