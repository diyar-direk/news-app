import React, { useContext, useEffect, useState } from "react";
import "./addnews.css";
import { Context } from "../../../context/Context";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateNews = () => {
  const [category, setCategory] = useState("");
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const params = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/news/${params.id}`).then((res) => {
      console.log(res.data.item);
      setCategory(res.data.item.category);
      setHeadline(res.data.item.headline);
      setSummary(res.data.item.summary);
      // setFiles(...res.data.item.photo,res.data.item.video);
    });
  }, []);

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
              type="text"
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
          <label htmlFor="file">Add 2 photos and 1 video:</label>
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

export default UpdateNews;
