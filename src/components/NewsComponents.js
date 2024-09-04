import React from "react";
import { Link } from "react-router-dom";
const NewsComponents = (props) => {
  return (
    <div className="category container">
      {props.title && <Link>title</Link>}
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi rem
            iure veniam optio modi quo fuga repudiandae rerum, dignissimos
            doloribus, doloremque perferendis porro totam dicta reiciendis saepe
            ducimus error beatae!
          </Link>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat,
            dolores, modi libero fuga consectetur voluptas praesentium deleniti
            repellendus placeat itaque labore, dicta nesciunt laboriosam ratione
            blanditiis. Non sequi corrupti reiciendis!
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

          {props.title && <Link className="all">see all link1</Link>}
        </div>
      </article>
    </div>
  );
};

export default NewsComponents;
