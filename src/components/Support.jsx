import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateSupportMutation } from "services/support-service";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  halfLg: {
    [theme.breakpoints.up("lg")]: {
      maxWidth: theme.breakpoints.values["lg"] / 2,
    },
  },
  firstBox: {
    [theme.breakpoints.up("lg")]: {
      marginLeft: "auto",
      paddingRight: theme.spacing(6),
    },
  },
  secondBox: {
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(6),
    },
  },
  fullHeightImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    objectFit: "cover",
    height: 768,
    width: "100%",
  },
}));

const schema = yup
  .object({
    first_name: yup.string().required("Please enter first name"),
    last_name: yup.string().required(),
    email: yup.string().required().email(),
    company: yup.string().required(),
    message: yup.string().required(),
    agree: yup.boolean().required(),
  })
  .required();

export default function Support(props) {
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();
  const [createSupport, result] = useCreateSupportMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const classes = useStyles();

  const content = {
    header: "Let's talk about the future",
    description:
      "We're here to answer your questions and discuss the decentralized future of the internet.",
    terms: "I agree to the terms of use and privacy policy.",
    "primary-action": "Submit",
    image:
      "https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    ...props,
  };

  const onSubmit = (data) => {
    createSupport({ ...data, created_by: user.id })
      .unwrap()
      .then((res) => history.push("/"));
  };

  return (
    <section>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box pt={10} pb={8} display="flex" className={classes.halfLg}>
            <Container>
              <Box mb={4}>
                <Typography variant="h4" component="h2" gutterBottom={true}>
                  {content["header"]}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" paragraph={true}>
                  {content["description"]}
                </Typography>
              </Box>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="First name"
                      error={!!errors.first_name}
                      helperText={!!errors.first_name && errors?.first_name?.message}
                      {...register("first_name")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Last name"
                      {...register("last_name")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Email address"
                      autoComplete="email"
                      {...register("email")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Company"
                      autoComplete="company"
                      {...register("company")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      multiline
                      rows={5}
                      fullWidth
                      label="Message"
                      {...register("message")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox name="terms" value="1" color="primary" {...register("agree")} />
                      }
                      label={content["terms"]}
                    />
                  </Grid>
                </Grid>
                <Box mt={2}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={result?.isLoading}
                  >
                    {content["primary-action"]}
                  </Button>
                </Box>
              </form>
            </Container>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box position="relative" height={768}>
            <img className={classes.fullHeightImage} src={content["image"]} alt="" />
          </Box>
        </Grid>
      </Grid>
    </section>
  );
}
