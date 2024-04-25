import Navbar from "./nav";
import "./create_blog.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "http://localhost:4500/";

export default function Crt_blg() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/signup")
    }
  })
  const [formData, setFormData] = useState({
    title: "",
    description: "", // Corrected typo here
  });
  const [image, setImage] = useState(null);
  const [spinner, setSpinner] = useState(false);
  

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target; // Corrected access to event target value
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    let errors = {};
    if (!formData.title) {
      errors.title = "Title is required";
    }
    if (!formData.description) {
      errors.description = "Description is required"; // Corrected typo here
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setSpinner(true);
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("filename", image);

      console.log(data);
      const token = localStorage.getItem("token")
      try {
        const response = await axios.post("/blog/create_post",data,{
          headers:{
            Authorization: token
          }
        });
        console.log(response);
        // Clear form data after successful submission if needed
        setFormData({
          title: "",
          description: "", // Corrected typo here
        });
        navigate("/");
      } catch (error) {
        console.error("Error:", error);
        alert("cannot add blog")
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="create_section">
        <form onSubmit={handleSubmit}>
          <h1>Create a new Blog</h1>
          <br></br>
          <LabeledInput
            type="text"
            placeholder="Title"
            name="title" // Corrected capitalization here
            onChange={handleChange}
            errors={errors.title}
          />
          <br></br>
          <label>
            <h9>Description</h9>
            <br></br>
            <textarea
              type="text"
              className="description_sec"
              name="description" // Corrected capitalization here
              onChange={handleChange}
            />
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}
          </label>
          <br></br>
          <LabeledInput
            type="file"
            placeholder="Insert Image"
            onChange={(e) => {
              setImage(e.target.files[0]); // Corrected setting image state
            }}
            name="Image: "
          />
          <br></br>
          {spinner ? (
            <button type="submit" className="post_btn" disabled>
              <div class="loader"></div>
            </button>
          ) : (
            <button type="submit" className="post_btn">
              Post
            </button>
          )}
        </form>
      </div>
    </>
  );
}

function LabeledInput({ type, placeholder, name, onChange, errors }) {
  return (
    <label>
      <h4>{name}</h4>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
      {errors && <span className="error">{errors}</span>}
    </label>
  );
}
