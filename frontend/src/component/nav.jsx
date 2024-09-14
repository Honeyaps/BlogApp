import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";
import { FaBlog } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";

export default function Navbar() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogin(true);
    }
  }, []);

  const userName = localStorage.getItem("name")?.slice(0, 1).toUpperCase();

  function logOut() {
    localStorage.removeItem("token");
    setLogin(false);
    navigate("/signup");
  }

  function handleLinkClick() {
    setMobile(false); 
  }

  return (
    <>
      <div className="navbar">
        <Link to="/" className="logo-link">
          <h1 className="logo">
            BLOGGER <FaBlog />
          </h1>
        </Link>
        <div>
          <ul className="links">
            <Link to="/create_blog" className="create-blog" onClick={handleLinkClick}>
              <li>Create a Blog</li>
            </Link>
            <Link to="/" className="home" onClick={handleLinkClick}>
              <li>Home</li>
            </Link>
            <Link to="" className="social" onClick={handleLinkClick}>
              <li>Social</li>
            </Link>
          </ul>
        </div>
        <div className="mob_avtar">
          {login ? (
            <Link to="/userdata" className="avatar" onClick={handleLinkClick}>
              {userName}
            </Link>
          ) : null}
          {login ? (
            <button className="logout-btn" onClick={logOut}>
              Logout
            </button>
          ) : null}
          <button className="menu-btn" onClick={() => setMobile(!mobile)}>
            <BiMenu />
          </button>
        </div>
      </div>

      {mobile && (
        <div className="mobile-navbar">
          <ul className="mobile-links">
            <Link to="/create_blog" className="create-blog" onClick={handleLinkClick}>
              <li>Create a Blog</li>
            </Link>
            <Link to="/" className="home" onClick={handleLinkClick}>
              <li>Home</li>
            </Link>
            <Link to="" className="social" onClick={handleLinkClick}>
              <li>Social</li>
            </Link>
            {login && (
              <li className="logout" onClick={logOut}>
                Logout
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
}
