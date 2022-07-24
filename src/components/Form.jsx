import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    marginTop: "1",
  },
}));

const Form = ({ children, ...props }) => {
  const styles = useStyles();
  return (
    <form className={styles.root} noValidate {...props}>
      {children}
    </form>
  );
};

export default Form;
