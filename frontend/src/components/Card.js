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
      if (index < 4) {
        return (
          <div className="center">
            <Link className="image-hover">
              <img src={e.photo[0]} alt="1"></img>
            </Link>
            <div className="flex-1">
              <div className="time flex">
                <p className="time">1 min ago</p>
              </div>
              <Link>{e.headline}</Link>
            </div>
          </div>
        );
      }
    });
  const importantNews = propsData && propsData[0];

  return (
    <div className="important card">
      <Link className="title"> {importantNews && importantNews.category} </Link>

      <div className="important">
        <Link className="info">
          <p className="time">2024/10/11</p>
          <h2>Lorem ipsum dolor sit amet consectetur.</h2>
        </Link>
        <Link className="image-hover">
          <img src={importantNews && importantNews.photo[0]} alt="1"></img>
        </Link>
      </div>

      <article>
        {subNews}
        <a className="all" href="/">
          {`${language && language.btn} ${
            importantNews && importantNews.category
          }`}
        </a>
      </article>
    </div>
  );
}
