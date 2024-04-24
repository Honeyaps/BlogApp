import { useEffect, useState } from "react";
import "./home.css";
import Navbar from "./nav";
import axios from "axios";
import Blog from "./blog";

axios.defaults.baseURL = "http://localhost:4500/";

export default function Home() {

  const [blog, setBlog] = useState([]);

  useEffect(()=>{
    async function serverCall () {
      const response = await axios.get("blog/getblog")
      setBlog(response.data.blog)
    }
    serverCall();
  },[])
  return (
    <>
    <Navbar/>
    <div className="all_blogs">
      {
        blog.map((item,index) => (
          <div key={index}>
            <Blog title={item.title} description={item.description} image={item.img} />
          </div>
        ))
      }
    </div>
    </>
  );
}
