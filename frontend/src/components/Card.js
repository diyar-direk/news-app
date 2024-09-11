import { Link } from "react-router-dom";
import "./card.css";
import { useContext } from "react";
import { Context } from "../context/Context";
export default function Card(props) {
  const context = useContext(Context);
  const language = context.langValue.home;
  const propsData = props.data;

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

  const subNews =
    propsData &&
    propsData.map((e, index) => {
      if (index < 4 && index !== 0) {
        return (
          <div key={e._id} className="center">
            <Link className="image-hover ">
              <img src={e.photo[0]} alt="1"></img>
            </Link>
            <div className="flex-1">
              <div className="time flex">
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
  const importantNews = propsData && propsData[0];

  return (
    <div key={importantNews && importantNews._id} className="important card">
      <Link
        to={"/category"}
        state={{ query: importantNews && importantNews.category }}
        className="title"
      >
        {importantNews && importantNews.category}
      </Link>

      <div className="important">
        <Link
          to="/read"
          state={{ id: importantNews && importantNews._id }}
          className="info"
        >
          <p className="time">
            {timeAgo(importantNews && importantNews.publishedAt)}
          </p>
          <h2>
            {importantNews.headline.length < 37
              ? importantNews.headline
              : importantNews.headline.slice(0, 30) + "..."}
            .
          </h2>
        </Link>
        <Link className="image-hover bottom-before top-images ">
          <img src={importantNews && importantNews.photo[0]} alt="1"></img>
        </Link>
      </div>

      <article>
        {subNews}
        {propsData.length > 0 && (
          <Link
            className="all"
            to="/category"
            state={{ query: importantNews && importantNews.category }}
          >
            {`${language && language.btn} ${
              importantNews && importantNews.category
            }`}
          </Link>
        )}
      </article>
    </div>
  );
}
