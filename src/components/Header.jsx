import React from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "Permanent Marker",
    margin: "2, 0, 3",
    textAlign: "center",
    fontSize: "40px",
    color: "deeppink",
    textShadow: "1px 1px darkmagenta",
  },
}));

const Header = () => {
  const styles = useStyles();
  return (
    <Typography className={styles.root} component="h1" variant="h5">
      The Ultimate Form
    </Typography>
  );
};

export default Header;
