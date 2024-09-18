import React, { useContext, useEffect, useState } from "react";

import "./activitiesPage.css";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import axios from "axios";

const ActivitiesPage = () => {
  const [api, setApi] = useState([]);
  const [dataFltr, setDataFltr] = useState([]);
  const context = useContext(Context);
  const token = context.userDetails.token;
  const language = context.langValue.dashboard.activity;

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/activity", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setApi(res.data.data);
        setDataFltr(res.data.data);
      });
  }, []);

  const data =dataFltr&& dataFltr.map((e, i) => {
    const action = e.action;
    const type = e.type;
    const actionVal =
      action === "DELETE"
        ? language.delete
        : action === "UPDATE"
        ? language.update
        : language.create;
    return (
      <article key={i} className={action}>
        <h2>{actionVal}</h2>
        <div className="between">
          <div>
            <p>{e.details}</p>
            <span> {e.timestamp} </span>
          </div>
          <div>
            <p> {e.userId ? e.userId.username :"user not found   "} </p>
            {action !== "DELETE" && type === "news" && (
              <Link to={`/read`} state={{ id: e.target }}>
                {language.btn}
              </Link>
            )}
          </div>
        </div>
      </article>
    );
  });

  function active(e) {
    const divs = document.querySelectorAll(
      "div.main .dashboard-container.activities > div.flex > div"
    );
    divs.forEach((e) => e.classList.remove("active"));
    e.target.classList.add("active");
    if (e.target.dataset.chose !== "all") {
      const fltr = api.filter((ele) => ele.action === e.target.dataset.chose);
      setDataFltr(fltr);
    } else {
      setDataFltr(api);
    }
  }

  return (
    <div className="main">
      <div className="dashboard-container activities">
        <div className="flex">
          <div className="add" data-chose="CREATE" onClick={active}>
            <i className="fa-solid fa-plus"></i>
            <span>{language.create}</span>
          </div>

          <div className="update" data-chose="UPDATE" onClick={active}>
            <i className="fa-solid fa-wrench"></i>
            <span>{language.update}</span>
          </div>

          <div className="delete" data-chose="DELETE" onClick={active}>
            <i className="fa-solid fa-trash-can "></i>
            <span>{language.delete}</span>
          </div>

          <div className="active" data-chose="all" onClick={active}>
            <span>{language.all}</span>
          </div>
        </div>

        {data}
      </div>
    </div>
  );
};

export default ActivitiesPage;
