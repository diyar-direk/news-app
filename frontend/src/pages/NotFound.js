import React, { useContext } from "react";
import "./notfound.css";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

const NotFound = () => {
  const context = useContext(Context);
  const language = context.langValue.pageNotFound;
  console.log(language);

  return (
    <>
      <main className="page_404 center">
        <h1> {language && language.title} </h1>

        <section className="error-container">
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
          <span className="zero">
            <span className="screen-reader-text">0</span>
          </span>
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
        </section>
        <div className="link-container">
          <Link to="/" className="more-link">
            {language && language.btn}
          </Link>
        </div>
      </main>
    </>
  );
};

export default NotFound;
