import { useContext } from "react";
import { NavLink } from "react-router-dom";
import LanguageDiv from "./LanguageDiv";
import Menu from "./Menu";
import { Context } from "../context/Context";

export default function Navbar() {
  const theme = useContext(Context);
  const themeValue = theme.theme;
  const themeFun = theme.setTheme;

  function pageTheme() {
    themeFun(themeValue ? 0 : 1);
  }
  function language(e) {
    const div = document.querySelector("nav > div.container > .more > div");
    if (e.target === div) e.target.classList.toggle("active");
    e.stopPropagation();
  }
  document.body.addEventListener("click", () => {
    const langDiv = document.querySelector(
      "nav > div.container > .more > div.active"
    );

    const serachDiv = document.querySelector(
      "nav.navbar > div.container > article.search"
    );
    const showMoreLinkeDiv = document.querySelector(
      "nav.navbar > div.container > aside.more-link"
    );
    const MobileDiv = document.querySelector("nav > aside.mobile-link");

    if (document.body.contains(showMoreLinkeDiv))
      showMoreLinkeDiv.classList.remove("active");
    if (document.body.contains(MobileDiv)) {
      MobileDiv.classList.remove("active");
      document.body.style.overflowY = "auto";
      const divs = document.querySelectorAll(
        "nav > aside.mobile-link article >div"
      );
      divs.forEach((ele) => {
        ele.classList.remove("active");
      });
      const p = document.querySelectorAll(
        "nav > aside.mobile-link article > p"
      );
      p.forEach((ele) => {
        ele.classList.remove("active");
      });
    }
    if (document.body.contains(serachDiv)) serachDiv.classList.remove("active");
    if (document.body.contains(langDiv)) {
      langDiv.classList.remove("active");
    }
  });
  function showSearch(e) {
    e.stopPropagation();
    const div = document.querySelector(
      "nav.navbar > div.container > article.search"
    );
    div.classList.toggle("active");
  }
  function showMoreLinke(e) {
    e.stopPropagation();
    const div = document.querySelector(
      "nav.navbar > div.container > aside.more-link"
    );
    div.classList.toggle("active");
  }
  function showMobileAsid(e) {
    e.stopPropagation();
    const MobileDiv = document.querySelector("nav > aside.mobile-link");
    MobileDiv.classList.add("active");
    document.body.style.overflowY = "hidden";
  }
  return (
    <nav className="navbar center">
      <div className="flex container">
        <i className="fa-solid fa-bars" onClick={showMobileAsid}></i>
        {/* start search div  */}
        <article className="search" onClick={(e) => e.stopPropagation()}>
          <div className="flex">
            <input type="text" />
            <h3 className="center">
              search
              <i className="fa-solid fa-magnifying-glass"></i>
            </h3>
          </div>
        </article>
        {/* end search div  */}

        {/* start more link div  */}
        <aside className="more-link" onClick={(e) => e.stopPropagation()}>
          <div className="between">
            <article className="flex-1">
              <NavLink to="/link1">link 1</NavLink>
              <NavLink to="link2">link 2</NavLink>
              <NavLink to="/link3">link 3</NavLink>
              <NavLink to="link4">link 4</NavLink>
            </article>
            <article className="flex-1">
              <NavLink to="/link1">link 1</NavLink>
              <NavLink to="link2">link 2</NavLink>
              <NavLink to="/link3">link 3</NavLink>
              <NavLink to="link4">link 4</NavLink>
            </article>
            <article className="flex-1">
              <NavLink to="/link1">link 1</NavLink>
              <NavLink to="link2">link 2</NavLink>
              <NavLink to="/link3">link 3</NavLink>
              <NavLink to="link4">link 4</NavLink>
            </article>
          </div>
        </aside>
        {/* end more link div  */}

        <div className="logo">logo</div>
        <div className="links center">
          <NavLink to="/link1">link 1</NavLink>
          <NavLink to="link2">link 2</NavLink>
          <NavLink to="/link3">link 3</NavLink>
          <NavLink to="link4">link 4</NavLink>
          <i className="fa-solid fa-ellipsis" onClick={showMoreLinke}></i>
        </div>
        <div className="more center">
          <i className="fa-solid fa-magnifying-glass" onClick={showSearch}></i>
          <div onClick={language}>
            <i className="fa-solid fa-earth-americas"></i>
            <LanguageDiv />
          </div>
          <i className="fa-solid fa-sun mode" onClick={pageTheme}></i>
        </div>
      </div>
      <div className="bottom-link center">
        <div className="container">
          <NavLink to="/link1">link 1</NavLink>
          <NavLink to="link2">link 2</NavLink>
          <NavLink to="/link3">link 3</NavLink>
          <NavLink to="link4">link 4</NavLink>
        </div>
      </div>
      <Menu />
    </nav>
  );
}
