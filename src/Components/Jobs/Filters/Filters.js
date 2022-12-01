import {
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useBatches, useBranches } from "../Jobs.hooks";
import useStyles from "./Filters.styles";

function Filters({ branches, batches, filters, setFilters }) {
  const classes = useStyles();

  if (localStorage.getItem("isAdmin") === "true") {
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
              label="Branch"
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, branchId: e.target.value }));
              }}
              disabled={!branches}
              fullWidth
            >
              {branches &&
                branches.map((branch) => <MenuItem value={10}> </MenuItem>)}
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
              label="Batch"
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, batchId: e.target.value }));
              }}
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
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Status"
              fullWidth
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, status: e.target.value }));
              }}
            >
              <MenuItem value={1}>Active</MenuItem>
              <MenuItem value={0}>Over</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    );
  } else {
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
              value={filters?.status}
              label="Status"
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, status: e.target.value }));
              }}
              fullWidth
            >
              <MenuItem value={0}>Applied </MenuItem>
              <MenuItem value={1}>Selected </MenuItem>
              <MenuItem value={2}> All</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

export default Filters;
