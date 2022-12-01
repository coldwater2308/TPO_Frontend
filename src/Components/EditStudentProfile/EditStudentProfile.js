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
import useStyles from "./EditStudentProfile.styles";
import { Box, width } from "@mui/system";
import { FileUploader } from "react-drag-drop-files";
import { postCall } from "../../Utils.js/axiosCall";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import firebaseApp from "../../Utils.js/firebaseConfig";
import firebase from "firebase/app";
import { useQueryClient } from "react-query";
import Page from "../Page/Page";
import {
  useProfile,
  useUploadProfile,
} from "../StudentProfile/StudentProfile.hooks";
import { useHistory } from "react-router-dom";

const fileTypes = ["JPG", "JPEG", "PNG", "PDF", "WEBM"];

export default function EditStudentProfile({
  open,
  handleClose,
  batches,
  branches,
}) {
  const classes = useStyles();
  const linkStack = useHistory();
  const queryClient = useQueryClient();
  const [file, setFile] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState({});

  const { data: profileData } = useProfile();
  const { mutate: uploadProfile } = useUploadProfile();
  const handleChange = (file) => {
    setFile(file);
  };

  React.useEffect(() => {
    setData(profileData);
  }, [profileData]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let url;
      if (file) {
        const storageRef = firebase.storage().ref();
        const snapshot = await storageRef
          .child(`Resume/${new Date()}${file.name}`)
          .put(file, {
            contentType: file.type,
          });

        url = await snapshot.ref.getDownloadURL();
      }
      if (!url) {
        setIsLoading(false);
        return;
      }
      console.log(url);
      uploadProfile(
        { ...data, resume: url },
        {
          onSuccess: (resp) => {
            queryClient.invalidateQueries(["getProfile"]);
            linkStack.replace("/student/profile");
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
    <Page
      heading={"Edit Profile"}
      isNavigationOff={true}
      // actionText="Add Job"
      // onAction={() => setOpenAddJobsDialog(true)}
    >
      <Box className={classes.importJobs}>
        <Grid container direction={"column"} item xs={12} marginBottom={3}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
            value={data?.name}
            style={{ marginRight: "1rem" }}
            onChange={(e) => {
              setData((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
        </Grid>
        <Grid container direction={"column"} item xs={12} marginBottom={3}>
          <TextField
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            fullWidth
            type={"number"}
            value={data?.phoneNumber}
            style={{ marginRight: "1rem" }}
            onChange={(e) => {
              setData((prev) => ({ ...prev, phoneNo: e.target.value }));
            }}
          />
        </Grid>
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
                Gender
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data?.gender}
                label="Batch"
                onChange={(e) => {
                  setData((prev) => ({ ...prev, gender: e.target.value }));
                }}
                fullWidth
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container direction={"column"} item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label="Date of birth"
                inputFormat="dd/MM/yyyy"
                value={data?.dob}
                onChange={(date) => {
                  setData((prev) => ({ ...prev, dob: date }));
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid container direction={"column"} item xs={4}>
            <TextField
              id="outlined-basic"
              label="Education Gap"
              variant="outlined"
              type={"number"}
              fullWidth
              value={data?.educationGap}
              style={{ marginRight: "1rem" }}
              onChange={(e) => {
                setData((prev) => ({ ...prev, educationGap: e.target.value }));
              }}
            />
          </Grid>
          <Grid container direction={"column"} item xs={4}>
            <TextField
              id="outlined-basic"
              label="High School %"
              variant="outlined"
              fullWidth
              value={data?.highSchoolPercentage}
              style={{ marginRight: "1rem" }}
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  highSchoolPercentage: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid container direction={"column"} item xs={4}>
            <TextField
              id="outlined-basic"
              label="Inter %"
              variant="outlined"
              fullWidth
              value={data?.interPercentage}
              style={{ marginRight: "1rem" }}
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  interPercentage: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid container direction={"column"} item xs={4}>
            <TextField
              id="outlined-basic"
              label="Current CGPA"
              variant="outlined"
              fullWidth
              value={data?.bTechCGPA}
              style={{ marginRight: "1rem" }}
              onChange={(e) => {
                setData((prev) => ({ ...prev, bTechCGPA: e.target.value }));
              }}
            />
          </Grid>
          <Grid container direction={"column"} item xs={4}>
            <TextField
              id="outlined-basic"
              label="High-School Passing Year"
              variant="outlined"
              fullWidth
              type={"number"}
              value={data?.highSchoolPassingYear}
              style={{ marginRight: "1rem" }}
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  highSchoolPassingYear: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid container direction={"column"} item xs={4}>
            <TextField
              id="outlined-basic"
              label="Inter Passing Year"
              type={"number"}
              variant="outlined"
              fullWidth
              value={data?.interPassingYear}
              style={{ marginRight: "1rem" }}
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  interPassingYear: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid container direction={"column"} item xs={4}>
            <TextField
              id="outlined-basic"
              label="Number of back-logs"
              type={"number"}
              variant="outlined"
              fullWidth
              value={data?.backlogs}
              style={{ marginRight: "1rem" }}
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  backlogs: e.target.value,
                }));
              }}
            />
          </Grid>

          <Grid container direction={"column"} item xs={4}>
            <Typography variant="body2">Upload resume here:</Typography>
            <FileUploader
              multiple={false}
              handleChange={handleChange}
              name="file"
              types={fileTypes}
              hoverTitle="Drop here"
            />
          </Grid>
        </Grid>

        <div className={classes.bottomAction}>
          {!isLoading ? (
            <>
              <Button onClick={handleSubmit} autoFocus variant="contained">
                Continue
              </Button>
            </>
          ) : (
            <CircularProgress />
          )}
        </div>
      </Box>
      {/* <Card></Card> */}
    </Page>
  );
}
