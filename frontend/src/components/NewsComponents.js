import React, { useContext } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { Context } from "../context/Context";
const NewsComponents = (props) => {
  const context = useContext(Context);
  const language = context.langValue.home;
  
  const propsData = props.data && props.data;
  const importantNews = propsData && propsData[0];
  
  const time = context.langValue.time;
  // Helper function to format time ago
  const timeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return years === 1
        ? `${time.oneYear}`
        : `${time.beforeYears} ${years} ${time.years}`;
    }
    if (months > 0) {
      return months === 1
        ? `${time.oneMonth}`
        : `${time.beforeMonth} ${months} ${time.months}`;
    }
    if (days > 0) {
      return days === 1
        ? `${time.oneDay}`
        : `${time.beforeDays} ${days} ${time.days}`;
    }
    if (hours > 0) {
      return hours === 1
        ? `${time.oneHour}`
        : `${time.beforeHours} ${hours} ${time.hours}`;
    }
    if (minutes > 0) {
      return minutes === 1
        ? `${time.oneMin}`
        : `${time.beforeMinutes} ${minutes} ${time.minutes}`;
    }
    return "Just now";
  };
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
                <NavLink to={`/category/${e.category}`} key={e}>
                  {e.category}
                </NavLink>
                <p className="time">{timeAgo(e.publishedAt)}</p>
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
        <NavLink to={`/category/${importantNews && importantNews.category}`}>
          {importantNews && importantNews.category}
        </NavLink>
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
            <NavLink
              to={`/category/${importantNews && importantNews.category}`}
            >
              {importantNews && importantNews.category}
            </NavLink>
            <p className="time">
              {importantNews && timeAgo(importantNews.publishedAt)}
            </p>
          </div>
          <Link to="/read" state={{ id: importantNews && importantNews._id }}>
            {importantNews.headline.length < 37
              ? importantNews.headline
              : importantNews.headline.slice(0, 30) + "..."}
          </Link>
          <p>{importantNews && importantNews.summary}</p>
        </div>

        {propsData.length > 1 && (
          <div className="sub">
            {subNews}

            {props.title && (
              <NavLink
                to={`/category/${importantNews && importantNews.category}`}
                className="all"
              >{` ${language && language.btn} ${
                importantNews && importantNews.category
              }`}</NavLink>
            )}
          </div>
        )}
      </article>
    </div>
  );
};

export default NewsComponents;
