import { BrowserRouter, Routes,Route }from 'react-router-dom';
import Home from './component/home';
import SignupForm from './User/signup';
import SigninForm from './User/signin';
import Crt_blg from './component/create_blog';
import ViewBlog from './component/View';
import Email from './Forgot/email';
import Reset from './Forgot/resetpass';
import Otp from './Forgot/otp';
import Userdata from './component/userdata';


export default function App(){
    return(
        <BrowserRouter>
        
        <Routes>

            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<SignupForm />}></Route>
            <Route path="/signin" element={<SigninForm />}></Route>
            <Route path="/create_blog" element={<Crt_blg />}></Route>
            <Route path="/view" element={<ViewBlog />}></Route>
            <Route path="/email" element={<Email />}></Route>
            <Route path="/otp" element={<Otp />}></Route>
            <Route path="/reset" element={<Reset />}></Route>
            <Route path="/userdata" element={<Userdata />}></Route>


        </Routes>
     
        </BrowserRouter>
);
}


