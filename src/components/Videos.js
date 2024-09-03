import React from "react";
import "./video.css";
import { Link } from "react-router-dom";
const Videos = () => {
  return (
    <div className="videos">
      <div className="container ">
        <div className="w-100">
          <h1 className="title">Watch now</h1>
        </div>
        <div className="video">
          <div className="video-item">
            <div className="img">
              <img src="https://picsum.photos/id/327/400/200" alt="img" />
            </div>
            <div className="headline">
              <div className="flex time">
                <Link>category</Link>
                <p className="time"> 2042/22/22 </p>
              </div>
              <Link>The Rise of Gourmet Street Food: Trends and Top Picks</Link>
            </div>
          </div>
          <div className="video-item">
            <div className="img">
              <img src="https://picsum.photos/id/271/400/200" alt="img" />
            </div>

            <div className="headline">
              <div className="flex time">
                <Link>category</Link>
                <p className="time"> 2042/22/22 </p>
              </div>
              <Link>The Rise of Gourmet Street Food: Trends and Top Picks</Link>
            </div>
          </div>
          <div className="video-item">
            <div className="img">
              <img src="https://picsum.photos/id/12/400/200" alt="img" />
            </div>

            <div className="headline">
              <div className="flex time">
                <Link>category</Link>
                <p className="time"> 2042/22/22 </p>
              </div>
              <Link>The Rise of Gourmet Street Food: Trends and Top Picks</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;
