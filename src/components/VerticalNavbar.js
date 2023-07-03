import { BsGraphUp, BsPaperclip,  } from "react-icons/bs";
import {BiLogOut} from "react-icons/bi";
import {IoIosPaper} from "react-icons/io";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useUser } from "../context/UserContext";
const VerticalNavbar = () => {
  const {setAuth} = useUser();
  const navigate = useNavigate();

  const handleLogout = async() => {
    axios.defaults.withCredentials = true;

    try {
      const {data} = await axios.get(process.env.REACT_APP_AUTH_LOGOUT);
      console.log("data: ", data);
   
      setAuth(data.auth);
      navigate("/");
    } catch (error) {
      if(error) throw error;
    }
  }

  const navItemStyle = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#14C38E",
    color: "#483838",
    fontSize: "1rem",
    borderRadius: "50%",
    margin: "0 auto",
    width: "50px",
    height: "50px",
    cursor: "pointer",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
  };

  const navItemLabel = {
    position: "absolute",
    top: "55px",
    fontSize: "0.8rem",
    textAlign: "center"
  }

  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "#00FFAB",
        height: "100%",
        width: "100px",
        position: "fixed",
        marginRight: "100px",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        textTransform: "uppercase"
      }}
    >
      <div style={navItemStyle} onClick={()=>navigate("/dashboard")}>
        <BsGraphUp color="white"/>
        <div style={navItemLabel}>Dashboard</div>
      </div>
      <div style={navItemStyle} onClick={()=> navigate("/warrant")}>
        <IoIosPaper color="white" style={{fontSize: "1.3rem"}}/>
        <div style={navItemLabel}>Novi nalog</div>
      </div>
      <div style={navItemStyle} onClick={()=>navigate("/my-warrants")}>
        <BsPaperclip color="white" style={{fontSize: "1.5rem"}}/>
        <div style={navItemLabel}>Nalozi</div>
      </div>
      <div style={navItemStyle} onClick={()=>handleLogout()}>
        <BiLogOut color="white" style={{fontSize: "1.5rem"}}/>
        <div style={navItemLabel}>Logout</div>
      </div>
    </nav>
  );
};

export default VerticalNavbar;
