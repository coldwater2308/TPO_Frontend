import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import "./Styles/app.scss";
import Login from "./Pages/Login";
import { Navigation } from "./Pages/SideBar";
import Students from "./Components/Students/Students";
import { QueryClient, QueryClientProvider } from "react-query";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Jobs from "./Components/Jobs/Jobs";
import Settings from "./Components/Settings/Settings";
import StudentProfile from "./Components/StudentProfile/StudentProfile";
import EditStudentProfile from "./Components/EditStudentProfile/EditStudentProfile";

const App = () => {
  const linkStack = useHistory();

  let theme = createTheme({
    palette: {
      primary: {
        main: "#410B33",
        400: "#89106a",
      },
      secondary: {
        main: "#edf2ff",
      },
    },
  });

  console.log(linkStack);
  useEffect(() => {
    console.log(localStorage.getItem("tp_token"));
    if (linkStack) {
      const name = window.location.pathname;
      if (
        localStorage.getItem("isAdmin") === "true" &&
        !localStorage.getItem("tp_token") &&
        name.split("/")[1] !== "login"
      ) {
        if (name.split("/")[0] === "student") {
          linkStack?.replace("/student/login");
        } else {
          linkStack?.replace("/admin/login");
        }
      } else if (
        localStorage.getItem("isAdmin") === "false" &&
        !localStorage.getItem("tp_token_student") &&
        name.split("/")[1] !== "login"
      )
        if (name.split("/")[0] === "student") {
          linkStack?.replace("/student/login");
        } else {
          linkStack?.replace("/admin/login");
        }
    }
  }, [linkStack]);
  useEffect(() => {
    if (linkStack) {
      const name = window.location.pathname;
      console.log(
        typeof localStorage.getItem("isAdmin"),
        localStorage.getItem("tp_token_student"),
        name
      );
      if (localStorage.getItem("isAdmin") && name.split("/")[0] !== "admin") {
        linkStack?.replace("/admin/login");
      } else if (
        localStorage.getItem("isAdmin") &&
        name.split("/")[0] !== "student"
      ) {
        linkStack?.replace("/admin/login");
      }
      if (
        localStorage.getItem("isAdmin") === "false" &&
        name.split("/")[0] !== "student"
      ) {
        if (localStorage.getItem("tp_token_student")) {
          linkStack?.replace("/student/jobs");
        } else {
          linkStack?.replace("/admin/login");
        }
      }
      if (
        localStorage.getItem("isAdmin") === "true" &&
        name.split("/")[0] !== "admin"
      ) {
        if (localStorage.getItem("tp_token")) {
          linkStack?.replace("/admin/students");
        } else {
          linkStack?.replace("/student/login");
        }
      }
    }
  }, [linkStack]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, refetchOnWindowFocus: false },
      mutations: { retry: false },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Switch>
              <Route path="/student/login" exact>
                <Login />
              </Route>
              <Route path="/admin/login" exact>
                <Login />
              </Route>

              <>
                <Route path="/student/jobs" exact>
                  <Jobs />
                </Route>
                <Route path="/student/profile" exact>
                  <StudentProfile />
                </Route>
                <Route path="/student/edit-profile" exact>
                  <EditStudentProfile />
                </Route>
              </>

              {/* <Route path="/" exact></Route> */}

              <>
                <Route path="/admin/students" exact>
                  <Students />
                </Route>
                <Route path="/admin/jobs" exact>
                  <Jobs />
                </Route>
                <Route path="/admin/settings" exact>
                  <Settings />
                </Route>
              </>
            </Switch>
          </Router>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
