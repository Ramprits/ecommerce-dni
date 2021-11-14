/* eslint-disable react/prop-types */
import React from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "services/auth-services";

export default function RegisterForm(props) {
  const [registerUser] = useRegisterUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
  });
  const content = {
    brand: {
      image: "https://bootstrapshuffle.com/mui-assets/img/logo-pied-piper-icon.png",
      width: 40,
    },
    header: "Create a new account",
    terms: "I agree to the terms of use and privacy policy.",
    "01_primary-action": "Sign up",
    "01_secondary-action": "Already have an account? Sign in",
    ...props,
  };

  let brand;

  if (content.brand.image) {
    brand = <img src={content.brand.image} alt="" width={content.brand.width} />;
  } else {
    brand = content.brand.text || "";
  }

  const onSubmit = (data) => {
    registerUser(data)
      .unwrap()
      .then(() => props.history.push("/"));
  };

  return (
    <section>
      <Container maxWidth="xs">
        <Box pt={8} pb={10}>
          <Box mb={3} textAlign="center">
            <Link href="#" variant="h4" color="inherit" underline="none">
              {brand}
            </Link>
            <Typography variant="h5" component="h2">
              {content["header"]}
            </Typography>
          </Box>
          <Box>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    autoComplete="username"
                    name="username"
                    id="username"
                    label="User name"
                    error={!!errors.username}
                    helperText={!!errors.username && "Username is required"}
                    {...register("username", { required: true })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="email"
                    id="email"
                    label="Email address"
                    autoComplete="email"
                    error={!!errors.email}
                    helperText={!!errors.email && "Email is required"}
                    {...register("email", { required: true })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    error={!!errors.password}
                    helperText={!!errors.password && "Password is required"}
                    {...register("password", { required: true })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox name="terms" value="1" color="primary" />}
                    label={content["terms"]}
                  />
                </Grid>
              </Grid>
              <Box my={2}>
                <Button type="submit" fullWidth variant="contained" color="primary">
                  {content["01_primary-action"]}
                </Button>
              </Box>
              <Box textAlign="right">
                <Link href="#" variant="body2">
                  {content["01_secondary-action"]}
                </Link>
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
    </section>
  );
}
