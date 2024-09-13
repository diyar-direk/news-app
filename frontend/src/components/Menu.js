import { NavLink } from "react-router-dom";
import "./menu.css";
import { useContext } from "react";
import { Context } from "../context/Context";
import Setting from "./Setting";
import { linksClick } from "./Navbar";
export default function Menu() {
  const context = useContext(Context);
  const language = context.langValue.home;
  const token = context.userDetails.token;
  const data = context.dataType;

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

  return (
    <aside className="mobile-link" onClick={(e) => e.stopPropagation()}>
      <h1 className="menu-logo">logo</h1>
      <div className="center">
        <input
          type="text"
          className="flex-1"
          placeholder={language && language.search}
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div>
        <article>
          <p data-index="0" onClick={openNestedMenu}>
            {language && language.pages}
            <i className="fa-solid fa-chevron-down"></i>
          </p>
          <div>
            {token && (
              <NavLink to={"/dashboard"}>
                {context.langValue.links.dashboard}
              </NavLink>
            )}
            <NavLink
              onClick={() => {
                linksClick(
                  document.querySelector("nav > aside.mobile-link.active"),
                  true
                );
              }}
              to={"/"}
            >
              {context.langValue && context.langValue.links.Home}
            </NavLink>
            <NavLink
              onClick={() => {
                linksClick(
                  document.querySelector("nav > aside.mobile-link.active"),
                  true
                );
              }}
              to={"/contact"}
            >
              {context.langValue && context.langValue.links.contact}
            </NavLink>
            <NavLink
              onClick={() => {
                linksClick(
                  document.querySelector("nav > aside.mobile-link.active"),
                  true
                );
              }}
              to={"/about"}
            >
              {context.langValue && context.langValue.links.about}
            </NavLink>
          </div>
        </article>
        <article>
          <p data-index="1" onClick={openNestedMenu}>
            {language && language.pages}
            <i className="fa-solid fa-chevron-down"></i>
          </p>
          <div>
            {data.map((e) => {
              return (
                <NavLink
                  onClick={() => {
                    linksClick(
                      document.querySelector("nav > aside.mobile-link.active"),
                      true
                    );
                  }}
                  to={`/category/${e}`}
                  key={e}
                >
                  {e}
                </NavLink>
              );
            })}
          </div>
        </article>
      </div>
      <Setting />
      <i className="fa-solid fa-x" onClick={closeMemu}></i>
    </aside>
  );
}
