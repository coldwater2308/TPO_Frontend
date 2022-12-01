import React, { useState } from "react";
import ImportStudent from "../Dialog/ImportStudent/ImportStudent";
import Page from "../Page/Page";
import Filters from "./Filters/Filters";
import StudentList from "./StudentList/StudentList";
import { useBatches, useBranches, useStudents } from "./Students.hooks";

function Students() {
  const { data } = useStudents();
  const { data: branches } = useBranches();
  const { data: batches } = useBatches();
  const [openImportStudentsDialog, setOpenImportStudentsDialog] =
    useState(false);
  console.log("data", data);
  return (
    <Page
      heading={"Students"}
      actionText="Import"
      onAction={() => setOpenImportStudentsDialog(true)}
    >
      <Filters batches={batches} branches={branches} />
      <StudentList students={data} />
      <ImportStudent
        handleClose={() => setOpenImportStudentsDialog(false)}
        open={openImportStudentsDialog}
        batches={batches}
        branches={branches}
      />
    </Page>
  );
}

export default Students;
