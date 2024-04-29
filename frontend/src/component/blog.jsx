import { useNavigate } from "react-router-dom";
import "./create_blog.css";
import { LuDot } from "react-icons/lu";

export default function Blog({ title, description, image, date, userName }) {
  const navigate = useNavigate();

  const dateTime = date.toString();
  const dates = dateTime.slice(0, 10);
  function handleClick() {
    navigate("/view", {
      state: { product: { title, description, image, dates, userName } },
    });
  }
  return (
    <div className="latest_blog" onClick={handleClick}>
      <div className="blogs">
        <h2 className="avtar_blog">{userName}</h2>
        <p className="datenow">
          <LuDot />
          {dates}
        </p>
        <h2>{title}</h2>
        <p className="desc_sec">{description?.slice(0, 100) + "..."}</p>
      </div>
    </div>
  );
}
