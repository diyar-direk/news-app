import React, { useContext, useEffect, useState } from "react";
import "./news.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";

const News = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const context = useContext(Context);
  const language = context.langValue;
  const token = context.userDetails.token;
  const isAdmin = context.userDetails.isAdmin;
  function fetchData() {
    axios
      .get(
        `http://localhost:8000/api/news?fields=headline,category&lang=${context.language}`
      )
      .then((res) => setData(res.data.data.news))
      .catch((error) => console.error("Error fetching data:", error));
  }

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setSearchData(data);
  }, [data]);

  const handleSearch = (e) => {
    const inpValue = e.target.value.toLowerCase();
    if (inpValue === "") {
      setSearchData(data);
    } else {
      const filteredData = data.filter(
        (item) =>
          item.headline.toLowerCase().includes(inpValue) ||
          item.category.toLowerCase().includes(inpValue)
      );
      setSearchData(filteredData);
    }
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setOverlayVisible(true);
  };

  const handleConfirmDelete = async () => {
    setOverlayVisible(false);
    await axios.delete(`http://localhost:8000/api/news/${selectedItem._id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    fetchData();
  };

  const handleCancelDelete = () => {
    setOverlayVisible(false);
    setSelectedItem(null);
  };
  document.body.addEventListener("click", (e) => {
    const overlay = document.querySelector("div.main > div.overlay");
    if (e.target === overlay) {
      setOverlayVisible(false);
      setSelectedItem(null);
    } else return false;
  });

  const tableData = searchData.map((item, index) => {
    return (
      <tr key={item._id}>
        <td>{index + 1}</td>
        <td className="align-left">{item.headline}</td>
        <td>{item.category}</td>
        <td>
          <span
            data-content={language.dashboard.table.delete}
            onClick={() => handleDeleteClick(item)}
          >
            <i className="fa-solid fa-trash"></i>
          </span>
          <span data-content={language && language.dashboard.table.update}>
            <Link
              to={`${item._id}`}
              className="fa-regular fa-pen-to-square"
            ></Link>
          </span>
          <span data-content={language.dashboard.table.show}>
            <Link to={`/read/${item._id}`}>
              <i className="fa-solid fa-eye"></i>
            </Link>
          </span>
        </td>
      </tr>
    );
  });
  function langClick(e) {
    e.stopPropagation();
    const div = document.querySelector(
      "div.main .dashboard-container div.news-lang > div"
    );
    div.classList.toggle("active");
  }
  function category(e) {
    const span = document.querySelector(
      "div.main .dashboard-container div.news-lang h4 span"
    );
    const div = document.querySelector(
      "div.main .dashboard-container div.news-lang > div"
    );
    span.textContent = e.target.textContent;
    if (e.target.dataset.lang !== "all") {
      axios
        .get(
          `http://localhost:8000/api/news?fields=headline,category,position&lang=${e.target.dataset.lang}`
        )
        .then((res) => setData(res.data.data.news));
    } else {
      axios
        .get(`http://localhost:8000/api/news?fields=headline,category,position`)
        .then((res) => setData(res.data.data.news));
    }
    div.classList.remove("active");
  }
  return (
    <div className="main">
      {overlayVisible && (
        <div className="overlay">
          <div className="content">
            <h3>{language && language.dashboard.table.deleteMsg}</h3>
            <div className="center">
              <span className="flex-1 cancel" onClick={handleCancelDelete}>
                {language && language.dashboard.table.cencel}
              </span>
              <span className="flex-1 delete" onClick={handleConfirmDelete}>
                <i className="fa-solid fa-trash"></i>
                {language && language.dashboard.table.delete}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-container">
        <div className="flex">
          <article className="search no-wrap">
            <input
              onChange={handleSearch}
              type="text"
              placeholder={language && language.dashboard.table.search}
              className="flex-1"
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </article>

          {isAdmin && (
            <div className="news-lang">
              <h4 onClick={langClick}>
                <span className="pointer-none">{context.language}</span>
                <i className="fa-solid fa-chevron-down pointer-none"></i>
              </h4>

              <div>
                <p data-lang="all" onClick={category}>
                  {language.dashboard.table.all}
                </p>
                <p data-lang="english" onClick={category}>
                  English
                </p>
                <p data-lang="kurdish" onClick={category}>
                  Kurdî
                </p>
                <p data-lang="arabic" onClick={category}>
                  عربي
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>{language && language.dashboard.table.headline}</th>
                <th>{language && language.dashboard.table.category}</th>
                <th>{language && language.dashboard.table.action}</th>
              </tr>
            </thead>
            <tbody>{tableData}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default News;
