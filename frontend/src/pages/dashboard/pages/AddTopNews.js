import React, { useContext, useEffect, useState } from "react";
import "./addnews.css";
import { Context } from "../../../context/Context";
import axios from "axios";

const AddTopNews = () => {
  const [category, setCategory] = useState("");
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [position, setPosition] = useState("");
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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

  function handelFiles(e) {
    const selectedFiles = Array.from(e.target.files);

    const images = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    const videos = selectedFiles.filter((file) =>
      file.type.startsWith("video/")
    );

    if (images.length > 3 || videos.length > 1) {
      setErrorMessage("Please upload exactly 3 images and 1 video.");
      return;
    }

    setErrorMessage("");

    setFiles([...images, ...videos]);
  }
  const formData = new FormData();

  formData.append("category", category);
  formData.append("headline", headline);
  formData.append("summary", summary);

  files.forEach((e, index) => {
    e.type.startsWith("image/")
      ? formData.append("photo", e)
      : formData.append("video", e);
  });
  return (
    <div className="main">
      <div className="dashboard-container center">
        <form className="add-news">
          <label
            htmlFor="category"
            onClick={(e) => {
              e.stopPropagation();
              document
                .querySelector(
                  "div.main .dashboard-container form.add-news .select-category"
                )
                .classList.toggle("active");
            }}
          >
            category:
          </label>
          <div className="no-wrap">
            <input
              onInput={(e) => setCategory(e.target.value)}
              className="flex-1 disabled"
              type="text"
              disabled={true}
              name="category"
              value={category}
              placeholder="category"
              id="category"
            />
            <i className="fa-solid fa-chevron-down" onClick={handleClick}></i>
            <div className="select-category">
              {dataType}
              <span onClick={addCat}>add category</span>
            </div>
          </div>
          <label htmlFor="headline">headline:</label>
          <input
            onInput={(e) => setHeadline(e.target.value)}
            value={headline}
            name="headline"
            type="text"
            placeholder="headline"
            id="headline"
          />
          <label
            htmlFor="summray"
            onClick={() => {
              document.querySelector("textarea").focus();
            }}
          >
            summary:
          </label>
          <textarea
            onInput={(e) => setSummary(e.target.value)}
            value={summary}
            name="summary"
            type="text"
            placeholder="summary"
            id="summary"
            rows={3}
          ></textarea>
          <label htmlFor="position">position:</label>
          <input
            name="position"
            type="number"
            placeholder="add position to news"
            id="position"
            max={5}
            min={1}
            onChange={(e) => setPosition(e.target.value)}
          />

          <label htmlFor="file">Add 3 photos and 1 video:</label>
          <label
            htmlFor="file"
            className="file"
            style={{ textAlign: "center", cursor: "pointer" }}
          >
            <input
              onChange={handelFiles}
              id="file"
              type="file"
              accept="image/*,video/*"
              multiple
            />
            <i className="fa-solid fa-photo-film"></i>
          </label>

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <div className="file-flex">
            {files.map((file, index) => (
              <div key={index}>
                {file.type.startsWith("image/") ? (
                  <img src={URL.createObjectURL(file)} alt="uploaded" />
                ) : (
                  <video src={URL.createObjectURL(file)} controls />
                )}
              </div>
            ))}
          </div>

          <div className="submit">Submit</div>
        </form>
      </div>
    </div>
  );
};

export default AddTopNews;
