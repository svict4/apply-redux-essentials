import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { useForm } from "react-hook-form";
import Logo from "./acrrm-logo.svg";
import { GetPersonByEmail, CreateAccount } from "./loginSlice";
import useStyles from "./styles";

const Login = (props) => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.login.status);
  const userExists = useSelector((state) => state.login.exists);
  const accountCreated = useSelector((state) => state.login.accountCreated);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const { register, handleSubmit, errors, watch } = useForm();
  const firstName = watch("person.firstName");

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (userExists || accountCreated) {
        props.history.replace("/names");
      }
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [userExists, props.history, accountCreated]);

  const onSubmit = (data) => {
    if (userExists === null) {
      dispatch(GetPersonByEmail(email));
    } else if (userExists === false) {
      dispatch(CreateAccount(data));
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={Logo} alt="React Logo" style={{ maxWidth: "500px" }} />
          <div className={classes.formWrapper}>
            <Typography component="h1" variant="h5" align="center">
              Howdy {firstName ? firstName : "stranger"}!{" "}
              <span className="wave" role="img" aria-label="wave">
                👋
              </span>
            </Typography>

            {userExists === null && (
              <Typography component="h1" variant="h5" align="center">
                Let&apos;s start with your email
              </Typography>
            )}

            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <TextField
                error={typeof errors.email != "undefined"}
                helperText={errors.email?.message}
                label="Email Address"
                inputRef={register({
                  required: "Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "🤔 That doesn't look like an email address",
                  },
                })}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />

              {userExists && (
                <Alert variant="filled" severity="success">
                  Looks like you already have an ACRRM account
                  <span role="img" aria-label="celebrate">
                    🎉
                  </span>
                  We will redirect you to login in just a moment...
                </Alert>
              )}

              {userExists === false && (
                <>
                  <Alert variant="filled" severity="info">
                    Looks like you&apos;re new here! Please fill out the rest
                    below to create your account
                    <span role="img" aria-label="point down">
                      👇
                    </span>
                  </Alert>
                  <TextField
                    inputRef={register}
                    label="First name"
                    name="person.firstName"
                    autoComplete="given-name"
                    spellCheck={false}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                  />
                  <TextField
                    inputRef={register}
                    label="Last name"
                    name="person.lastName"
                    autoComplete="family-name"
                    spellCheck={false}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                  />
                  <TextField
                    inputRef={register({
                      required: "Required",
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
                        message:
                          "Must be at least 8 Characters (no special characters), with at least One Uppercase, One Lowercase and One Number",
                      },
                    })}
                    error={typeof errors?.person?.password != "undefined"}
                    helperText={errors?.person?.password?.message}
                    label="Password"
                    name="person.password"
                    type="password"
                    autoComplete="new-password"
                    spellCheck={false}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                  />
                </>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                // onClick={() => {
                //   dispatch(GetPersonByEmail(email));
                // }}
                disabled={loginStatus === "loading" || userExists === true}
              >
                {loginStatus === "loading" || userExists === true ? (
                  <CircularProgress color="secondary"></CircularProgress>
                ) : (
                  <Typography>Continue</Typography>
                )}
              </Button>

              <Box mt={5}>
                <></>
              </Box>
            </form>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default withRouter(Login);
