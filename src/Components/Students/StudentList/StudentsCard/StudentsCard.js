import { Card, Divider } from "@mui/material";
import React from "react";
import useStyles from "./StudentsCard.styles";

function StudentsCard({ student }) {
  const classes = useStyles();
  return (
    <Card elevation={4} className={classes.studentsCard}>
      <input type="checkbox" name="" id="" />| {student.email}
      <Divider />
    </Card>
  );
}

export default StudentsCard;
