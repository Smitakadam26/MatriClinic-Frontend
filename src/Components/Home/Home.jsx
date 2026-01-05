import "./Home.css";
import { Link, Outlet } from "react-router-dom";
import { Button, Typography, AppBar, Toolbar, Box} from "@mui/material";
import logo from '../assets/logo.png'
import wallpaper from '../assets/wallpaper.png'
export default function Home() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "white", height: 115 }}>
          <Toolbar sx={{
            alignItems: "center", height: "100%"
          }}>
            <Box component="img"
              src={logo}
              alt="Logo"
              sx={{ height: 100, marginRight: 2 }}
            />
            <Box sx={{ flexGrow: 1 }} />
            <Button>
              <Link to="/Patientlogin" className="text-secondary text-decoration-none m-2" style={{ fontFamily: "Arial" }}>
                Patient
              </Link>
              <Outlet />
            </Button>
            <Button>
              <Link to="/Adminlogin" className="text-secondary text-decoration-none m-2" style={{ fontFamily: "Arial" }}>
                Admin
              </Link>
              <Outlet />
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Box
        sx={{
          backgroundImage: `url(${wallpaper})`,
          height: "84vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h4"
          component="h4"
          sx={{ fontFamily: "Arial", height: 100, marginRight: 3, color: "#46505A", padding: 2 }}>
          Happy Maternity
        </Typography>
        <Typography variant="h3"
          component="h3"
          sx={{ fontSize: "10vh", marginTop: "20vh", fontFamily: "Arial" }}
          className="p-3 w-100 typing">
          <span>Welcome to matriClinic,<br />we are at the heart of appropriate care</span>
        </Typography>

      </Box>
    </>
  );
}
