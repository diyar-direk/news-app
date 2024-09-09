import React, { useContext } from "react";
import "./gridcard.css";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
const GridCard = (props) => {
  const context = useContext(Context);
  const language = context.langValue.category;

  return (
    <div className="grid-card container">
      {props.data &&
        props.data.map((e, index) => {
          return (
            <div className="card">
              <Link className="image-hover">
                <img src={e.photo[0]} alt="" />
              </Link>
              <div className="info">
                <h2>
                  {e.headline.length < 37
                    ? e.headline
                    : e.headline.slice(0, 30) + "..."}
                </h2>
                <div className="between">
                  <p>{e.publishedAt}</p>
                  <Link> {language && language.more} </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default GridCard;
