import { Link } from "react-router-dom";
import "./card.css";
import { useContext } from "react";
import { Context } from "../context/Context";
export default function Card(props) {
  const context = useContext(Context);
  const language = context.langValue.home;
  return (
    <div className="important card">
      <Link className="title">title</Link>
      <div className="important">
        <Link className="info">
          <p className="time">2024/10/11</p>
          <h2>Lorem ipsum dolor sit amet consectetur.</h2>
        </Link>
        <Link className="image-hover">
          <img src={require("./1.jpg")} alt="1"></img>
        </Link>
      </div>
      <article>
        <div className="center">
          <Link className="image-hover">
            <img src={require("./1.jpg")} alt="1"></img>
          </Link>
          <div className="flex-1">
            <div className="time flex">
              <p className="time">1 min ago</p>
            </div>
            <Link>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis.
            </Link>
          </div>
        </div>
        <div className="center">
          <Link className="image-hover">
            <img src={require("./1.jpg")} alt="1"></img>
          </Link>
          <div className="flex-1">
            <div className="time flex">
              <p className="time">1 min ago</p>
            </div>
            <Link>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis.
            </Link>
          </div>
        </div>
        <div className="center">
          <Link className="image-hover">
            <img src={require("./1.jpg")} alt="1"></img>
          </Link>
          <div className="flex-1">
            <div className="time flex">
              <p className="time">1 min ago</p>
            </div>
            <Link>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis.
            </Link>
          </div>
        </div>
        <div className="center">
          <Link className="image-hover">
            <img src={require("./1.jpg")} alt="1"></img>
          </Link>
          <div className="flex-1">
            <div className="time flex">
              <p className="time">1 min ago</p>
            </div>
            <Link>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis.
            </Link>
          </div>
        </div>
        <a className="all" href="/">
          {language && language.btn}
        </a>
      </article>
    </div>
  );
}
