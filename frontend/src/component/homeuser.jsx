import { useEffect, useState } from "react";
import "./home.css";
import Navbar from "./nav";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";

axios.defaults.baseURL = "http://localhost:4500/";

export default function Homeuser() {
  const [user, setUser] = useState({ username: "", email: "", blogs: [] });

  useEffect(() => {
    async function serverCall() {
      const response = await axios.get("user/userdata", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        
      });
      setUser(response.data);
    }

    serverCall();
  }, []);

  async function deleteBlog(id) {
    try {
      const response = await axios.delete("blog/deleteblog", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data: {
          id: id
        }
      });
      const users = user.blogs.filter(items=> items._id !== id)
      setUser({...user,blogs: users})
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="all_blogs">
        <div className="avtar_portion">
        <div className="logo_avtar">
          <h1>{localStorage.getItem("name")?.slice(0, 1)}</h1>
        </div>

        <div className="userdata">
          <h1>Username: {user.username}</h1>
          <h1>Email: {user.email}</h1>
          <h1>Blog: {user.blogs.length}</h1>
        </div>
        </div>

        <br />
        
        {user.blogs && user.blogs.length > 0 ? (
        <table  >
          
          <thead>
          <tr>
            <th>Sr.no</th>
            <th>Blogs</th>
            <th>Title</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
          </thead>
          
            <tbody >
              
              {user.blogs.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td><img src={item.img} height={50} className="user_img"></img></td>
                  <td><h4>{item.title.toString().slice(0, 20)}</h4></td>
                  <td>{item.date.toString().slice(0, 10)}</td>
                  <td>
                    <button className="dlt_btn"
                      onClick={() => {
                        deleteBlog(item._id);
                      }}
                    >
                      <RiDeleteBin6Line className="dlt"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          ) : (
            <p>No blogs found.</p>
          )}
        
      </div>
    </>
  );
}



