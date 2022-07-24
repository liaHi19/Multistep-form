import React from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    margin: "3, 0, 2",
  },
}));

const PrimaryButton = ({ children, ...props }) => {
  const styles = useStyles();
  return (
    <Button
      className={styles.root}
      type="submit"
      fullWidth
      color="primary"
      variant="contained"
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
