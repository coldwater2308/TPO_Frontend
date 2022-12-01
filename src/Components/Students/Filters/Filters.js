import {
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { useBatches, useBranches } from "../Students.hooks";
import useStyles from "./Filters.styles";

function Filters({ branches, batches }) {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.filters}>
      <Grid
        container
        direction={"column"}
        item
        xs={4}
        className={classes.filter}
      >
        <FormControl>
          <InputLabel id="demo-simple-select-label">Batch</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            // onChange={handleChange}
            disabled={!branches}
            fullWidth
          >
            {branches &&
              branches.map((branch) => (
                <MenuItem value={10}>{branch?.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid container direction={"column"} item xs={4}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Batch</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            // onChange={handleChange}
            disabled={!batches}
            fullWidth
          >
            {batches &&
              batches.map((batch) => (
                <MenuItem value={10}>{batch?.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item container direction={"column"} xs={4}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Selected</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            fullWidth

            // onChange={handleChange}
          >
            <MenuItem value={1}>Placed</MenuItem>
            <MenuItem value={0}>Unplaced</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default Filters;
