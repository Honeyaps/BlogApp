import { BrowserRouter, Routes,Route }from 'react-router-dom';
import Home from './component/home';
import SignupForm from './User/signup';
import SigninForm from './User/signin';
import Crt_blg from './component/create_blog';
import ViewBlog from './component/View';


export default function App(){
    return(
        <BrowserRouter>
        
        <Routes>

            <Route path="/home" element={<Home />}></Route>
            <Route path="/" element={<SignupForm />}></Route>
            <Route path="/signin" element={<SigninForm />}></Route>
            <Route path="/create_blog" element={<Crt_blg />}></Route>
            <Route path="/view" element={<ViewBlog />}></Route>


        </Routes>
     
        </BrowserRouter>
);
}


