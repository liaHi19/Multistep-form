import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Confetti from "react-confetti";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { InsertDriveFile } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

import { useData } from "../context/DataContext";

import MainContainer from "../components/MainContainer";
import PrimaryButton from "../components/PrimaryButton";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: "30px",
  },
  table: {
    marginBottom: "30px",
  },
  link: {
    display: "inline-block",
    marginTop: "30px",
    color: "blue",
    textDecoration: "none",
  },
}));
const Result = () => {
  const [success, setSuccess] = useState(false);
  const { data } = useData();
  const styles = useStyles();

  delete data.hasPhone;
  const entries = Object.entries(data).filter((entry) => entry[0] !== "files");

  console.log(entries);
  const { files } = data;

  const onSubmit = async () => {
    const formData = new FormData();
    if (data.files) {
      data.files.forEach((file) => {
        formData.append("files", file, file.name);
      });
    }
    entries.forEach((entry) => {
      formData.append(entry[0], entry[1]);
    });
    const res = await fetch("http://localhost:4000/", {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      Swal.fire("Great job!", "success");
      setSuccess(true);
    }
  };

  if (success) {
    return <Confetti />;
  }
  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Form Values
      </Typography>
      <TableContainer className={styles.root} component={Paper}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry[0]}>
                <TableCell component="th" scope="row">
                  {entry[0]}
                </TableCell>
                <TableCell align="right">{entry[1].toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {files.length > 0 && (
        <>
          <Typography component="h2" variant="h5">
            Files
          </Typography>
          <List>
            {files?.map((file, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <InsertDriveFile />
                </ListItemIcon>
                <ListItemText primary={file.name} secondary={file.size} />
              </ListItem>
            ))}
          </List>
        </>
      )}
      <PrimaryButton onClick={onSubmit} disabled={!entries.length}>
        Submit
      </PrimaryButton>
      <Link className={styles.link} to="/">
        Start Over
      </Link>
    </MainContainer>
  );
};

export default Result;
