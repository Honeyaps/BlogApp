import { useLocation } from "react-router-dom";
import Navbar from "./nav";


export default function ViewBlog() {
    const location = useLocation();
    const product = location.state?.product

    return(<>
    <Navbar/>
    <div>
        <h1>{product.title}</h1>
        <img src={product.image} height={600} width={500}/>
        <p>{product.description}</p>
    </div>
    </>);
}