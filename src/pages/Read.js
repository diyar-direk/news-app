import React from "react";
import "./read.css";
const Read = () => {
  function handelClick(e) {
    const leftArrow = document.querySelector(
      "div.the-news article.current-news .info .slider div.between i.fa-chevron-left"
    );
    const rightArrow = document.querySelector(
      "div.the-news article.current-news .info .slider div.between i.fa-chevron-right"
    );
    const allIMg = document.querySelectorAll(
      "div.the-news article.current-news .info .slider .slide"
    );
    let activeImg = document.querySelector(
      "div.the-news article.current-news .info .slider .slide.active"
    ).dataset.index;
    allIMg.forEach((ele) => {
      ele.classList.remove("active");
    });
    if (e.target === leftArrow) {
      if (activeImg > 0) {
        console.log(1);
      }
    } else {
    }
  }
  return (
    <main>
      <div className="container">
        <div className="the-news">
          <article className="current-news flex-1">
            <h1>
              Lorem, ipsum dolor sit amet coA esse error possimus odit Lorem,
              ipsum dolor sit amet coA esse error possimus odit
            </h1>
            <p> 2020/24/25 </p>
            <video src="" controls autoPlay />
            <div className="info">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                deleniti dolor dignissimos vitae dolorem quos facilis aspernatur
                natus itaque rerum amet esse unde ipsam totam, excepturi tempore
                animi fugiat ea? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Ducimus deleniti dolor dignissimos vitae
                dolorem quos facilis aspernatur natus itaque rerum amet esse
                unde ipsam totam, excepturi tempore animi fugiat ea? Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Ducimus deleniti
                dolor dignissimos vitae dolorem quos facilis aspernatur natus
                itaque rerum amet esse unde ipsam totam, excepturi tempore animi
                fugiat ea?
              </p>
              <div className="slider">
                <img
                  data-index="0"
                  className=" slide"
                  src={require("./1.jpg")}
                  alt=""
                />
                <img
                  className="active slide"
                  data-index="1"
                  src={require("./1.jpg")}
                  alt=""
                />
                <img
                  className="slide"
                  data-index="2"
                  src={require("./1.jpg")}
                  alt=""
                />
                <div className="between">
                  <i
                    onClick={handelClick}
                    className="fa-solid fa-chevron-left"
                  ></i>
                  <i
                    onClick={handelClick}
                    className="fa-solid fa-chevron-right"
                  ></i>
                </div>
              </div>
            </div>
          </article>
          <article className="sub-news">
            <h1>sub news</h1>
          </article>
        </div>
      </div>
    </main>
  );
};

export default Read;
