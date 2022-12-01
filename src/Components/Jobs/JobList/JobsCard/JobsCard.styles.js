import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  jobsCard: {
    padding: "1rem",
    height: "10rem",
    margin: "1rem 0",
    cursor: "pointer",
    backgroundColor: "#f8f8f8",
    "&:hover": {
      boxShadow: "2px 3px 6px 2px rgb(0 0 0 / 31%)",
    },
  },
}));
