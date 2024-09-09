import { Link } from "react-router-dom";
import "./card.css";
import { useContext } from "react";
import { Context } from "../context/Context";
export default function Card(props) {
  const context = useContext(Context);
  const language = context.langValue.home;
  const propsData = props.data;
  const subNews =
    propsData &&
    propsData.map((e, index) => {
      if (index < 4 && index !== 0) {
        return (
          <div className="center">
            <Link to="/read" state={{ id: e._id }} className="image-hover">
          <div key={e._id} className="center">
            <Link className="image-hover">
              <img src={e.photo[0]} alt="1"></img>
            </Link>
            <div className="flex-1">
              <div className="time flex">
                <p className="time">{e.publishedAt}</p>
              </div>
              <Link to="/read" state={{ id: e._id }}>
                {e.headline}
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
          <p className="time">2024/10/11</p>
          <h2>{importantNews && importantNews.headline}.</h2>
        </Link>
        <Link className="image-hover">
          <img src={importantNews && importantNews.photo[0]} alt="1"></img>
        </Link>
      </div>

      <article>
        {subNews}
        <Link
          className="all"
          to="/category"
          state={{ query: importantNews && importantNews.category }}
        >
          {`${language && language.btn} ${
            importantNews && importantNews.category
          }`}
        </Link>
      </article>
    </div>
  );
}
