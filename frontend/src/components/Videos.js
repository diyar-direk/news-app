import React, { useContext } from "react";
import "./video.css";
import { Link, NavLink } from "react-router-dom";
import { Context } from "../context/Context";
const Videos = (props) => {
  const context = useContext(Context);
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
  const propsData = props.data && props.data;
  const data =
    props.data &&
    props.data.map((e, index) => {
      if (index <= 2) {
        return (
          <div key={e._id} className="video-item">
            <Link
              to="/read"
              state={{ id: e._id }}
              className="img bottom-before"
            >
              <img src={e.photo[0]} alt="img" />
            </Link>
            <div className="headline">
              <div className="flex time">
                <NavLink to={`/category/${e.category}`}>{e.category}</NavLink>
                <p className="time"> {timeAgo(e.publishedAt)} </p>
              </div>
              <Link to="/read" state={{ id: e._id }}>
                {e.headline}
              </Link>
            </div>
          </div>
        );
      }
    });

  return (
    <div className="videos">
      <div className="container ">
        <div className="w-100">
          <NavLink
            to={`/category/${[props.data && props.data[0].category]}`}
            className="title"
          >
            {[props.data && props.data[0].category]}
          </NavLink>
        </div>
        <div className="video">{data}</div>
      </div>
    </div>
  );
};

export default Videos;
