import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import useStyles from "./ImportStudent.styles";
import { Box, width } from "@mui/system";
import { FileUploader } from "react-drag-drop-files";
import { postCall } from "../../../Utils.js/axiosCall";
const fileTypes = ["CSV"];

export default function ImportStudent({
  open,
  handleClose,
  batches,
  branches,
}) {
  const classes = useStyles();
  const [file, setFile] = React.useState(null);
  const [branch, setBranch] = React.useState(null);
  const [batch, setBatch] = React.useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  const handleUploadCsv = (file) => {
    const formData = new FormData();
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    formData.append("branchId", branch);
    formData.append("batchId", batch);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <Box className={classes.importStudents}>
        <DialogTitle id="alert-dialog-title">{"Import Student"}</DialogTitle>
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
                  // value={age}
                  label="Age"
                  onChange={(e) => {
                    setBatch(e.target.value);
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
                  label="Age"
                  onChange={(e) => {
                    setBranch(e.target.value);
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
              <Typography variant="body2">Upload Excel Sheet here:</Typography>
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleUploadCsv}
            autoFocus
            disabled={!file || !batch || !branch}
          >
            Continue
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
