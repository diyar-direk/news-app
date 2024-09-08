import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Card from "../components/Card";
import Videos from "../components/Videos";
import NewsComponents from "../components/NewsComponents";
import axios from "axios";

let counter = 0;
let intervlaValue;

export default function Home() {
  const [topNews, setTopNews] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/top-news").then((res) => {
      setTopNews(res.data.data);
    });
  }, []);

  const [dataCatgoreys, setDataCatgoreys] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/news/categoriesNews")
      .then((res) => setDataCatgoreys(res.data.categories));
  }, []);

  function handelClick(e) {
    const divs = document.querySelectorAll("main > div.landing > div.w-100");
    divs.forEach((ele) => {
      ele.classList.remove("active");
    });
    divs[e.target.dataset.index].classList.add("active");
    const dots = document.querySelectorAll("main > div.landing .dots span");
    dots.forEach((ele) => {
      ele.classList.remove("active");
    });
    dots[e.target.dataset.index].classList.add("active");
    clearInterval(intervlaValue);
    counter = parseInt(e.target.dataset.index);
    intervalFun(counter);
  }

  const obj = topNews.map((e, index) => {
    if (index < 3)
      return (
        <div
          className={index === 0 ? "center w-100 active" : "center w-100"}
          key={e._id}
          style={{ backgroundImage: `url(${e.photo})` }}
        >
          <div className="container">
            <NavLink to="link1" className="category">
              {e.category}
            </NavLink>
            <Link to={"/"} className="title">
              {e.headline}
            </Link>
            <p>{e.publishedAt}</p>
          </div>
        </div>
      );
  });
  const allKeys = dataCatgoreys && Object.keys(dataCatgoreys);

  const showData =
    dataCatgoreys &&
    allKeys.map((e, i) => {
      if (i > 0 && i < allKeys.length - 3) {
        return <Card key={i} data={dataCatgoreys[e]} />;
      }
    });

  return (
    <main className="center">
      <div className="landing center">
        {obj}
        <div className="dots">
          <span onClick={handelClick} className="active" data-index="0"></span>
          <span onClick={handelClick} data-index="1"></span>
          <span onClick={handelClick} data-index="2"></span>
        </div>
      </div>
      <div className="news">
        <NewsComponents
          data={dataCatgoreys && dataCatgoreys[allKeys[0]]}
          title={true}
        />

        <div className="category container">
          <div className="flex-card">{showData}</div>
        </div>

        <Videos
          data={dataCatgoreys && dataCatgoreys[allKeys[allKeys.length - 3]]}
        />

        <NewsComponents
          data={dataCatgoreys && dataCatgoreys[allKeys[allKeys.length - 2]]}
          title={true}
        />
        <NewsComponents
          data={dataCatgoreys && dataCatgoreys[allKeys[allKeys.length - 1]]}
          title={true}
        />
      </div>
    </main>
  );
}

intervalFun(counter);
function intervalFun(counter) {
  intervlaValue = setInterval(() => {
    const divs = document.querySelectorAll("main > div.landing > div.w-100");
    if (divs.length !== 0) {
      divs.forEach((ele) => {
        ele.classList.remove("active");
      });
      divs[counter].classList.add("active");
      const dots = document.querySelectorAll("main > div.landing .dots span");
      dots.forEach((ele) => {
        ele.classList.remove("active");
      });
      dots[counter].classList.add("active");
      counter++;
      if (counter === 3) {
        counter = 0;
      }
    }
  }, 10000);
}
