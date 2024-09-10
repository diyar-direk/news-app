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
            <Link to="/read" state={{ id: e._id }} className="image-hover ">
              <img src={e.photo[0]} alt="1"></img>
            </Link>
            <div className="flex-1">
              <div className="time flex">
                <Link to="/category" state={{ query: e.category }}>
                  {e.category}
                </Link>
                <p className="time">{e.publishedAt}</p>
              </div>
              <Link to="/read" state={{ id: e._id }}>
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
      {props.title && (
        <Link
          to="/category"
          state={{ query: importantNews && importantNews.category }}
        >
          {importantNews && importantNews.category}
        </Link>
      )}
      <article className="flex">
        <div className="important card">
          <Link
            to="/read"
            state={{ id: importantNews && importantNews._id }}
            className="image-hover bottom-before"
          >
            <img src={importantNews && importantNews.photo[0]} alt="1"></img>
          </Link>
          <div className="time flex">
            <Link
              to="/category"
              state={{ query: importantNews && importantNews.category }}
            >
              {importantNews && importantNews.category}
            </Link>
            <p className="time">1 min ago</p>
          </div>
          <Link to="/read" state={{ id: importantNews && importantNews._id }}>
            {
            importantNews.headline.length < 37
              ? importantNews.headline
              : importantNews.headline.slice(0, 30) + "..."}
          </Link>
          <p>{importantNews && importantNews.summary}</p>
        </div>

        {propsData.length > 1 && (
          <div className="sub">
            {subNews}

            {props.title && (
              <Link
                to="/category"
                state={{ query: importantNews && importantNews.category }}
                className="all"
              >{` ${language && language.btn} ${
                importantNews && importantNews.category
              }`}</Link>
            )}
          </div>
        )}
      </article>
    </div>
  );
};

export default NewsComponents;
