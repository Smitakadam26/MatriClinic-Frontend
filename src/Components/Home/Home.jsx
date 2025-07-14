import "./Home.css";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@mui/material";
import logo from '../assets/logo.png'
import wallpaper from '../assets/homewallpaper.jpg'
export default function Home() {
  return (
    <div
    >
      <h1 className="d-flex justify-content-between heading mx-5">
        <img src={logo} alt="logo" style={{width:"40vh"}} />
        <div className="gap-1 mt-3">
          <Button>
            <Link to="/Patientlogin" className="text-secondary text-decoration-none m-2"  style={{fontFamily:"Arial"}}>
              Patient
            </Link>
            <Outlet />
          </Button>
          <Button>
            <Link to="/Adminlogin" className="text-secondary text-decoration-none m-2"  style={{fontFamily:"Arial"}}>
              Admin
            </Link>
            <Outlet />
          </Button>
        </div>
      </h1>
      <div style={{backgroundImage:`url(${wallpaper})` ,height:"84vh" , backgroundRepeat:"no-repeat", backgroundSize:"cover",backgroundPosition: "center"}} className="text-center">
          <h3 className="text-secondary p-3 h3animation"  style={{fontFamily:"Arial"}}>Happy Maternity</h3>
          <h3 className="p-3 w-100 typing" style={{fontSize:"10vh", marginTop:"20vh", fontFamily:"Arial" }}><span>Welcome to matriClinic,<br/>we are at the heart of appropriate care</span></h3>
      </div>
    </div>
  );
}
