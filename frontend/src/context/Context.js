import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const Context = createContext({});

export default function PageContext({ children }) {
  const [theme, setTheme] = useState(+localStorage.getItem("mode") || 0);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "english"
  );
  const [langValue, setLanguageValue] = useState("");
  useEffect(() => {
    darkmode();
  }, [theme]);

  useEffect(() => {
    languageFun();
    fetch(`/${language}.json`)
      .then((res) => res.json())
      .then((data) => setLanguageValue(data))
  }, [language]);

  const darkmode = () => {
    const i = document.querySelector("nav > div.container > .more i.mode");
    const div = document.querySelector("div.sitting div.theme");
    if (theme) {
      document.documentElement.style.setProperty("--body-color", "#121417");
      document.documentElement.style.setProperty("--border-color", "#4c4c4c");
      document.documentElement.style.setProperty("--font-color", "#d8d8d8");
      document.documentElement.style.setProperty("--section-color", "#22252c");

      div && div.classList.add("dark");
      i && i.classList.remove("fa-sun");
      i && i.classList.add("fa-moon");
    } else {
      document.documentElement.style.setProperty("--body-color", "white");
      document.documentElement.style.setProperty("--font-color", "black");
      document.documentElement.style.setProperty("--border-color", "#83838340");
      document.documentElement.style.setProperty("--section-color", "#f0f0f0");
      i && i.classList.remove("fa-moon");
      i && i.classList.add("fa-sun");
      div && div.classList.remove("dark");
    }
    localStorage.setItem("mode", theme ? 1 : 0);
  };
  const languageFun = () => {
    const footerLang = document.querySelector(
      "footer .footer-row article > div.language-div span"
    );
    const menuLang = document.querySelector("div.sitting div.menu-lang span");
    footerLang && (footerLang.textContent = language);
    menuLang && (menuLang.textContent = language);
    window.localStorage.setItem("language", language);
    language === "arabic"
      ? document.body.classList.add("arabic")
      : document.body.classList.remove("arabic");
  };
  const [dataType, setDataType] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/news/ALLcategories")
      .then((data) => setDataType(data.data));
  }, []);
  return (
    <Context.Provider
      value={{ theme, setTheme, language, setLanguage, langValue, dataType }}
    >
      {children}
    </Context.Provider>
  );
}
