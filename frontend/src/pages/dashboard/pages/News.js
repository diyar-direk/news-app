import React, { useEffect, useState } from "react";
import "./news.css";
import axios from "axios";
import { Link } from "react-router-dom";

const News = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/news?fields=headline,category")
      .then((res) => setData(res.data.data.news))
      .catch((error) => console.error("Error fetching data:", error));
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

  const tableData = searchData.map((item, index) => (
    <tr key={item._id}>
      <td>{index + 1}</td>
      <td>
        {item.headline.length <= 60
          ? item.headline
          : item.headline.slice(0, 60) + "..."}
      </td>
      <td>{item.category}</td>
      <td>
        <span data-content="delete">
          <i className="fa-solid fa-trash"></i>
        </span>
        <span data-content="update">
          <Link
            to={`${item._id}`}
            className="fa-regular fa-pen-to-square"
          ></Link>
        </span>
      </td>
    </tr>
  ));

  return (
    <div className="main">
      <div className="overlay">
        <div className="content">
          <h3>are you shower you need delete this</h3>
          <div className="center">
            <span className="flex-1 cancel">cancel</span>
            <span className="flex-1 delete">
              <i className="fa-solid fa-trash"></i>
              delete
            </span>
          </div>
        </div>
      </div>
      <div className="dashboard-container">
        <article className="search no-wrap">
          <input
            onInput={handleSearch}
            type="text"
            placeholder="search"
            className="flex-1"
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </article>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>headline</th>
              <th>category</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>{tableData}</tbody>
        </table>
      </div>
    </div>
  );
};

export default News;
