import React from "react";
import "./notfound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <main className="page_404">
        <h1 >404 Error Page #2</h1>
        <p class="zoom-area">
          <b>CSS</b> animations to make a cool 404 page.{" "}
        </p>
        <section class="error-container">
          <span class="four">
            <span class="screen-reader-text">4</span>
          </span>
          <span class="zero">
            <span class="screen-reader-text">0</span>
          </span>
          <span class="four">
            <span class="screen-reader-text">4</span>
          </span>
        </section>
        <div class="link-container">
          <Link to="/"
            href="https://www.silocreativo.com/en/creative-examples-404-error-css/"
            class="more-link"
          >
            Home Page
          </Link>
        </div>
      </main>
    </>
  );
};

export default NotFound;
