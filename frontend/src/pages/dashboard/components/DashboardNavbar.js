import React from "react";
import "./DashboardNavbar.css";
import { Link, NavLink } from "react-router-dom";
import Setting from "../../../components/Setting";
const DashboardNavbar = () => {
  function handelCilck(e) {
    e.target.classList.toggle("close");
    if (e.target.classList.contains("close")) {
      document.querySelector("aside.dashboard-aside").classList.add("active");
      document
        .querySelector("div.main .dashboard-container")
        .classList.add("active");
    } else {
      document
        .querySelector("aside.dashboard-aside")
        .classList.remove("active");
      document
        .querySelector("div.main .dashboard-container")
        .classList.remove("active");
    }
  }
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
        <h3>Dashboard</h3>
        <h4 onClick={handelCilck}></h4>
        <NavLink to={"/dashboard/top-news"}>
          <i className="fa-solid fa-newspaper"></i>
          <span>top news</span>
        </NavLink>
        <NavLink to={"/dashboard/news"}>
          <i className="fa-regular fa-newspaper"></i>
          <span>news</span>
        </NavLink>

        <NavLink to={"/dashboard/add-top-news"}>
          <i className="fa-solid fa-circle-plus"></i>
          <span>add top news</span>
        </NavLink>

        <NavLink to={"/dashboard/add"}>
          <i className="fa-solid fa-plus"></i>
          <span>add news</span>
        </NavLink>

        <Setting />
      </aside>
    </>
  );
};

export default DashboardNavbar;
