import "./read.css";
import GridCard from "../components/GridCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import axios from "axios";
import Loader from "../components/Loader";

const Read = () => {
  const param = useParams();
  const id = param.id; // Access the id property from the state

  const [data, setData] = useState({});
  const [sideTop, setSideTop] = useState([]);
  const [sideNews, setSideNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [extraCards, setExtraCards] = useState([]);
  const context = useContext(Context);
  const time = context.langValue.time;
  const nav = useNavigate();
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
  // Fetch main data and side top news
  useEffect(() => {
    const fetchingData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/news/${id}`
        );
        setData(response.data);

        const top = await axios.get(
          `http://localhost:8000/api/top-news?limit=5&lang=${context.language}`
        );

        const filteredTopNews = top.data.data.filter((ele) => ele._id !== id);

        setSideTop(filteredTopNews);
      } catch (err) {
        nav("/not");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchingData();
    }
  }, [id]);

  // Fetch side news when main data changes
  useEffect(() => {
    const fetchingData = async () => {
      if (data.item && data.item.category) {
        try {
          const side = await axios.get(
            `http://localhost:8000/api/news?category=${data.item.category}&limit=10&lang=${context.language}`
          );
          const filteredSideNews = side.data.data.news.filter(
            (ele) => ele._id !== data.item._id
          );
          setSideNews(filteredSideNews.slice(0, 4));
          setExtraCards(filteredSideNews.slice(4, filteredSideNews.length));
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchingData();
  }, [data.item]);

  const language = context.langValue.readPage;

  function handleClick(e) {
    const leftArrow = document.querySelector(
      "div.the-news article.current-news .info .slider div.between i.fa-chevron-left"
    );
    const allImgs = document.querySelectorAll(
      "div.the-news article.current-news .info .slider .slide"
    );
    let activeImg = document.querySelector(
      "div.the-news article.current-news .info .slider .slide.active"
    ).dataset.index;

    allImgs.forEach((ele) => {
      ele.classList.remove("active");
    });

    if (e.target === leftArrow) {
      if (activeImg > 0) --activeImg;
      else activeImg = allImgs.length - 1;
    } else {
      if (activeImg < allImgs.length - 1) ++activeImg;
      else activeImg = 0;
    }

    allImgs[activeImg].classList.add("active");
  }
  if (!context.langValue) {
    // Handle the case where context is undefined
    return <Loader />;
  }
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <main className="center">
        <div className="container">
          <div className="the-news">
            {data.item ? (
              <article className="current-news flex-1">
                <h1>{data.item.headline}</h1>
                <p>{timeAgo(data.item.publishedAt)}</p>
                <div className="info">
                  <div className="slider">
                    {data.item.photo.map((photo, index) => (
                      <img
                        key={index}
                        data-index={index}
                        className={`slide ${index === 0 ? "active" : ""}`}
                        src={`http://localhost:8000/img/news/${photo}`}
                        alt=""
                      />
                    ))}
                    <div className="between">
                      <i
                        onClick={handleClick}
                        className="fa-solid fa-chevron-left"
                      ></i>
                      <i
                        onClick={handleClick}
                        className="fa-solid fa-chevron-right"
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="info">
                  <p>{data.item.summary}</p>
                  {data.item.video !== "no video Available" && (
                    <video
                      src={`http://localhost:8000/video/${data.item.video}`}
                      controls
                      autoPlay
                    />
                  )}
                </div>
              </article>
            ) : (
              <Loader />
            )}

            <article className="sub-news">
              <h1>{language && language.top}</h1>
              <article>
                {sideTop &&
                  sideTop.map((ele, i) => {
                    if (i < 3) {
                      return (
                        <Link
                          key={ele._id}
                          to={`/read/${ele._id}`}
                          className="image-hover"
                        >
                          <img
                            alt=""
                            src={`http://localhost:8000/img/news/${ele.photo[0]}`}
                          />
                          <h4>{ele.headline}</h4>
                        </Link>
                      );
                    }
                  })}
              </article>
              <h1>{language && language.more}</h1>
              {sideNews &&
                sideNews.map((ele) => (
                  <div key={ele._id} className="center">
                    <Link to={`/read/${ele._id}`} className="image-hover">
                      <img
                        alt=""
                        src={`http://localhost:8000/img/news/${ele.photo[0]}`}
                      />
                    </Link>
                    <Link to={`/read/${ele._id}`}>
                      {ele.headline.length < 37
                        ? ele.headline
                        : ele.headline.slice(0, 70) + "..."}
                    </Link>
                  </div>
                ))}
            </article>
          </div>
        </div>
        {extraCards && <GridCard data={extraCards} />}
      </main>
    </>
  );
};

export default Read;
