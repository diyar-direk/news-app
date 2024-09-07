import React from "react";
import "./DashboardNavbar.css";
import { Link } from "react-router-dom";
const DashboardNavbar = () => {
  return (
    <div className="navbar center">
      <div className="between container">
        <div className="logo">
          <Link to={"/"}>logo</Link>
        </div>
        <div className="flex">
          <Link to={"/"} className="btn">
            home page
          </Link>
          <div className="btn">log out</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
