import { createContext, useEffect, useState } from "react";
export const Context = createContext({});

export default function PageContext({ children }) {
  const [theme, setTheme] = useState(+localStorage.getItem("mode") || 0);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "english"
  );
  useEffect(() => {
    darkmode();
  }, [theme]);
  useEffect(() => {
    languageFun();
  }, [language]);

  const darkmode = () => {
    const i = document.querySelector("nav > div.container > .more i.mode");
    const div = document.querySelector(
      "aside.mobile-link > div.sitting div.theme"
    );
    if (theme) {
      document.documentElement.style.setProperty("--body-color", "#121417");
      document.documentElement.style.setProperty("--border-color", "#4c4c4c");
      document.documentElement.style.setProperty("--font-color", "#d8d8d8");
      document.documentElement.style.setProperty("--section-color", "#2b2f39");

      div.classList.add("dark");
      i.classList.remove("fa-sun");
      i.classList.add("fa-moon");
    } else {
      document.documentElement.style.setProperty("--body-color", "white");
      document.documentElement.style.setProperty("--font-color", "black");
      document.documentElement.style.setProperty("--border-color", "#83838340");
      document.documentElement.style.setProperty("--section-color", "#f6f6f6");
      i.classList.remove("fa-moon");
      i.classList.add("fa-sun");
      div.classList.remove("dark");
    }
    localStorage.setItem("mode", theme ? 1 : 0);
  };
  const languageFun = () => {
    const footerLang = document.querySelector(
      "footer .footer-row article > div.language-div span"
    );
    const menuLang = document.querySelector(
      "aside.mobile-link > div.sitting div.menu-lang span"
    );
    footerLang.textContent = language;
    menuLang.textContent = language;
    window.localStorage.setItem("language", language);
  };
  return (
    <Context.Provider value={{ theme, setTheme, language, setLanguage }}>
      {children}
    </Context.Provider>
  );
}
