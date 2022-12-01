import React from "react";
import { Button, TextField } from "@mui/material";
import { useLocation, Link, useHistory } from "react-router-dom";
import { postCall } from "../Utils.js/axiosCall";
import { baseUrl } from "../Utils.js/baseUrl";
import axios from "axios";

const Login = () => {
  const location = useLocation();
  const linkStack = useHistory();
  console.log(location.pathname);
  const name = location.pathname.replace("/", "");
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (name === "student/login") {
      const response = await axios.post(`${baseUrl}/api/student/login`, {
        email: values.email,
        password: values.password,
      });
      if (response.status === 200) {
        localStorage.setItem("tp_token_student", response.data.token);
        localStorage.setItem("isAdmin", response.data.isAdmin);
        if (response.data.isProfileComplete) {
          linkStack.replace("/student/jobs");
        } else {
          linkStack.replace("/student/edit-profile");
        }

        console.log(response);
      }
    } else if (name === "admin/login") {
      const response = await axios.post(`${baseUrl}/api/admin/login`, {
        email: values.email,
        password: values.password,
      });
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("tp_token", response.data.token);
        localStorage.setItem("isAdmin", response.data.isAdmin);
        linkStack.replace("/admin/students");
      }
    }
  };
  const eraseValues = () => {
    setValues({
      email: "",
      password: "",
    });
  };
  return (
    <div className="login-container">
      <div className="login">
        <div className="title">
          Login as {name === "student/login" ? "Student" : "Admin"}
        </div>
        <form onSubmit={HandleSubmit}>
          <TextField
            required
            className="input-form"
            id="outlined-basic-email"
            label="Email"
            variant="outlined"
            type="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          <i class="fas fa-bars"></i>
          <TextField
            required
            className="input-form"
            id="outlined-basic-password"
            label="Password"
            variant="outlined"
            type="password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </form>
        <div className="link" onClick={eraseValues}>
          <Link
            to={`${
              name === "student/login" ? "/admin/login" : "/student/login"
            }`}
          >
            Login as {name === "student/login" ? "Admin" : "Student"}
          </Link>
          {/* <Link to="/">Home</Link> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
