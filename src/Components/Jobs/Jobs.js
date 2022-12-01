import React, { useState } from "react";
import AddJob from "../Dialog/AddJob/AddJob";
// import AddJob from "../Dialog/AddJob/AddJob";
import Page from "../Page/Page";
import { useAddBranch } from "../Settings/Settings.hooks";
import Filters from "./Filters/Filters";
import JobList from "./JobList/JobList";
import { useBatches, useBranches, useJobs } from "./Jobs.hooks";

function Jobs() {
  const { data } = useJobs();
  const { data: branches } = useBranches();
  const { data: batches } = useBatches();
  const [filters, setFilters] = useState({});

  const [openAddJobsDialog, setOpenAddJobsDialog] = useState(false);
  console.log("data", data);
  return (
    <Page
      heading={"Jobs"}
      actionText="Add Job"
      onAction={() => setOpenAddJobsDialog(true)}
    >
      <Filters
        batches={batches}
        branches={branches}
        filters={filters}
        setFilters={setFilters}
      />
      <JobList jobs={data} />
      <AddJob
        handleClose={() => setOpenAddJobsDialog(false)}
        open={openAddJobsDialog}
        batches={batches}
        branches={branches}
      />
    </Page>
  );
}

export default Jobs;
