import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Logo from "./acrrm-logo.svg";
import Alert from "@material-ui/lab/Alert";

import { useSelector, useDispatch } from "react-redux";

import { GetPersonByEmail } from "./loginSlice";
import useStyles from "./styles";

const Login = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.login.status);
  const userExists = useSelector((state) => state.login.exists);
  const classes = useStyles();
  const [email, setEmail] = useState("");

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={Logo} alt="React Logo" style={{ maxWidth: "500px" }} />
          <div className={classes.formWrapper}>
            <Typography component="h1" variant="h5" align="center">
              Hello! <span className="wave">👋</span> <br /> Let&apos;s start
              with your email
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => {
                  dispatch(GetPersonByEmail(email));
                }}
                disabled={loginStatus === "loading" || userExists === true}
              >
                {loginStatus === "loading" || userExists === true ? (
                  <CircularProgress color="secondary"></CircularProgress>
                ) : (
                  <Typography>Continue</Typography>
                )}
              </Button>

              {userExists && (
                <Alert variant="filled" severity="success">
                  Looks like you already have an ACRRM account 🎉 We will
                  redirect you to login in just a moment...
                </Alert>
              )}

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

export default Login;

{
  /* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */
}
{
  /* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */
}
{
  /* <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign Up
            </Button> */
}
{
  /* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */
}
