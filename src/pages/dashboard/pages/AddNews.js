import React from "react";
import "./addnews.css";

const AddNews = () => {
  function handleClick() {
    document
      .querySelector(
        "div.main .dashboard-container form.add-news .select-category"
      )
      .classList.toggle("active");
  }
  return (
    <div className="main">
      <div className="dashboard-container center">
        <form className="add-news">
          <div className="no-wrap">
            <input className="flex-1" type="text" placeholder="category" />
            <i className="fa-solid fa-chevron-down" onClick={handleClick}></i>
            <div className="select-category">
              <p>Category</p>
              <p>Category</p>
              <p>Category</p>
              <p>Category</p>
            </div>
          </div>
          <input type="text" placeholder="headline" />
          <input type="text" placeholder="summary" />
        </form>
      </div>
    </div>
  );
};

export default AddNews;
