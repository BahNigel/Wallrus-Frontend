import React from "react";
import TextField from "@material-ui/core/TextField";
import "./input.scss";

const Input = (props) => {
  return (
    <TextField
      id={props.id}
      helperText={props.helperText}
      error={props.error}
      rows={props.rows}
      multiline={props.multiline}
      onChange={(event) => props.onChange(event)}
      label={props.placeholder}
      variant="outlined"
      className={`width-100 primary-input ${props.className}`}
      type={props.type}
      value={props.value}
    />
  );
};

export default Input;
