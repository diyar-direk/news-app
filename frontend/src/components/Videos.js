import React from "react";
import "./video.css";
import { Link } from "react-router-dom";
const Videos = (props) => {
  const propsData = props.data && props.data;
  const data =
    props.data &&
    props.data.map((e, index) => {
      if (index <= 2) {
        return (
          <div key={e._id} className="video-item">
            <Link
              to="/read"
              state={{ id: e._id }}
              className="img bottom-before"
            >
              <img src={e.photo[0]} alt="img" />
            </Link>
            <div className="headline">
              <div className="flex time">
                <Link to="/category" state={{ query: e.category }}>
                  {e.category}
                </Link>
                <p className="time"> 2042/22/22 </p>
              </div>
              <Link to="/read" state={{ id: e._id }}>
                {e.headline}
              </Link>
            </div>
          </div>
        );
      }
    });

  return (
    <div className="videos">
      <div className="container ">
        <div className="w-100">
          <Link
            to="/category"
            state={{ query: [props.data && props.data[0].category] }}
            className="title"
          >
            {[props.data && props.data[0].category]}{" "}
          </Link>
        </div>
        <div className="video">{data}</div>
      </div>
    </div>
  );
};

export default Videos;
