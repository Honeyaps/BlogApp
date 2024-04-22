import { BrowserRouter, Routes,Route }from 'react-router-dom';
import Home from './component/home';
import SignupForm from './User/signup';
import SigninForm from './User/signin';


export default function App(){
    return(
        <BrowserRouter>
        
        <Routes>

            <Route path="/home" element={<Home />}></Route>
            <Route path="/" element={<SignupForm />}></Route>
            <Route path="/signin" element={<SigninForm />}></Route>


        </Routes>
     
        </BrowserRouter>
);
}


