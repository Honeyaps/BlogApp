import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Email = () => {
    const [formData, setFormData] = useState({
        email: ''
    });
    const [errors, setErrors] = useState({});

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

      
    };

    return (
        <div className="signin-form-container">
            <h2> enter email</h2>
            <br></br>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                
                <button type="submit" className='form_btn'>Sign in</button>
                <p className='lower_txt'>Create a new account? <Link to='#'>SignUp</Link></p>
            </form>
        </div>
    );
};


export default Email;
