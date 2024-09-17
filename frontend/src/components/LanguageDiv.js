import { useContext } from "react";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

export default function LanguageDiv(props) {
  const context = useContext(Context);
  const language = context.setLanguage;
  const langVal = context.language;
  const navigator = useNavigate();
  function selects(e) {
    const divs = document.querySelectorAll(".lang p");
    divs.forEach((e) => {
      e.classList.remove("active");
    });
    divs[e.target.dataset.index].classList.add("active");
    language(e.target.dataset.lang);
    e.target.parentNode.classList.remove("active");

    props.position ? navigator("/dashboard") : navigator("/");
  }
  return (
    <div className="lang">
      <p
        className={langVal === "english" ? "active" : undefined}
        data-lang="english"
        data-index="0"
        onClick={selects}
      >
        English
      </p>
      <p
        className={langVal === "kurdish" ? "active" : undefined}
        data-lang="kurdish"
        data-index="1"
        onClick={selects}
      >
        Kurdish
      </p>
      <p
        className={langVal === "arabic" ? "active" : undefined}
        data-index="2"
        onClick={selects}
        data-lang="arabic"
      >
        عربي
      </p>
    </div>
  );
}
