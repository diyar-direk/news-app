import React from "react";
import { NavLink } from "react-router-dom";
import "./DashboardAside.css";
const DashboardAside = () => {
  return (
    <aside className="dashboard-aside">
      <NavLink to={"/link1"}>link1</NavLink>
      <NavLink to={"/link1"}>link1</NavLink>
      <NavLink to={"/link1"}>link1</NavLink>
      <NavLink to={"/link1"}>link1</NavLink>
    </aside>
  );
};

export default DashboardAside;
