import { NavLink } from "react-router-dom";
import "./menu.css";
import { useContext } from "react";
import { Context } from "../context/Context";
import LanguageDiv from "./LanguageDiv";

export default function Menu() {
  const theme = useContext(Context);
  const themeValue = theme.theme;
  const themeFun = theme.setTheme;

  function closeMemu() {
    const div = document.querySelector("nav > aside.mobile-link");
    div.classList.remove("active");
    document.body.style.overflowY = "auto";
    const divs = document.querySelectorAll(
      "nav > aside.mobile-link article >div"
    );
    divs.forEach((ele) => {
      ele.classList.remove("active");
    });
    const p = document.querySelectorAll("nav > aside.mobile-link article > p");
    p.forEach((ele) => {
      ele.classList.remove("active");
    });
  }
  function openNestedMenu(e) {
    const divs = document.querySelectorAll(
      "nav > aside.mobile-link article >div"
    );
    divs.forEach((ele, index) => {
      if (index != e.target.dataset.index) ele.classList.remove("active");
    });
    divs[e.target.dataset.index].classList.toggle("active");
    const p = document.querySelectorAll("nav > aside.mobile-link article > p");
    p.forEach((ele, index) => {
      if (index != e.target.dataset.index) ele.classList.remove("active");
    });
    e.target.classList.toggle("active");
  }
  function darkMode() {
    themeFun(themeValue ? 0 : 1);
  }
  function langClick(e) {
    const div = document.querySelector(
      "aside.mobile-link > div.sitting div.lang"
    );
    div.classList.toggle("active");
    e.target.classList.toggle("active");
  }

  return (
    <aside className="mobile-link" onClick={(e) => e.stopPropagation()}>
      <h1>logo</h1>
      <div className="center">
        <input type="text" className="flex-1" placeholder="search..." />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div>
        <article>
          <p data-index="0" onClick={openNestedMenu}>
            home pages
            <i className="fa-solid fa-chevron-down"></i>
          </p>
          <div>
            <NavLink to={"/link1"}>link1</NavLink>
            <NavLink to={"/link1"}>link1</NavLink>
            <NavLink to={"/link1"}>link1</NavLink>
            <NavLink to={"/link1"}>link1</NavLink>
          </div>
        </article>
        <article>
          <p data-index="1" onClick={openNestedMenu}>
            home pages
            <i className="fa-solid fa-chevron-down"></i>
          </p>
          <div>
            <NavLink to={"/link1"}>link1</NavLink>
            <NavLink to={"/link1"}>link1</NavLink>
            <NavLink to={"/link1"}>link1</NavLink>
            <NavLink to={"/link1"}>link1</NavLink>
          </div>
        </article>
      </div>
      <div className="sitting between w-100">
        <div>
          <h4>Select theme:</h4>
          <div className="theme" onClick={darkMode}></div>
        </div>
        <div className="relative">
          <h4>Select language:</h4>
          <div className="menu-lang" onClick={langClick}>
            <span>english</span>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
          <LanguageDiv />
        </div>
      </div>
      <i className="fa-solid fa-x" onClick={closeMemu}></i>
    </aside>
  );
}
