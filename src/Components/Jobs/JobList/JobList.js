import React from "react";
import JobsCard from "./JobsCard/JobsCard";
import useStyles from "./JobList.styles";

function JobList({ jobs }) {
  const classes = useStyles();

  return (
    <div className={classes.jobList}>
      {jobs && jobs.map((job) => <JobsCard job={job} />)}
    </div>
  );
}

export default JobList;
