import { useNavigate } from "react-router-dom";
import "./create_blog.css";

export default function Blog ({title,description, image}) {
    const navigate = useNavigate();
    function handleClick(){
        navigate("/view", {state: {product: {title,description, image}}})
    }

    return(
        <div className="latest_blog" onClick={handleClick}>
            <div className="blogs">
            <h2>{title}</h2>
            <p>{description.slice(0,100) + "..."}</p>
          </div>
        </div>
    );
}