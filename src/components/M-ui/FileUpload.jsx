import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
/* ===================================================================== */

const useStyles = makeStyles({
  button: {
    boxShadow: "none",
    fontWeight: "bold",

    color: "#9e9e9e",
    border: "1px solid #9e9e9e",
    backgroundColor: "#00000000",
    "&:hover": {
      color: "white",
      backgroundColor: "#616161",
      border: "1px solid #616161",
    },
  },
  label: {
    position: "relative",
    "&:hover": {
      cursor: "pointer",
    },
  },
  input: {
    position: "absolute",
    top: "-7px",
    left: "-40px",
    padding: "6px",
    width: "145px",
    opacity: 0,
  },
});

export const FileUpload = (props) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      className={classes.button}
      startIcon={<CloudUploadIcon />}
    >
      <label className={classes.label}>
        <input
          className={classes.input}
          type="file"
          value={props.file}
          onChange={props.setFile}
          accept=".pdf, image/*, .doc/, .xls"
        />
        {props.label}
      </label>
    </Button>
  );
};
