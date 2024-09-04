import React from "react";
import "./about.css";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <>
      <main className="about section" id="about">
        <div className="about__container container grid">
          <h2 className="section__title-1">
            <span>About Us.</span>
          </h2>

          <div className="about__perfil">
            <div className="about__image">
              <img
                src="https://images.unsplash.com/photo-1577565177023-d0f29c354b69?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTI3Njk4OTB8&ixlib=rb-4.0.3&q=85"
                alt="imaghgje"
                className="about__img"
              />

              <div className="about__shadow"></div>

              <div className="geometric-box"></div>

              <div className="about__box"></div>
            </div>
          </div>

          <div className="about__info">
            <p className="about__description">
              Passionate about delivering <b>news </b> with the
              <b> most recent facts</b>, I have years of experience and many
              clients are happy with the projects carried out.
            </p>

            <ul className="about__list">
              <li className="about__item">
                <b>My Skills Are:</b>
              </li>
            </ul>

            <div className="about__buttons">
              <Link to="/contact" className="button">
                <i className="ri-send-plane-line"></i> Contact Me
              </Link>

              <a href=" " className="button__ghost">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
