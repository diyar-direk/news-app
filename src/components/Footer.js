import { NavLink } from "react-router-dom";
import "./footer.css";
import LanguageDiv from "./LanguageDiv";
import { useContext } from "react";
import { Context } from "../context/Context";
export default function Footer() {
  const context = useContext(Context);
  const language = context.langValue;

  function footerLang() {
    let div = document.querySelector(
      "footer .footer-row article > div.language-div"
    );
    div.classList.toggle("active");
    let p = document.querySelector("nav .lang p.active");
    let span = document.querySelector(
      "footer .footer-row article > div.language-div span"
    );
    span.textContent = p.textContent;
  }
  return (
    <footer className="center">
      <div className="container">
        <div className="footer-row">
          {/* <article className="row">
            <h1>logo</h1>
          </article> */}
          <article className="row">
            <NavLink to={"/about"}>{language && language.links.about}</NavLink>
            <NavLink to={"/contact"}>
              {language && language.links.contact}
            </NavLink>
            <div className="flex">
              <a href="#">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fa-solid fa-envelope"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
            <div onClick={footerLang} className="flex language-div">
              <i className="fa-solid fa-earth-americas"></i>
              <span>english</span>
              <i className="fa-solid fa-chevron-down"></i>
              <LanguageDiv />
            </div>
          </article>
          <article className="row">
            <NavLink to="/link1">link 1</NavLink>
            <NavLink to="link2">link 2</NavLink>
            <NavLink to="/link3">link 3</NavLink>
            <NavLink to="/link4">link 4</NavLink>
          </article>
          <article className="row">
            <NavLink to="/link1">link 1</NavLink>
            <NavLink to="link2">link 2</NavLink>
            <NavLink to="/link3">link 3</NavLink>
            <NavLink to="/link4">link 4</NavLink>
          </article>
        </div>
        <div className="w-100"> {language && language.footer.copyRight} </div>
      </div>
    </footer>
  );
}
