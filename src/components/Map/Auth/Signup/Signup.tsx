import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button, Stack, TextField, Typography } from "@mui/material";

import useUserStore from "@app/stores/userStore";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup.string().required("Phone is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<yup.InferType<typeof validationSchema>>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { signUpUser, loading } = useUserStore();

  const handleSignUp = async (data: yup.InferType<typeof validationSchema>) => {
    await signUpUser(data.email, data.firstName, data.lastName, data.phone);
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
        label="First Name"
        type="text"
        {...register("firstName")}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />
      <TextField
        fullWidth
        label="Last Name"
        type="text"
        {...register("lastName")}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />
      <TextField
        fullWidth
        label="Phone"
        type="tel"
        {...register("phone")}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />
      <TextField
        fullWidth
        label="Email"
        type="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
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
