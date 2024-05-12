import { useLocation } from "react-router-dom";
import Navbar from "./nav";
import "./create_blog.css";

export default function ViewBlog() {
  const location = useLocation();
  const product = location.state?.product;

  return (
    <>
      <Navbar />
      <center>
        <div className="viewpage_contnr">
          <br />
          <div className="view_header">
          <h1 className="view_title">{product.title}</h1>
          <p className="view_date">{product.dates}</p>
          
          </div>

          <br></br>
          <img src={product.image} className="img_prod" />
          <br></br>
          <br></br>
          <p className="decription_sec_inner">{product.description}</p>
        </div>
      </center>
    </>
  );
}
