import React from "react";
import "./create_blog.css";

const Userdata = ({ username, email }) => {
  return (
    <div className="latest_blog">
      <label>Username:</label>
      <h1>{username}</h1>
      <label>Email:</label>
      <h1>{email}</h1>
    </div>
  );
}

export default Userdata;
