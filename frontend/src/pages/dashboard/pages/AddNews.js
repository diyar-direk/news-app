import React, { useContext, useEffect, useState } from "react";
import "./addnews.css";
import { Context } from "../../../context/Context";
import axios from "axios";

const AddNews = () => {
  function handleClick(e) {
    e.stopPropagation();
    document
      .querySelector(
        "div.main .dashboard-container form.add-news .select-category"
      )
      .classList.toggle("active");
  }
  const context = useContext(Context);
  const dataType = context.dataType.map((e, index) => {
    return (
      <p key={index} data-type={e.toLowerCase()}>
        {e}
      </p>
    );
  });
  document.body.addEventListener("click", () => {
    const catDiv = document.querySelector(
      "div.main .dashboard-container form.add-news .select-category.active"
    );
    if (document.body.contains(catDiv)) catDiv.classList.remove("active");
  });

  return (
    <div className="main">
      <div className="dashboard-container center">
        <form className="add-news">
          <div className="no-wrap">
            <input className="flex-1" type="text" placeholder="category" />
            <i className="fa-solid fa-chevron-down" onClick={handleClick}></i>
            <div className="select-category">{dataType}</div>
          </div>
          <input type="text" placeholder="headline" />
          <input type="text" placeholder="summary" />
        </form>
      </div>
    </div>
  );
};

export default AddNews;
