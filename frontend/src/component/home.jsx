import { useEffect, useState } from "react";
import "./home.css";
import Navbar from "./nav";
import axios from "axios";
import Blog from "./blog";
import axiosInstance from "../User/axiosConfig";

export default function Home() {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    async function serverCall() {
      const response = await axiosInstance.get("blog/getblog");
      setBlog(response.data.blog);
      // console.log(response.data.blog);
    }
    serverCall();
  }, []);

  return (
    <>
      <Navbar />
      <div className="all_blogs">
        {blog.map((item, index) => (
          <div key={index}>
            <Blog
              author={item.authorName}
              title={item.title}
              description={item.description}
              image={item.img}
              date={item.date}
            />
          </div>
        ))}
      </div>
    </>
  );
}
