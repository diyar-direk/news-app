import React, { useEffect, useState } from "react";
import "./news.css";
import axios from "axios";
import { Link } from "react-router-dom";

const TopNews = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/top-news?sort=position")
      .then((res) => setData(res.data.data))
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

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setOverlayVisible(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting item:", selectedItem);
    setOverlayVisible(false);
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
  const tableData =
    searchData &&
    searchData.map((item, index) => (
      <tr key={item._id}>
        <td>{index + 1}</td>
        <td>
          {item.headline.length <= 60
            ? item.headline
            : item.headline.slice(0, 60) + "..."}
        </td>
        <td>{item.category}</td>
        <td>{item.position}</td>
        <td>
          <span data-content="delete" onClick={() => handleDeleteClick(item)}>
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
      {overlayVisible && (
        <div className="overlay">
          <div className="content">
            <h3>Are you sure you want to delete?</h3>
            <div className="center">
              <span className="flex-1 cancel" onClick={handleCancelDelete}>
                Cancel
              </span>
              <span className="flex-1 delete" onClick={handleConfirmDelete}>
                <i className="fa-solid fa-trash"></i>
                Delete
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-container">
        <article className="search no-wrap">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search"
            className="flex-1"
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </article>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Headline</th>
                <th>Category</th>
                <th>Positin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{tableData}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopNews;
