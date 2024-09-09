import "./read.css";
import GridCard from "../components/GridCard";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import axios from "axios";
const Read = () => {
  const location = useLocation();
  const state = location.state || {}; // Retrieve the state or default to an empty object
  const id = state.id || ""; // Access the query property from the state
  const [data, setData] = useState({});
  console.log(id);

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8000/api/news/${id}`)
        .then((response) => setData(response.data));

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const context = useContext(Context);
  const language = context.langValue.readPage;

  function handelClick(e) {
    const leftArrow = document.querySelector(
      "div.the-news article.current-news .info .slider div.between i.fa-chevron-left"
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
      if (activeImg > 0) --activeImg;
      else activeImg = allIMg.length - 1;
      allIMg[activeImg].classList.add("active");
    } else {
      if (activeImg < allIMg.length - 1) ++activeImg;
      else activeImg = 0;
      allIMg[activeImg].classList.add("active");
    }
  }
  return (
    <main className="center">
      <div className="container">
        <div className="the-news">
          <article className="current-news flex-1">
            <h1>{data.item && data.item.headline}</h1>
            <p> {data.item && data.item.publishedAt}</p>
            <video
              src={`http://localhost:8000/video/${
                data.item && data.item.video
              }`}
              controls
              autoPlay
            />
            <div className="info">
              <p>{data.item && data.item.summary}</p>

              <div className="slider">
                <img
                  data-index="0"
                  className=" slide"
                  src={`${data.item && data.item.photo[0]}`}
                  alt=""
                />
                <img
                  className="active slide"
                  data-index="1"
                  src={`${data.item && data.item.photo[0]}`}
                  alt=""
                />
                <img
                  className="slide"
                  data-index="2"
                  src={`${data.item && data.item.photo[0]}`}
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
            <h1> {language && language.top} </h1>
            <article>
              <Link className="image-hover">
                <img alt="" src={require("./1.jpg")} />
                <h4>
                  Enim est officia laboris fugiat reprehenderit nisi cupidatat
                </h4>
              </Link>
              <Link className="image-hover">
                <img alt="" src={require("./1.jpg")} />
                <h4>
                  Enim est officia laboris fugiat reprehenderit nisi cupidatat
                </h4>
              </Link>
            </article>
            <h1> {language && language.more} </h1>

            <div className="center">
              <Link className="image-hover">
                <img alt="" src={require("./1.jpg")} />
              </Link>
              <Link>
                Enim est officia laboris fugiat reprehenderit nisi cupidatat
                magna ex eiusmod re
              </Link>
            </div>
            <div className="center">
              <Link className="image-hover">
                <img alt="" src={require("./1.jpg")} />
              </Link>
              <Link>
                Enim est officia laboris fugiat reprehenderit nisi cupidatat
                magna ex eiusmod re
              </Link>
            </div>
            <div className="center">
              <Link className="image-hover">
                <img alt="" src={require("./1.jpg")} />
              </Link>
              <Link>
                Enim est officia laboris fugiat reprehenderit nisi cupidatat
                magna ex eiusmod re
              </Link>
            </div>
            <div className="center">
              <Link className="image-hover">
                <img alt="" src={require("./1.jpg")} />
              </Link>
              <Link>
                Enim est officia laboris fugiat reprehenderit nisi cupidatat
                magna ex eiusmod re
              </Link>
            </div>
          </article>
        </div>
      </div>
      <GridCard />
    </main>
  );
};

export default Read;
