import { useState } from "react";

import { User } from "@app/types";
import {
  Button,
  Divider,
  Stack,
  Typography
} from "@mui/material";

import { Login, Signup } from "@app/components";
import withAuth from "@app/components/HOC/withAuth";

interface UserInfoProps {
  user: User;
  logOutUser: () => void;
  loading: boolean;
}

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


const UserInfo = ({ user, logOutUser, loading }: UserInfoProps) => (
  <Stack spacing={2} alignItems="center" width="100%">
    <Typography>Hey {user.name ? user.name : "neighbor"}!</Typography>
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


const UserPanel = withAuth(({ user, logOutUser, loading }) => user ? <UserInfo user={user} logOutUser={logOutUser} loading={loading} /> : <SignupOrLogin />)

export default UserPanel;
