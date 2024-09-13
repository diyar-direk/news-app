import React, { useContext } from "react";
import "./about.css";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
const About = () => {
  const context = useContext(Context);
  const language = context.langValue.about;
  return (
    <main className="center section-color">
      <div className="container">
        <div className="about flex">
          <div className="about-logo center">
            <h1>logo</h1>
          </div>
          <div className="about-info">
            <h1>
              {language && language.pageName}
              <span className="inside-span">
                {language && language.insideSpan}
              </span>
            </h1>
            <h3>
              loremElit officia consectetur minim in consectetur voluptate
              occaecat tempor magna Lorem. Tempor pariatur culpa eu enim et
              aliquip ad ipsum dolore anim cupidatat cupidatat in sunt. Nulla
              officia ullamco proident dolor consequat veniam. Sint laboris
              voluptate sit adipisicing. Eiusmod anim esse officia quis anim
              laboris ut.
            </h3>
            <div className="flex">
              <Link to={"/contact"} className="contact-btn">
                <i className="fa-solid fa-paper-plane"></i>{" "}
                {language && language.btn}
              </Link>
              <a href="#">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
