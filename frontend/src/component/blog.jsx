import { useNavigate } from "react-router-dom";
import "./create_blog.css";
import { LuDot } from "react-icons/lu";

export default function Blog ({title,description, image,date}) {
    const navigate = useNavigate();
    
    function handleClick(){
        if(!localStorage.getItem("token")){
            navigate("/signup")
          }
          else{
        navigate("/view", {state: {product: {title,description, image,date}}})}
    }
    const dateTime = date.toString()
    const dates = dateTime.slice(0,10)
    return(
        <div className="latest_blog" onClick={handleClick}>
            <div className="blogs">
            <p className="datenow"><LuDot />{dates}</p>
            <h2>{title}</h2>
            <p className="desc_sec">{description?.slice(0,100) + "..."}</p>
          </div>
        </div>
    );
}
