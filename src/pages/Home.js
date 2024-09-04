import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Card from "../components/Card";
import Videos from "../components/Videos";
let counter = 0;
let intervlaValue;
export default function Home() {


  
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setData(data));
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

  const obj = data.map((e, index) => {
    if (index < 3)
      return (
        <div
          className={index === 0 ? "center w-100 active" : "center w-100"}
          key={e.id}
        >
          <img alt={e.title} src={e.image} />
          <div className="container">
            <NavLink to="link1" className="category">
              {e.category}
            </NavLink>
            <Link to={"/"} className="title">
              {e.title}
            </Link>
            <p>{e.price}</p>
          </div>
        </div>
      );
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
        <div className="category container">
          <Link>title</Link>
          <article className="flex">
            <div className="important card">
              <Link className="image-hover">
                <img src={require("./1.jpg")} alt="1"></img>
              </Link>
              <div className="time flex">
                <Link> category </Link>
                <p className="time">1 min ago</p>
              </div>
              <Link>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                rem iure veniam optio modi quo fuga repudiandae rerum,
                dignissimos doloribus, doloremque perferendis porro totam dicta
                reiciendis saepe ducimus error beatae!
              </Link>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Fugiat, dolores, modi libero fuga consectetur voluptas
                praesentium deleniti repellendus placeat itaque labore, dicta
                nesciunt laboriosam ratione blanditiis. Non sequi corrupti
                reiciendis!
              </p>
            </div>

            <div className="sub">
              <div className="center">
                <Link className="image-hover">
                  <img src={require("./1.jpg")} alt="1"></img>
                </Link>
                <div className="flex-1">
                  <div className="time flex">
                    <Link> category </Link>
                    <p className="time">1 min ago</p>
                  </div>
                  <Link> category </Link>
                </div>
              </div>
              <div className="center">
                <Link className="image-hover">
                  <img src={require("./1.jpg")} alt="1"></img>
                </Link>
                <div className="flex-1">
                  <div className="time flex">
                    <Link> category </Link>
                    <p className="time">1 min ago</p>
                  </div>
                  <Link> category </Link>
                </div>
              </div>
              <div className="center">
                <Link className="image-hover">
                  <img src={require("./1.jpg")} alt="1"></img>
                </Link>
                <div className="flex-1">
                  <div className="time flex">
                    <Link> category </Link>
                    <p className="time">1 min ago</p>
                  </div>
                  <Link> category </Link>
                </div>
              </div>
              <div className="center">
                <Link className="image-hover">
                  <img src={require("./1.jpg")} alt="1"></img>
                </Link>
                <div className="flex-1">
                  <div className="time flex">
                    <Link> category </Link>
                    <p className="time">1 min ago</p>
                  </div>
                  <Link> category </Link>
                </div>
              </div>
              <div className="center">
                <Link className="image-hover">
                  <img src={require("./1.jpg")} alt="1"></img>
                </Link>
                <div className="flex-1">
                  <div className="time flex">
                    <Link> category </Link>
                    <p className="time">1 min ago</p>
                  </div>
                  <Link> category </Link>
                </div>
              </div>
              <Link className="all">see all link1</Link>
            </div>
          </article>
        </div>
        <Videos />
        <div className="category container">
          <div className="grid-card">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
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
