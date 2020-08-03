import React from "react";
import { TextField } from "@material-ui/core";

const TextFieldWithErrors = (props) => {
  const fieldName = props.name;

  // let error = false;
  let lastKey = "";
  // let helperText = "";
  let nestedObj = {};

  if (
    !(
      Object.keys(props.errors).length === 0 &&
      props.errors.constructor === Object
    )
  ) {
    const path = ["errors"].concat(fieldName.match(/[^\]\[.]+/g)); //["errors"].concat(fieldName.split("."));
    lastKey = path.pop();
    nestedObj = path.reduce((a, path) => a[path], props)
      ? path.reduce((a, path) => a[path], props)
      : {};
  }

  return (
    <TextField
      {...props}
      margin="normal"
      fullWidth
      error={nestedObj[lastKey] ? true : false}
      helperText={
        (nestedObj[lastKey] && nestedObj[lastKey].message) || props.helperText
      }
    ></TextField>
  );
};

export default TextFieldWithErrors;
