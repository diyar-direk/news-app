import React from "react";
import "./video.css";
import { Link } from "react-router-dom";
const Videos = (props) => {
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
      return years === 1 ? "1 year ago" : `${years} years ago`;
    }
    if (months > 0) {
      return months === 1 ? "1 month ago" : `${months} months ago`;
    }
    if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    }
    if (hours > 0) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    }
    if (minutes > 0) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
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
                <Link to="/category" state={{ query: e.category }}>
                  {e.category}
                </Link>
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
          <Link
            to="/category"
            state={{ query: [props.data && props.data[0].category] }}
            className="title"
          >
            {[props.data && props.data[0].category]}{" "}
          </Link>
        </div>
        <div className="video">{data}</div>
      </div>
    </div>
  );
};

export default Videos;
