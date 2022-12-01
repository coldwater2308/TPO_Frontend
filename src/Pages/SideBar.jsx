import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
export const Navigation = (props) => {
  const linkStack = useHistory();
  const [slide, setSlide] = useState("burger");
  const showSlide = () => {
    setSlide("cross");
  };
  const hideSlide = () => {
    setSlide("burger");
  };
  const handleLogout = () => {
    localStorage.removeItem("tp_token");
    localStorage.removeItem("tp_token_student");
    if (localStorage.getItem("isAdmin")) {
      localStorage.removeItem("isAdmin");
      linkStack.replace("/admin/login");
    } else {
      localStorage.removeItem("isAdmin");
      linkStack.replace("/student/login");
    }
  };

  if (window.localStorage.getItem("isAdmin") === "true") {
    return (
      <div className={`navigation ${slide}-navigation`}>
        <div
          className={`nav-hamburger ${slide}-hide-burger`}
          onClick={showSlide}
        >
          <div className="icons">
            <MenuIcon />
          </div>
        </div>
        <div className={`nav-cross ${slide}-hide-cross`} onClick={hideSlide}>
          <div className="icons">
            <CloseIcon />
          </div>
        </div>
        <div className={`nav-logo ${slide}-nav-logo`}></div>
        <NavLink
          className="nav-links"
          activeClassName="activenav"
          to="/admin/students"
        >
          <div className="nav-icon">
            <div className="icons icon-x">
              <HomeIcon />
            </div>
          </div>
          <div className={`nav-link-item ${slide}-nav-link-item `}>
            Students
          </div>
        </NavLink>
        <NavLink
          className="nav-links"
          activeClassName="activenav"
          to="/admin/jobs"
        >
          <div className="nav-icon">
            <div className="icons icon-x">
              <HistoryIcon />
            </div>
          </div>
          <div className={`nav-link-item ${slide}-nav-link-item `}>
            Jobs & Internships
          </div>
        </NavLink>
        <NavLink
          className="nav-links"
          activeClassName="activenav"
          to="/campaign"
        >
          <div className="nav-icon">
            <div className="icons icon-x">
              <RocketLaunchIcon />
            </div>
          </div>
          <div className={`nav-link-item ${slide}-nav-link-item `}>
            Campaigns
          </div>
        </NavLink>
        <NavLink
          className="nav-links"
          activeClassName="activenav"
          to="/contacts"
        >
          <div className="nav-icon">
            <div className="icons icon-x">
              <ContactSupportIcon />
            </div>{" "}
          </div>
          <div className={`nav-link-item ${slide}-nav-link-item `}>
            Contacts
          </div>
        </NavLink>
        <NavLink
          className="nav-links"
          activeClassName="activenav"
          to="/admin/settings"
        >
          <div className="nav-icon">
            <div className="icons icon-x">
              <SettingsRoundedIcon />
            </div>
          </div>
          <div className={`nav-link-item ${slide}-nav-link-item `}>
            Settings
          </div>
        </NavLink>
        <div className="nav-logout" onClick={handleLogout}>
          <div className="nav-icon">
            <div className="icons">
              <LogoutIcon />
            </div>
          </div>
          <div className={`nav-link-item ${slide}-nav-link-item`}>Log Out</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`navigation ${slide}-navigation`}>
        <div
          className={`nav-hamburger ${slide}-hide-burger`}
          onClick={showSlide}
        >
          <div className="icons">
            <MenuIcon />
          </div>
        </div>
        <div className={`nav-cross ${slide}-hide-cross`} onClick={hideSlide}>
          <div className="icons">
            <CloseIcon />
          </div>
        </div>
        <div className={`nav-logo ${slide}-nav-logo`}></div>
        <NavLink
          className="nav-links"
          activeClassName="activenav"
          to="/student/jobs"
        >
          <div className="nav-icon">
            <div className="icons icon-x">
              <HomeIcon />
            </div>
          </div>
          <div className={`nav-link-item ${slide}-nav-link-item `}>Jobs</div>
        </NavLink>

        <NavLink
          className="nav-links"
          activeClassName="activenav"
          to="/student/profile"
        >
          <div className="nav-icon">
            <div className="icons icon-x">
              <ContactSupportIcon />
            </div>
          </div>
          <div className={`nav-link-item ${slide}-nav-link-item `}>Profile</div>
        </NavLink>

        <div className="nav-logout" onClick={handleLogout}>
          <div className="nav-icon">
            <div className="icons">
              <LogoutIcon />
            </div>
          </div>
          <div className={`nav-link-item ${slide}-nav-link-item`}>Log Out</div>
        </div>
      </div>
    );
  }
};
