import React from "react";
import { Link } from "react-router-dom";

import "./WelcomePage.scss";

const WelcomePage = () => {
  return (
    <div className="welcome">
      <main className="welcome__main">
        <p className="welcome__text">
          Загружайте музыку, составляйте плейлисты и слушайте плейлисты других
          пользователей!
        </p>
        <button className="welcome__button">
          <Link to="/" style={{ color: "#fff" }}>
            Открыть плеер
          </Link>
        </button>
      </main>
      <footer className="welcome__footer">
        <p>@ 2021 NETCRACKER</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
