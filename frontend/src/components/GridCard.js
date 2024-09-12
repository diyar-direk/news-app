import React, { useContext } from "react";
import "./gridcard.css";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
const GridCard = (props) => {
  const context = useContext(Context);
  const language = context.langValue.category;
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
  return (
    <div className="grid-card container">
      {props.data &&
        props.data.map((e, index) => {
          return (
            <div className="card">
              <Link to="/read" state={{ id: e._id }} className="image-hover">
                <img src={e.photo[0]} alt="" />
              </Link>
              <div className="info">
                <h2>
                  {e.headline.length < 37
                    ? e.headline
                    : e.headline.slice(0, 30) + "..."}
                </h2>
                <div className="between">
                  <p>{timeAgo(e.publishedAt)}</p>
                  <Link to="/read" state={{ id: e._id }}>
                    {language && language.more}{" "}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default GridCard;
