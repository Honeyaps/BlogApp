import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Email = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
        try {
            navigate("/otp")
        } catch (error) {
            console.error("Error:", error);
            alert("user not found")
        }
    }
  };

  return (
    <div className="signin-form-container">
      <h2>Password Assistance</h2>
      <br></br>
      <p>Enter the email address assossiated with your Blogger account.</p>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <button type="submit" className="form_btn">
          Continue
        </button>
      </form>
    </div>
  );
};

export default Email;
