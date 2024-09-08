import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
const NewsComponents = (props) => {
  const context = useContext(Context);
  const language = context.langValue.home;
  const propsData = props.data && props.data;
  const importantNews = propsData && propsData[0];
  const subNews =
    propsData &&
    propsData.map((e, index) => {
      if (index > 0 && index < 5) {
        return (
          <div key={e._id} className="center">
            <Link className="image-hover">
              <img src={e.photo[0]} alt="1"></img>
            </Link>
            <div className="flex-1">
              <div className="time flex">
                <Link> {e.category} </Link>
                <p className="time">1 min ago</p>
              </div>
              <Link>
                {e.headline.length < 37
                  ? e.headline
                  : e.headline.slice(0, 30) + "..."}
              </Link>
            </div>
          </div>
        );
      }
    });

  return (
    <div className="category container">
      {props.title && <Link>{importantNews && importantNews.category}</Link>}
      <article className="flex">
        <div className="important card">
          <Link className="image-hover">
            <img src={importantNews && importantNews.photo[0]} alt="1"></img>
          </Link>
          <div className="time flex">
            <Link> {importantNews && importantNews.category} </Link>
            <p className="time">1 min ago</p>
          </div>
          <Link>{importantNews && importantNews.headline}</Link>
          <p>{importantNews && importantNews.summary}</p>
        </div>

        <div className="sub">
          {subNews}
          {props.title && (
            <Link className="all">{` ${language && language.btn} ${
              importantNews && importantNews.category
            }`}</Link>
          )}
        </div>
      </article>
    </div>
  );
};

export default NewsComponents;
