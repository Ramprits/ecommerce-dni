import React from "react";
import { useLocalStorage } from "react-use";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "./authSlice";

const useStyles = makeStyles((theme) => ({
  tertiaryAction: {
    [theme.breakpoints.up("sm")]: {
      textAlign: "right",
    },
  },
  actions: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function LoginForm(props) {
  const [value, setValue, remove] = useLocalStorage("user-key");
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
    defaultValues: {
      identifier: "jeanie.stracke@hotmail.com",
      password: "welcome@1234",
    },
  });
  const onSubmit = (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then((response) => {
        setValue(response);
        history.push("/");
      });
  };

  const content = {
    brand: {
      image: "https://bootstrapshuffle.com/mui-assets/img/logo-pied-piper-icon.png",
      width: 40,
    },
    "02_header": "Sign in",
    "02_primary-action": "Sign in",
    "02_secondary-action": "Don't have an account?",
    "02_tertiary-action": "Forgot password?",
    ...props,
  };

  let brand;

  if (content.brand.image) {
    brand = <img src={content.brand.image} alt="" width={content.brand.width} />;
  } else {
    brand = content.brand.text || "";
  }

  return (
    <section>
      <Container maxWidth="xs">
        <Box pt={8} pb={10}>
          <Box mb={3} textAlign="center">
            <Link href="#" variant="h4" color="inherit" underline="none">
              {brand}
            </Link>
            <Typography variant="h5" component="h2">
              {content["02_header"]}
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
                    error={!!errors.identifier}
                    helperText={!!errors.identifier && "Please enter a valid email address"}
                    name="email"
                    id="email"
                    label="Email address"
                    autoComplete="email"
                    {...register("identifier", { required: true })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    error={!!errors.password}
                    helperText={!!errors.password && "Please enter your password"}
                    name="password"
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    {...register("password", { required: true })}
                  />
                </Grid>
              </Grid>
              <Box my={2}>
                <Button type="submit" fullWidth variant="contained" color="primary">
                  {content["02_primary-action"]}
                </Button>
              </Box>
              <Grid container spacing={2} className={classes.actions}>
                <Grid item xs={12} sm={6}>
                  <Link href="#" variant="body2">
                    {content["02_secondary-action"]}
                  </Link>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.tertiaryAction}>
                  <Link href="#" variant="body2">
                    {content["02_tertiary-action"]}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </section>
  );
}
