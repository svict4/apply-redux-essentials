import red from "@material-ui/core/colors/red";
import { createMuiTheme } from "@material-ui/core/styles";

const PRIMARYCOLOR = "#283F3D";
const SECONDARYCOLOR = "#638425";

// const PRIMARYBUTTONCOLOR = "#FFFFFF";
// const PRIMARYBUTTONBACKGROUNDCOLOR = "#E87500";
// const SECONDARYBUTTONCOLOR = "#E87500";
// const SECONDARYBUTTONBACKGROUNDCOLOR = "#FFFFFF";
// const RADIOBACKGROUNDCOLOR = "#F0F3E9";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: PRIMARYCOLOR,
    },
    secondary: {
      main: SECONDARYCOLOR,
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
