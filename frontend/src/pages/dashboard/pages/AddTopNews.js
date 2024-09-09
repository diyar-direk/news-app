import React, { useContext, useEffect, useState } from "react";
import "./addnews.css";
import { Context } from "../../../context/Context";
import axios from "axios";

const AddTopNews = () => {
  const [category, setCategory] = useState("");
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
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
      <p onClick={handelSelect} key={index} data-type={e.toLowerCase()}>
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
  function handelSelect(e) {
    setCategory(e.target.dataset.type);
  }
  function addCat() {
    const inp = document.querySelector(`input[name="category"]`);
    inp.disabled = false;
    inp.classList.remove("disabled");
    inp.focus();
  }

  return (
    <div className="main">
      <div className="dashboard-container center">
        <form className="add-news">
          <div className="no-wrap">
            <input
              onInput={(e) => setCategory(e.target.value)}
              className="flex-1 disabled"
              type="text"
              disabled={true}
              name="category"
              value={category}
              placeholder="category"
            />
            <i className="fa-solid fa-chevron-down" onClick={handleClick}></i>
            <div className="select-category">
              {dataType}
              <span onClick={addCat}>add category</span>
            </div>
          </div>
          <input
            onInput={(e) => setHeadline(e.target.value)}
            value={headline}
            name="headline"
            type="text"
            placeholder="headline"
          />
          <input
            onInput={(e) => setSummary(e.target.value)}
            value={summary}
            name="summary"
            type="text"
            placeholder="summary"
          />

          <div className="submit">submit</div>
        </form>
      </div>
    </div>
  );
};

export default AddTopNews;
