import { useEffect, useState } from "react";
import "./home.css";
import Navbar from "./nav";
import axios from "axios";
import Userdata from "./userdata";

axios.defaults.baseURL = "http://localhost:4500/";

export default function Homeuser() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function serverCall() {
      const response = await axios.get("user/userdata");
      setUser(response.data.user);
      console.log(response.data.user);
    }
    serverCall();
  }, []);

  return (
    <>
      <Navbar />
      <div className="all_blogs">
        {user.map((item, index) => (
          <div key={index}>
            <Userdata username={item.username} email={item.email} />
          </div>
        ))}
      </div>
    </>
  );
}
