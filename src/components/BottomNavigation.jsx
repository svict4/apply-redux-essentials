import React from "react";
import { Button, Grid, CircularProgress } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const BottomNavigation = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="space-between"
      spacing={10}
      style={{ marginTop: 0 }}
    >
      {props.back && (
        <Grid item xs={6}>
          <Button color="secondary" onClick={props.back} fullWidth>
            Back
          </Button>
        </Grid>
      )}
      <Grid item xs={props.back ? 6 : 12}>
        <div className={classes.wrapper}>
          <Button
            color={props.color || "primary"}
            variant="contained"
            type="submit"
            fullWidth
            disabled={props.disabled}
          >
            {props.next || "Next"}
          </Button>

          {props.disabled && !props.disableSpinner && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default BottomNavigation;
