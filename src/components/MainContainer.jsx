import React from "react";
import { Container } from "@mui/system";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "4 !important",
    display: "flex !important",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const MainContainer = ({ children, ...props }) => {
  const styles = useStyles();
  return (
    <Container
      className={styles.root}
      container="main"
      maxWidth="xs"
      {...props}
    >
      {children}
    </Container>
  );
};

export default MainContainer;
