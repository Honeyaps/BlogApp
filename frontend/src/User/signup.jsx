import React, { useState } from 'react';
import './signup.css'; // Import CSS file for styling
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:4500/";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let errors = {};
        if (!formData.firstname) {
            errors.firstname = "First name is required";
        }
        if (!formData.lastname) {
            errors.lastname = "Last name is required";
        }
        if (!formData.username) {
            errors.username = "Username is required";
        }
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email address is invalid";
        }
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        }
        if (!formData.confirmPassword) {
            errors.confirmPassword = "Please confirm your password";
        } else if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = "Passwords do not match";
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("/user/signup", formData);
                console.log(response.data.token);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("name",response.data.name)
                // Clear form data after successful submission if needed
                setFormData({ 
                    firstname: '',
                    lastname: '',
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
                navigate("/signin");
            } catch (error) {
                console.error("Error:", error);
                alert("email id already exist");
            }
        }
    };

    return (
        <div className="signup-form-container">
            <h2>Sign Up</h2>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
                    {errors.firstname && <span className="error">{errors.firstname}</span>}
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
                    {errors.lastname && <span className="error">{errors.lastname}</span>}
                </div>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                    {errors.username && <span className="error">{errors.username}</span>}
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                </div>
                <button type="submit" className='form_btn'>Sign Up</button>
                <p className='lower_txt'>Already have an account? <Link to='/signin'>Signin</Link></p>
            </form>
        </div>
    );
};

export default SignupForm;

