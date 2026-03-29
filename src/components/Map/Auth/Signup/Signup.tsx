import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button, Stack, TextField, Typography } from "@mui/material";

import { useUserStore } from "@app/stores";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
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

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<yup.InferType<typeof validationSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { signUpUser, loading } = useUserStore();

  const handleSignUp = async (data: yup.InferType<typeof validationSchema>) => {
    await signUpUser(data.email, data.password, data.name);
  };

  return (
    <Stack
      sx={{ width: "100%", minWidth: "100%" }}
      spacing={2}
      alignItems="center"
      onSubmit={handleSubmit(handleSignUp)}
      component="form"
    >
      <Typography variant="h2" sx={{ fontWeight: "bold" }}>
        Signup
      </Typography>
      <Typography variant="h6">
        Make an account to start adding drain covers to the map and leave
        comments on other covers.
      </Typography>
      <TextField
        fullWidth
        label="Name"
        type="text"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
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
        Signup
      </Button>
    </Stack>
  );
};

export default Signup;
