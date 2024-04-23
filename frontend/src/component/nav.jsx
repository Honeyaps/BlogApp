import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import { useState } from 'react';
import { IoMdMenu } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { FaBlog } from "react-icons/fa";


export default function Navbar () {

    const[isMobile,setIsMobile] = useState(false);

    return(
        <nav className='navbar'>
             <h3 className='logo'>BLOGGER - <FaBlog /></h3>
             <ul className={isMobile? "nav-links-mobile" : "nav-links"}
             onClick={() => setIsMobile(false)}>
                   <Link to="/create_blog" className='crt_blog'>
                    <li>Create a Blog</li>
                   </Link>
                   <Link to="/home" className='home'>
                    <li>Home</li>
                   </Link>
                   <Link to="" className='social'>
                    <li>Social</li>
                   </Link>
                   {/* <Link to="/signin" className='signin'>
                    <li>Signin</li>
                   </Link>
                   <Link to="/signup" className='signup'>
                    <li><IoPersonOutline /></li>
                   </Link> */}
                   <Link to="/" className='logout'>
                    <li>Logout</li>
                   </Link>
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

 