import { Box,AppBar,Toolbar,Button } from "@mui/material";
import { Link,Outlet } from "react-router-dom";
import logo from "../assets/images/logo.png";

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "white", height: 115 }}>
                <Toolbar sx={{
                    alignItems: "center", height: "100%",display:{xs:'inline',sm:'flex'}
                }}>
                    <Box component="img"
                        src={logo}
                        alt="Logo"
                        sx={{ height: {xs:80,sm:100}, marginRight: 2 }}
                    />
                    <Box sx={{ flexGrow: 1 }} />
                    <Box display='flex'>
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
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}