import React from "react";
import "./DashboardNavbar.css";
import { Link, NavLink } from "react-router-dom";
import Setting from "../../../components/Setting";
const DashboardNavbar = () => {
  return (
    <>
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
      <aside className="dashboard-aside">
        <NavLink to={"/dashboard/news"}>
          <i className="fa-regular fa-newspaper"></i>
          <span>news</span>
        </NavLink>

        <NavLink to={"/dashboard/add"}>
          <i className="fa-solid fa-plus"></i>
          <span>add news</span>
        </NavLink>

        <NavLink to={"/link1"}>link1</NavLink>
        <NavLink to={"/link1"}>link1</NavLink>
        <Setting />
      </aside>
    </>
  );
};

export default DashboardNavbar;
