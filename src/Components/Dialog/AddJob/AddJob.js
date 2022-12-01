import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DialogTitle from "@mui/material/DialogTitle";
import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import useStyles from "./AddJob.styles";
import { Box, width } from "@mui/system";
import { FileUploader } from "react-drag-drop-files";
import { postCall } from "../../../Utils.js/axiosCall";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import firebaseApp from "../../../Utils.js/firebaseConfig";
import firebase from "firebase/app";
import { useUploadJob, useUploadJobs } from "../../Jobs/Jobs.hooks";
import { useQueryClient } from "react-query";

const fileTypes = ["JPG", "JPEG", "PNG", "PDF", "WEBM"];

export default function AddJob({ open, handleClose, batches, branches }) {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const [file, setFile] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [branch, setBranch] = React.useState(null);
  const [batch, setBatch] = React.useState(null);
  const [data, setData] = React.useState({});
  const { mutate: uploadJob } = useUploadJob();
  const handleChange = (file) => {
    setFile(file);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const storageRef = firebase.storage().ref();
      const snapshot = await storageRef
        .child(`JD/${new Date()}${file.name}`)
        .put(file, {
          contentType: file.type,
        });

      const url = await snapshot.ref.getDownloadURL();
      if (!url) {
        setIsLoading(false);
        return;
      }
      console.log(url);
      uploadJob(
        { ...data, file: [url] },
        {
          onSuccess: (resp) => {
            queryClient.invalidateQueries(["getJobs"]);
            handleClose();
          },
          onError: (err) => console.log(err),
          onSettled: () => {
            setIsLoading(false);
          },
        }
      );
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    return () => {
      setData(null);
    };
  }, []);

  console.log(file);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <Box className={classes.importJobs}>
        <DialogTitle id="alert-dialog-title">{"Add Job"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={4} direction={"column"}>
            <Grid
              container
              item
              xs={4}
              direction={"column"}
              className={classes.filter}
            >
              <FormControl>
                <InputLabel required id="demo-simple-select-label">
                  Batch
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={data?.batchId}
                  label="Batch"
                  onChange={(e) => {
                    setData((prev) => ({ ...prev, batchId: e.target.value }));
                  }}
                  disabled={!batches}
                  fullWidth
                >
                  {batches &&
                    batches.map((batch) => (
                      <MenuItem value={batch?._id}>{batch?.name}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid container direction={"column"} item xs={4}>
              <FormControl>
                <InputLabel required id="demo-simple-select-label">
                  Branch
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Branch"
                  onChange={(e) => {
                    setData((prev) => ({ ...prev, branchId: e.target.value }));
                  }}
                  disabled={!branches}
                  fullWidth
                >
                  {branches &&
                    branches.map((branch) => (
                      <MenuItem value={branch?._id}>{branch?.name}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid container direction={"column"} item xs={4}>
              <TextField
                id="outlined-basic"
                label="Company Name"
                variant="outlined"
                fullWidth
                style={{ marginRight: "1rem" }}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, companyName: e.target.value }));
                }}
              />
            </Grid>
            <Grid
              container
              item
              xs={4}
              direction={"column"}
              className={classes.filter}
            >
              <FormControl>
                <InputLabel required id="demo-simple-select-label">
                  Job Type
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={data?.jobType}
                  label="Job Type"
                  onChange={(e) => {
                    setData((prev) => ({ ...prev, jobType: e.target.value }));
                  }}
                  disabled={!batches}
                  fullWidth
                >
                  <MenuItem value={"fullTime"}>Full Time</MenuItem>
                  <MenuItem value={"internship"}>Internship</MenuItem>
                  <MenuItem value={"fullTimeWithIntern"}>
                    Full-time with internship
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container direction={"column"} item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="Last Date for submission"
                  inputFormat="dd/MM/yyyy"
                  value={data?.lastDate}
                  onChange={(date) => {
                    setData((prev) => ({ ...prev, lastDate: date }));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid container direction={"column"} item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="Pre-Placement Talk Date"
                  inputFormat="dd/MM/yyyy"
                  value={data?.prePlacementTalkDate}
                  onChange={(date) => {
                    setData((prev) => ({
                      ...prev,
                      prePlacementTalkDate: date,
                    }));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid container direction={"column"} item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="Test Date"
                  inputFormat="dd/MM/yyyy"
                  value={data?.testDate}
                  onChange={(date) => {
                    setData((prev) => ({ ...prev, testDate: date }));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid container direction={"column"} item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="Interview Date"
                  inputFormat="dd/MM/yyyy"
                  value={data?.interviewDate}
                  onChange={(date) => {
                    setData((prev) => ({
                      ...prev,
                      interviewDate: date,
                    }));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid container direction={"column"} item xs={4}>
              <TextField
                id="outlined-basic"
                label="CTC"
                variant="outlined"
                style={{ marginRight: "1rem" }}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, ctc: e.target.value }));
                }}
              />
            </Grid>
            <Grid container direction={"column"} item xs={4}>
              <TextField
                id="outlined-basic"
                label="Minimum Cutt-Off"
                variant="outlined"
                style={{ marginRight: "1rem" }}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, cgpaCutoff: e.target.value }));
                }}
              />
            </Grid>
            <Grid container direction={"column"} item xs={4}>
              <TextField
                id="outlined-basic"
                label="Bond Duration"
                variant="outlined"
                style={{ marginRight: "1rem" }}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, bond: e.target.value }));
                }}
              />
            </Grid>
            <Grid container direction={"column"} item xs={4}>
              <Typography variant="body2">
                Upload job description here:
              </Typography>
              <FileUploader
                multiple={false}
                handleChange={handleChange}
                name="file"
                types={fileTypes}
                hoverTitle="Drop here"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {!isLoading ? (
            <>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={handleSubmit}
                autoFocus
                // disabled={!file || !batch || !branch}
              >
                Continue
              </Button>
            </>
          ) : (
            <CircularProgress />
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
}
