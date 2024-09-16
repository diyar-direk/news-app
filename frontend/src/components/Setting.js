import React, { useContext } from "react";
import "./setting.css";
import LanguageDiv from "./LanguageDiv";
import { Context } from "../context/Context";
const Setting = () => {
  const theme = useContext(Context);
  const themeValue = theme.theme;
  const themeFun = theme.setTheme;
  function darkMode() {
    themeFun(themeValue ? 0 : 1);
  }
  function langClick(e) {
    const div = document.querySelector("div.sitting div.lang");
    div.classList.toggle("active");
    e.target.classList.toggle("active");
  }
  const context = useContext(Context);
  const language = context.langValue.home;
  const seletctedLang = document.querySelector("div.lang p.active");
  return (
    <div className="sitting between w-100">
      <div>
        <h4> {language ? language.theme : "select theme :"} </h4>
        <div className="theme" onClick={darkMode}></div>
      </div>
      <div className="relative">
        <h4>{language ? language.language : "select language :"} </h4>
        <div className="menu-lang" onClick={langClick}>
          <span className="span-lang">
            {seletctedLang && seletctedLang.textContent}
          </span>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
        <LanguageDiv />
      </div>
    </div>
  );
};

export default Setting;
