import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Videos from "../components/Videos";
import NewsComponents from "../components/NewsComponents";
import axios from "axios";
import Loader from "../components/Loader"; // Assuming you have a Loader component

export default function Home() {
  const [topNews, setTopNews] = useState([]);
  const [dataCategories, setDataCategories] = useState({});
  const [loading, setLoading] = useState(true); // Track loading state
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topNewsResponse = await axios.get(
          "http://localhost:8000/api/top-news"
        );
        setTopNews(topNewsResponse.data.data);

        const categoriesResponse = await axios.get(
          "http://localhost:8000/api/news/categoriesNews"
        );
        setDataCategories(categoriesResponse.data.categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Data fetching complete, set loading to false
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (topNews.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % topNews.length);
    }, 10000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [topNews]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % topNews.length);
      }, 10000);
    }
  };

  const topNewsSlides = topNews.slice(0, 3).map((e, index) => (
    <div
      className={`center w-100 ${index === currentSlide ? "active" : ""}`}
      key={e._id}
      style={{ backgroundImage: `url(${e.photo[0]})` }}
    >
      <div className="container">
        <Link to="/category" state={{ query: e.category }} className="category">
          {e.category}
        </Link>
        <Link to="/read" state={{ id: e._id }} className="title">
          {e.headline.length < 37
            ? e.headline
            : e.headline.slice(0, 30) + "..."}
        </Link>
        <p>{e.publishedAt}</p>
      </div>
    </div>
  ));

  const categoryKeys = Object.keys(dataCategories);
  const showData = categoryKeys
    .slice(1, -3)
    .map((key, i) => <Card key={i} data={dataCategories[key]} />);

  if (loading) {
    return <Loader />; // Display loader while data is loading
  }

  return (
    <main className="center">
      <div className="landing center">
        {topNewsSlides}
        <div className="dots">
          {topNews.slice(0, 3).map((_, index) => (
            <span
              key={index}
              onClick={() => handleDotClick(index)}
              className={index === currentSlide ? "active" : ""}
            ></span>
          ))}
        </div>
      </div>
      <div className="news">
        <NewsComponents data={dataCategories[categoryKeys[0]]} title={true} />

        <div className="category container">
          <div className="flex-card">{showData}</div>
        </div>

        <Videos data={dataCategories[categoryKeys[categoryKeys.length - 3]]} />

        <NewsComponents
          data={dataCategories[categoryKeys[categoryKeys.length - 2]]}
          title={true}
        />
        <NewsComponents
          data={dataCategories[categoryKeys[categoryKeys.length - 1]]}
          title={true}
        />
      </div>
    </main>
  );
}
