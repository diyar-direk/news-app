import { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
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
        setTopNews(topNewsResponse.data.data.slice(0, 5));

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
        console.log(currentSlide);
      }, 10000);
    }
  };
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
  const topNewsSlides = topNews.map((e, index) => (
    <div
      className={`center w-100 ${index === currentSlide ? "active" : ""}`}
      key={e._id}
      style={{ backgroundImage: `url(${e.photo[0]})` }}
    >
      <div className="container">
        <NavLink to={`/category/${e.category}`} className="category">
          {e.category}
        </NavLink>
        <Link to="/read" state={{ id: e._id }} className="title">
          {e.headline.length < 37
            ? e.headline
            : e.headline.slice(0, 30) + "..."}
        </Link>
        <p>{timeAgo(e.publishedAt)}</p>
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
          {topNews.map((_, index) => (
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
