import { useEffect, useState } from "react";
import "./home.css";
import Navbar from "./nav";
import axiosInstance from "../User/axiosConfig";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Homeuser() {
  const [user, setUser] = useState({ username: "", email: "", blogs: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function serverCall() {
      try {
        // Fetch user data and blogs from the server
        const response = await axiosInstance.get("user/userdata", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is correctly prefixed with "Bearer "
          },
        });

        // Assuming the API returns { username, email, blogs }
        setUser(response.data); 
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    serverCall();
  }, []);

  async function deleteBlog(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      // Send delete request to the server
      await axiosInstance.delete("blog/deleteblog", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { id }, // Pass the blog ID in the request body
      });

      // Update the UI by filtering out the deleted blog
      const updatedBlogs = user.blogs.filter((item) => item._id !== id);
      setUser({ ...user, blogs: updatedBlogs });
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  }

  if (loading) return <div>Loading...</div>; // Show loading message

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
            <h1>Blogs: {user.blogs.length}</h1>
          </div>
        </div>

        <br />

        {error && <div className="error">{error}</div>} {/* Display error message */}

        {user.blogs && user.blogs.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Sr.no</th>
                <th>Blogs</th>
                <th>Title</th>
                <th>Date</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {user.blogs.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}.</td>
                  <td>
                    <img
                      src={item.img || "/default-image.jpg"} // Use default image if none is provided
                      height={50}
                      className="user_img"
                      alt="Blog Thumbnail"
                    />
                  </td>
                  <td>
                    <h4>{item.title.toString().slice(0, 20)}...</h4> {/* Ellipsis for long titles */}
                  </td>
                  <td>{new Date(item.date).toLocaleDateString()}</td> {/* Formatted date */}
                  <td>
                    <button
                      className="dlt_btn"
                      onClick={() => {
                        deleteBlog(item._id);
                      }}
                    >
                      <RiDeleteBin6Line className="dlt" />
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
