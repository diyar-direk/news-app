import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LanguageDiv from "./LanguageDiv";
import Menu from "./Menu";
import { Context } from "../context/Context";
import { useState } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const theme = useContext(Context);
  const themeValue = theme.theme;
  const themeFun = theme.setTheme;

  const context = useContext(Context);
  const languageVal = context.langValue.home;
  const data = context.dataType;
  const token = context.userDetails.token;
  const navigate = useNavigate();
  function pageTheme() {
    themeFun(themeValue ? 0 : 1);
  }
  function language(e) {
    const div = document.querySelector("nav > div.container > .more > div");
    if (e.target === div) e.target.classList.toggle("active");
    e.stopPropagation();
  }
  document.body.addEventListener("click", () => {
    const langDiv = document.querySelector(
      "nav > div.container > .more > div.active"
    );

    const serachDiv = document.querySelector(
      "nav.navbar > div.container > article.search"
    );
    const showMoreLinkeDiv = document.querySelector(
      "nav.navbar > div.container > aside.more-link"
    );
    const MobileDiv = document.querySelector("nav > aside.mobile-link");

    if (document.body.contains(showMoreLinkeDiv))
      showMoreLinkeDiv.classList.remove("active");
    if (document.body.contains(MobileDiv)) {
      MobileDiv.classList.remove("active");
      document.body.style.overflowY = "auto";
      const divs = document.querySelectorAll(
        "nav > aside.mobile-link article >div"
      );
      divs.forEach((ele) => {
        ele.classList.remove("active");
      });
      const p = document.querySelectorAll(
        "nav > aside.mobile-link article > p"
      );
      p.forEach((ele) => {
        ele.classList.remove("active");
      });
    }
    if (document.body.contains(serachDiv)) serachDiv.classList.remove("active");
    if (document.body.contains(langDiv)) {
      langDiv.classList.remove("active");
    }
  });
  function showSearch(e) {
    e.stopPropagation();
    const div = document.querySelector(
      "nav.navbar > div.container > article.search"
    );
    div.classList.toggle("active");
    // Focus on the input element inside the search div
    const input = div.querySelector("input[type='text']");

    if (input) {
      input.focus();
    }
  }
  function showMoreLinke(e) {
    e.stopPropagation();
    const div = document.querySelector(
      "nav.navbar > div.container > aside.more-link"
    );
    div.classList.toggle("active");
  }
  function showMobileAsid(e) {
    e.stopPropagation();
    const MobileDiv = document.querySelector("nav > aside.mobile-link");
    MobileDiv.classList.add("active");
    document.body.style.overflowY = "hidden";
  }
  const loadLinks = (linksPerArticle) => {
    const articles = [];
    for (let i = 0; i < data.length; i += linksPerArticle) {
      const chunk = data.slice(i, i + linksPerArticle);
      articles.push(
        <article key={i} className="flex-1">
          {chunk.map((category, index) => (
            <NavLink
              key={index}
              to={`/category/${category}`}
              state={{ query: category }}
            >
              {category}
            </NavLink>
          ))}
        </article>
      );
    }
    return articles;
  };

  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  // useEffect(() => {
  //   // Add event listener for keydown when component is mounted
  //   window.addEventListener("keydown", (event) => {
  //     if (event.key === "Enter") {
  //       navigate(`/category/${query}`);
  //     }
  //   });

  //   // Cleanup event listener when component is unmounted
  //   return () => {
  //     window.removeEventListener("keydown", (event) => {
  //       if (event.key === "Enter") {
  //         navigate(`/category/${query}`);
  //       }
  //     });
  //   };
  // }, [query]);

  return (
    <>
      <nav className="navbar center">
        <div className="flex container">
          <i className="fa-solid fa-bars" onClick={showMobileAsid}></i>
          {/* start search div  */}
          <article className="search" onClick={(e) => e.stopPropagation()}>
            <div className="flex">
              <input
                type="text"
                placeholder={languageVal && languageVal.search}
                value={query}
                onChange={handleChange}
              />
              <h3
                className="center button-style"
                onClick={() => {
                  const parent = document.querySelector(
                    "nav.navbar > div.container > article.search.active"
                  );
                  const inp = document.querySelector(
                    "nav.navbar > div.container > article.search input"
                  );
                  inp.value !== "" && parent.classList.remove("active");
                  inp.value !== "" && navigate(`/category/${query}`);
                }}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </h3>
            </div>
          </article>
          {/* end search div  */}

          {/* start more link div  */}
          <aside className="more-link">
            <div className="grid">
              {loadLinks(4) /* Number of links per article */}
            </div>
          </aside>
          {/* end more link div  */}

          <div className="logo">
            <Logo />
          </div>
          <div className="links center">
            {data.map((e, i) => {
              if (i < 4) {
                return (
                  <NavLink
                    onClick={() =>
                      linksClick(
                        document.querySelector(
                          "nav.navbar > div.container > aside.more-link"
                        ),
                        true
                      )
                    }
                    to={`/category/${e}`}
                    key={e}
                  >
                    {e}
                  </NavLink>
                );
              }
            })}
            <i className="fa-solid fa-ellipsis" onClick={showMoreLinke}></i>
          </div>
          <div className="more center">
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={showSearch}
            ></i>
            <div onClick={language}>
              <i className="fa-solid fa-earth-americas"></i>
              <LanguageDiv />
            </div>
            <i className="fa-solid fa-sun mode" onClick={pageTheme}></i>
          </div>
        </div>
        <div className="bottom-link center">
          <div className="container">
            <NavLink to={`/`}>
              {context.langValue && context.langValue.links.Home}
            </NavLink>
            <NavLink to={`/about`}>
              {context.langValue && context.langValue.links.about}
            </NavLink>

            <NavLink to={`/contact`}>
              {context.langValue && context.langValue.links.contact}
            </NavLink>
            {token && (
              <NavLink to={`/dashboard`}>
                {context.langValue.links.dashboard}
              </NavLink>
            )}
            {data.map((e, i) => {
              if (i < 10) {
                return (
                  <NavLink to={`/category/${e}`} key={e}>
                    {e}
                  </NavLink>
                );
              }
            })}
          </div>
        </div>
        <Menu />
      </nav>
    </>
  );
}

export const linksClick = (div = "", remove = false, div2 = "") => {
  remove && div.classList.remove("active");
  remove && div2.classList.remove("close");
  remove && (document.body.style.overflowY = "auto");
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};
