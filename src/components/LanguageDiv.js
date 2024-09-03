import { useContext } from "react";
import { Context } from "../context/Context";

export default function LanguageDiv() {
  const context = useContext(Context);
  const language = context.setLanguage;
  const langVal = context.language;
  console.log(langVal);

  function selects(e) {
    const divs = document.querySelectorAll("nav .lang p");
    divs.forEach((e) => {
      e.classList.remove("active");
    });
    divs[e.target.dataset.index].classList.add("active");
    language(e.target.dataset.lang);
  }
  return (
    <div className="lang">
      <p
        className={langVal === "english" ? "active" : undefined}
        data-lang="english"
        data-index="0"
        onClick={selects}
      >
        english
      </p>
      <p
        className={langVal === "arabic" ? "active" : undefined}
        data-index="1"
        onClick={selects}
        data-lang="arabic"
      >
        arabic
      </p>
    </div>
  );
}
