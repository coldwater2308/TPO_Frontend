import { Button, Card, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import KeyPair from "../../../KeyPair/KeyPair";
import { useApplyJob } from "../../Jobs.hooks";
import useStyles from "./JobsCard.styles";

function JobsCard({ job }) {
  const classes = useStyles();
  const { mutate: apply } = useApplyJob();
  return (
    <Card elevation={4} className={classes.jobsCard}>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems="center"
        style={{ padding: "0.5rem 0" }}
      >
        <Typography>{job?.companyName}</Typography>
        {localStorage.getItem("isAdmin") === "false" && (
          <Button
            variant="outlined"
            onClick={() => {
              apply({ postId: job._id });
            }}
          >
            Apply
          </Button>
        )}
      </Grid>
      <Divider />
      <div>
        <KeyPair label="CTC" value={job?.ctc} />
        <KeyPair label="CTC" value={job?.ctc} />
        <KeyPair label="CTC" value={job?.ctc} />
        <KeyPair label="CTC" value={job?.ctc} />
        <KeyPair label="CTC" value={job?.ctc} />
        <KeyPair label="CTC" value={job?.ctc} />
        <KeyPair label="CTC" value={job?.ctc} />
      </div>
    </Card>
  );
}

export default JobsCard;
