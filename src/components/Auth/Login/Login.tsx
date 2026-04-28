import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button, Stack, TextField } from "@mui/material";

import useUserStore from "@app/stores/userStore";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<yup.InferType<typeof validationSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { logInUser, loading } = useUserStore();

  const handleLogin = async (data: yup.InferType<typeof validationSchema>) => {
    await logInUser(data.email, data.password);
  };

  return (
    <Stack
      spacing={2}
      direction="column"
      width="100%"
      onSubmit={handleSubmit(handleLogin)}
      component="form"
    >
      <TextField
        fullWidth
        label="Email"
        type="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading || !isValid}
      >
        Login
      </Button>
    </Stack>
  );
};

export default Login;
