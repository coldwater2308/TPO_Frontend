import React from "react";
import StudentsCard from "./StudentsCard/StudentsCard";
import useStyles from "./StudentList.styles";

function StudentList({ students }) {
  const classes = useStyles();

  return (
    <div className={classes.studentList}>
      {students &&
        students.map((student) => <StudentsCard student={student} />)}
    </div>
  );
}

export default StudentList;
