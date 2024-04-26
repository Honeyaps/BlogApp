import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './nav.css';
import { useState } from 'react';
import { IoMdMenu } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import { FaBlog } from "react-icons/fa";


export default function Navbar () {
    const navigate = useNavigate();
    const[isMobile,setIsMobile] = useState(false);
    
    function logOut(){
        localStorage.removeItem("token")
        navigate("/signup")
    }

    return(
        <nav className='navbar'>
            <Link to="/" className='logo_link'>
             <h3 className='logo'>BLOGGER <FaBlog /></h3>
             </Link>
             <ul className={isMobile? "nav-links-mobile" : "nav-links"}
             onClick={() => setIsMobile(false)}>
                   <Link to="/create_blog" className='crt_blog'>
                    <li>Create a Blog</li>
                   </Link>
                   <Link to="/" className='home'>
                    <li>Home</li>
                   </Link>
                   <Link to="" className='social'>
                    <li>Social</li>
                   </Link>
                    <li className='logout' onClick={logOut}>Logout</li>
             </ul>
             <button className='mobile-menu-icon'
             onClick={() => setIsMobile(!isMobile)}>
                    {isMobile? 
                    (<FaTimes />):
                    (<IoMdMenu />)
                    }
             </button>
        </nav>
    ); 
}

 