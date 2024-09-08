import React, { useContext } from "react";
import "./gridcard.css";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
const GridCard = (props) => {
  const context = useContext(Context);
  const language = context.langValue.category;
  console.log(props);
  
  return (
    <div className="grid-card container">
      <div className="card">
        <Link className="image-hover">
          <img src={require("./1.jpg")} alt="" />
        </Link>
        <div className="info">
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          </h2>
          <div className="between">
            <p>2020</p>
            <Link> {language && language.more} </Link>
          </div>
        </div>
      </div>
      <div className="card">
        <Link className="image-hover">
          <img src={require("./1.jpg")} alt="" />
        </Link>
        <div className="info">
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          </h2>
          <div className="between">
            <p>2020</p>
            <Link> {language && language.more} </Link>
          </div>
        </div>
      </div>
      <div className="card">
        <Link className="image-hover">
          <img src={require("./1.jpg")} alt="" />
        </Link>
        <div className="info">
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          </h2>
          <div className="between">
            <p>2020</p>
            <Link> {language && language.more} </Link>
          </div>
        </div>
      </div>
      <div className="card">
        <Link className="image-hover">
          <img src={require("./1.jpg")} alt="" />
        </Link>
        <div className="info">
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          </h2>
          <div className="between">
            <p>2020</p>
            <Link> {language && language.more} </Link>
          </div>
        </div>
      </div>
      <div className="card">
        <Link className="image-hover">
          <img src={require("./1.jpg")} alt="" />
        </Link>
        <div className="info">
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          </h2>
          <div className="between">
            <p>2020</p>
            <Link> {language && language.more} </Link>
          </div>
        </div>
      </div>
      <div className="card">
        <Link className="image-hover">
          <img src={require("./1.jpg")} alt="" />
        </Link>
        <div className="info">
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          </h2>
          <div className="between">
            <p>2020</p>
            <Link> {language && language.more} </Link>
          </div>
        </div>
      </div>
      <div className="card">
        <Link className="image-hover">
          <img src={require("./1.jpg")} alt="" />
        </Link>
        <div className="info">
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          </h2>
          <div className="between">
            <p>2020</p>
            <Link> {language && language.more} </Link>
          </div>
        </div>
      </div>
      <div className="card">
        <Link className="image-hover">
          <img src={require("./1.jpg")} alt="" />
        </Link>
        <div className="info">
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          </h2>
          <div className="between">
            <p>2020</p>
            <Link> {language && language.more} </Link>
          </div>
        </div>
      </div>
      <div className="card">
        <Link className="image-hover">
          <img src={require("./1.jpg")} alt="" />
        </Link>
        <div className="info">
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          </h2>
          <div className="between">
            <p>2020</p>
            <Link> {language && language.more} </Link>
          </div>
        </div>
      </div>
      <div className="card">
        <Link className="image-hover">
          <img src={require("./1.jpg")} alt="" />
        </Link>
        <div className="info">
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          </h2>
          <div className="between">
            <p>2020</p>
            <Link> {language && language.more} </Link>
          </div>
        </div>
      </div>
      <div className="card">
        <Link className="image-hover">
          <img src={require("./1.jpg")} alt="" />
        </Link>
        <div className="info">
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          </h2>
          <div className="between">
            <p>2020</p>
            <Link> {language && language.more} </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridCard;
