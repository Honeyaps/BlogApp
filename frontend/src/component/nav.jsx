import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import { FaBlog } from "react-icons/fa";
import { useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogin(!login);
    }
  }, []);

  const userName = localStorage.getItem("name")?.slice(0, 1);
  function logOut() {
    localStorage.removeItem("token");
    navigate("/signup");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo_link">
        <h3 className="logo">
          BLOGGER <FaBlog />
        </h3>
        
      </Link>
      <ul
        className={isMobile ? "nav-links-mobile" : "nav-links"}
        onClick={() => setIsMobile(false)}
      >
        {login ? (
          <Link to="/" className="avtar">
            <li>{userName}</li>
          </Link>
        ) : null}
        <Link to="/create_blog" className="crt_blog">
          <li>Create a Blog</li>
        </Link>
       
        <Link to="/" className="home">
          <li>Home</li>
        </Link>
        <Link to="" className="social">
          <li>Social</li>
        </Link>
        {login ? (
          <li className="logout" onClick={logOut}>
            Logout
          </li>
        ) : null}
      </ul>
      
      <button
        className="mobile-menu-icon"
        onClick={() => setIsMobile(!isMobile)}
      >
        {isMobile ? <FaTimes /> : <IoMdMenu />}
      </button>
    </nav>
  );
}
