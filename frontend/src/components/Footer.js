import { Link, NavLink } from "react-router-dom";
import "./footer.css";
import LanguageDiv from "./LanguageDiv";
import { useContext } from "react";
import { Context } from "../context/Context";
import { linksClick } from "./Navbar";
export default function Footer() {
  const context = useContext(Context);
  const language = context.langValue;
  const data = context.dataType;
  const token = context.userDetails.token;
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
  const loadLinks = (linksPerArticle) => {
    const articles = [];
    for (let i = 0; i < data.length; i += linksPerArticle) {
      const chunk = data.slice(i, i + linksPerArticle);

      articles.push(
        <article key={i} className="flex-1">
          {chunk.map((category, index) => (
            <Link
              onClick={() => linksClick()}
              key={index}
              to={"/category/" + category}
            >
              {category}
            </Link>
          ))}
        </article>
      );
    }
    return articles;
  };
  const seletctedLang = document.querySelector("div.lang p.active");
  return (
    <footer className="center">
      <div className="container">
        <div className="footer-row">
          {/* <article className="row">
            <h1>logo</h1>
          </article> */}
          <article className="row">
            {token && (
              <NavLink to={"/dashboard"}> {language.links.dashboard} </NavLink>
            )}
            <NavLink onClick={() => linksClick()} to={"/about"}>
              {language && language.links.about}
            </NavLink>
            <NavLink onClick={() => linksClick()} to={"/contact"}>
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
              <span className="span-lang">
                {seletctedLang && seletctedLang.textContent}
              </span>
              <i className="fa-solid fa-chevron-down"></i>
              <LanguageDiv />
            </div>
          </article>
          {loadLinks(5)}
        </div>
        <div className="w-100"> {language && language.footer.copyRight} </div>
      </div>
    </footer>
  );
}
