import { useNavigate } from "react-router-dom";
import "./create_blog.css";

export default function Blog({ title, description, image, date, author }) {
  const navigate = useNavigate();

  const dateTime = date.toString();
  const dates = dateTime.slice(0, 10);
  function handleClick() {
    navigate("/view", {
      state: { product: { title, description, image, dates, author } },
    });
  }
  return (
    <div className="latest_blog" onClick={handleClick}>
      <div className="blogs">
        <div className="datenow">
          <h1 className="blog_avtar">{author?.slice(0, 1)}</h1>
          <p className="desc_sec">{dates}</p>
        </div>
        <h2 className="blog_title">{title}</h2>
        <p className="desc_sec">{description?.slice(0, 180) + "..."}</p>
      </div>
    </div>
  );
}
