import React, { useState } from "react";
// import ImportJob from "../Dialog/ImportJob/ImportJob";
import Page from "../Page/Page";
// import Filters from "./Filters/Filters";
// import JobList from "./JobList/JobList";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Button, Chip, Grid, TextField } from "@mui/material";
import Branches from "./Branches/Branches";
import { useBatches, useBranches } from "../Students/Students.hooks";
import Batches from "./Batches/Batches";

function Settings() {
  // const { data } = useJobs();
  const { data: branches } = useBranches();
  const { data: batches } = useBatches();
  const [openImportJobsDialog, setOpenImportJobsDialog] = useState(false);
  // console.log("data", data);
  return (
    <Page
      heading={"Settinsg"}
      // actionText="Add Job"
      onAction={() => setOpenImportJobsDialog(true)}
    >
      {/* <Filters batches={batches} branches={branches} /> */}
      {/* <JobList Jobs={data} /> */}
      {/* <ImportJob
        handleClose={() => setOpenImportJobsDialog(false)}
        open={openImportJobsDialog}
        batches={batches}
        branches={branches}
      /> */}

      <Batches batches={batches} />
      <Branches branches={branches} />
    </Page>
  );
}

export default Settings;
