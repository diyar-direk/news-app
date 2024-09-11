import React, { useContext, useState } from "react";
import "./addnews.css";
import { Context } from "../../../context/Context";

const AddUser = () => {
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [errorRole, setErrorRole] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordCon, setErrorPasswordCon] = useState(false);

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

  document.body.addEventListener("click", () => {
    const catDiv = document.querySelector(
      "div.main .dashboard-container form.add-news .select-category.active"
    );
    if (document.body.contains(catDiv)) catDiv.classList.remove("active");
  });

  function handelSelect(e) {
    setRole(e.target.dataset.type);
    setErrorRole(false);
  }

  function showPassword(e) {
    const icon = e.target;
    const input = document.querySelectorAll(`form .no-wrap input.password`);

    icon.classList.toggle("fa-eye");
    input[e.target.dataset.index].type === "password"
      ? (input[e.target.dataset.index].type = "text")
      : (input[e.target.dataset.index].type = "password");
  }

  async function handelSubmit(e) {
    e.preventDefault();
    if (userName === "") {
      setErrorName(true);
    } else if (role === "") {
      setErrorRole(true);
    } else if (password.length < 5) {
      setErrorPassword(true);
    } else if (password !== passwordConfirmation) {
      setErrorPasswordCon(true);
    }
  }

  return (
    <div className="main">
      <div className="dashboard-container center">
        <form className="add-news">
          <label htmlFor="user name">
            {language && language.dashboard.forms.userName}
          </label>

          <input
            onInput={(e) => {
              setUserName(e.target.value);
              setErrorName(false);
            }}
            value={userName}
            type="text"
            id="user name"
            name="user name"
            placeholder={language && language.dashboard.forms.userName}
          />

          {errorName && (
            <p className="error">{language.dashboard.forms.errorName}</p>
          )}

          <label
            onClick={(e) => {
              e.stopPropagation();
              document
                .querySelector(
                  "div.main .dashboard-container form.add-news .select-category"
                )
                .classList.toggle("active");
            }}
          >
            {language && language.dashboard.forms.role}
          </label>
          <div className="no-wrap">
            <input
              className="flex-1 disabled"
              type="text"
              name="role"
              value={role}
              placeholder={language && language.dashboard.forms.role}
              id="role"
              disabled
            />
            <i className="fa-solid fa-chevron-down" onClick={handleClick}></i>
            <div
              className="select-category"
              style={{ background: `var(--body-color)`, width: "100%" }}
            >
              <p data-type="admin" onClick={handelSelect}>
                admin
              </p>
              <p data-type="user" onClick={handelSelect}>
                user
              </p>
            </div>
          </div>

          {errorRole && (
            <p className="error">{language.dashboard.forms.errorRole}</p>
          )}

          <label htmlFor="password">
            {language && language.dashboard.forms.password}
          </label>

          <div className="no-wrap">
            <input
              onInput={(e) => {
                setPassword(e.target.value);
                password.length > 5 && setErrorPassword(false);
              }}
              className="password"
              value={password}
              name="password"
              type="password"
              placeholder={language && language.dashboard.forms.password}
              id="password"
            ></input>
            <i
              onClick={showPassword}
              data-index="0"
              className="fa-regular show fa-eye-slash"
            ></i>
          </div>

          {errorPassword && (
            <p className="error">{language.dashboard.forms.errorPassword}</p>
          )}

          <label htmlFor="password confirmation">
            {language && language.dashboard.forms.passwordConfirmation}
          </label>

          <div className="no-wrap">
            <input
              onInput={(e) => {
                setPasswordConfirmation(e.target.value);
                setErrorPasswordCon(false);
              }}
              className="password"
              value={passwordConfirmation}
              name="password confirmation"
              type="password"
              placeholder={
                language && language.dashboard.forms.passwordConfirmation
              }
              id="password confirmation"
            ></input>
            <i
              onClick={showPassword}
              data-index="1"
              className="fa-regular show fa-eye-slash"
            ></i>
          </div>

          {errorPasswordCon && (
            <p className="error">{language.dashboard.forms.errorPasswordcon}</p>
          )}

          <div className="submit" onClick={handelSubmit}>
            {language && language.dashboard.forms.create}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
