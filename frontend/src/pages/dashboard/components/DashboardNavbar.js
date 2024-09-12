import React, { useContext } from "react";
import "./DashboardNavbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Setting from "../../../components/Setting";
import { Context } from "./../../../context/Context";
import Cookies from "universal-cookie";

const DashboardNavbar = () => {
  function handelCilck(e) {
    e.stopPropagation();
    e.target.classList.toggle("close");
    const aside = document.querySelector("aside.dashboard-aside");
    const container = document.querySelector("div.main .dashboard-container");
    if (e.target.classList.contains("close")) {
      aside && aside.classList.add("active");

      container && container.classList.add("active");
    } else {
      aside && aside.classList.remove("active");

      container && container.classList.remove("active");
    }
  }
  const context = useContext(Context);
  const language = context.langValue;
  const admin = context.userDetails.isAdmin;
  const nav = useNavigate();
  function logOut() {
    const cookie = new Cookies();
    cookie.set("Bearer", "");
    nav("/");
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
              {language && language.dashboard.navbar.home}
            </Link>
            <div className="btn" onClick={logOut}>
              {language && language.dashboard.navbar.out}
            </div>
          </div>
        </div>
      </div>
      <aside className="dashboard-aside">
        <h3>{language && language.dashboard.navbar.title}</h3>
        <h4 onClick={handelCilck}></h4>

        {admin && (
          <NavLink to={"/dashboard/users"}>
            <i className="fa-solid fa-users"></i>
            <span>{language && language.dashboard.navbar.user}</span>
          </NavLink>
        )}

        {admin && (
          <NavLink to={"/dashboard/add-user"}>
            <i className="fa-solid fa-user-plus"></i>
            <span>{language && language.dashboard.navbar.addUser}</span>
          </NavLink>
        )}

        <NavLink to={"/dashboard/top-news"}>
          <i className="fa-solid fa-newspaper"></i>
          <span>{language && language.dashboard.navbar.topNews}</span>
        </NavLink>

        <NavLink to={"/dashboard/add-top-news"}>
          <i className="fa-solid fa-circle-plus"></i>
          <span>{language && language.dashboard.navbar.addTopNews}</span>
        </NavLink>

        <NavLink to={"/dashboard/news"}>
          <i className="fa-regular fa-newspaper"></i>
          <span>{language && language.dashboard.navbar.news}</span>
        </NavLink>

        <NavLink to={"/dashboard/add-news"}>
          <i className="fa-solid fa-plus"></i>
          <span>{language && language.dashboard.navbar.addNews}</span>
        </NavLink>

        <Setting />
      </aside>
    </>
  );
};

export default DashboardNavbar;
