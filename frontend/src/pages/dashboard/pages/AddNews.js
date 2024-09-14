import React, { useContext, useState } from "react";
import "./addnews.css";
import { Context } from "../../../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormLoading from "../../../components/FormLoading";

const AddNews = () => {
  const [category, setCategory] = useState("");
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState([]);
  const [categoryError, setCategoryError] = useState(false);
  const [headlineError, setHeadlineError] = useState(false);
  const [summaryError, setSummaryError] = useState(false);
  const [filesError, setFilesError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  function handleClick(e) {
    e.stopPropagation();
    document
      .querySelector(
        "div.main .dashboard-container form.add-news .select-category"
      )
      .classList.toggle("active");
  }

  const context = useContext(Context);
  const language = context.langValue;
  const token = context.userDetails.token;
  const nav = useNavigate();
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
    setCategoryError(false);
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
      setErrorMessage(true);
      return;
    }

    setFiles([...files, ...images, ...videos]);
  }

  async function handelSubmit() {
    const images = files.filter((file) => file.type.startsWith("image/"));
    const videos = files.filter((file) => file.type.startsWith("video/"));

    if (category === "") setCategoryError(true);
    else if (headline === "") setHeadlineError(true);
    else if (summary === "") setSummaryError(true);
    else if (files.length <= 0) setFilesError(true);
    else if (images.length > 3 || videos.length > 1) setErrorMessage(true);
    else {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("category", category);
        formData.append("headline", headline);
        formData.append("summary", summary);

        files.forEach((e, index) => {
          e.type.startsWith("image/")
            ? formData.append("photo", e)
            : formData.append("video", e);
        });
        const data = await axios.post(
          "http://localhost:8000/api/news",
          formData,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        setLoading(false);

        nav("/dashboard/news");
      } catch (err) {
        setLoading(false);

        console.log(err);
      }
    }
  }
  function handelRemove(e) {
    const fltr = files.filter((item) => item.name != e.target.dataset.name);
    setFiles(fltr);
  }
  return (
    <div className="main">
      <div className="dashboard-container center">
        <form className="add-news">
          {loading && <FormLoading />}
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
            {language && language.dashboard.forms.category}
          </label>
          <div className="no-wrap">
            <input
              onInput={(e) => {
                setCategory(e.target.value);
                setCategoryError(false);
              }}
              className="flex-1 disabled"
              type="text"
              disabled={true}
              name="category"
              value={category}
              placeholder={language && language.dashboard.forms.category}
              id="category"
            />
            <i className="fa-solid fa-chevron-down" onClick={handleClick}></i>
            <div className="select-category">
              {dataType}
              <span onClick={addCat}>
                {language && language.dashboard.forms.add}
              </span>
            </div>
          </div>

          {categoryError && (
            <p className="error">
              {language && language.dashboard.forms.errorCategory}
            </p>
          )}

          <label htmlFor="headline">
            {language && language.dashboard.forms.headline}
          </label>
          <input
            onInput={(e) => {
              setHeadline(e.target.value);
              setHeadlineError(false);
            }}
            value={headline}
            name="headline"
            type="text"
            placeholder={language && language.dashboard.forms.headline}
            id="headline"
          />

          {headlineError && (
            <p className="error">
              {language && language.dashboard.forms.errorHeadline}
            </p>
          )}

          <label
            htmlFor="summray"
            onClick={() => {
              document.querySelector("textarea").focus();
            }}
          >
            {language && language.dashboard.forms.summary}
          </label>
          <textarea
            onInput={(e) => {
              setSummary(e.target.value);
              setSummaryError(false);
            }}
            value={summary}
            name="summary"
            type="text"
            placeholder={language && language.dashboard.forms.summary}
            id="summary"
            rows={3}
          ></textarea>

          {summaryError && (
            <p className="error">
              {language && language.dashboard.forms.errorSummary}
            </p>
          )}

          <label htmlFor="file">
            {language && language.dashboard.forms.files}
          </label>
          <label
            htmlFor="file"
            className="file"
            style={{ textAlign: "center", cursor: "pointer" }}
          >
            <input
              onChange={handelFiles}
              onInput={() => {
                setFilesError(false);
                setErrorMessage(false);
              }}
              id="file"
              type="file"
              accept="image/*,video/*"
              multiple
            />
            <i className="fa-solid fa-photo-film"></i>
          </label>

          {filesError && (
            <p className="error">
              {language && language.dashboard.forms.errorFiles}
            </p>
          )}

          <div className="file-flex">
            {files.map((file, index) => (
              <div key={index}>
                {file.type.startsWith("image/") ? (
                  <img src={URL.createObjectURL(file)} alt="uploaded" />
                ) : (
                  <video src={URL.createObjectURL(file)} controls />
                )}
                <i
                  data-name={file.name}
                  className="fa-solid fa-x"
                  onClick={handelRemove}
                ></i>
              </div>
            ))}
          </div>
          {errorMessage && (
            <p className="error">
              {language && language.dashboard.forms.errorManyFiles}
            </p>
          )}

          <div className="submit" onClick={handelSubmit}>
            {language && language.dashboard.forms.create}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNews;
