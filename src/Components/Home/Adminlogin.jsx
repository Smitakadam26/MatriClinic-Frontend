import "./Home.css";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import "./Home.css";
import { Link, Outlet } from "react-router-dom";
import logo from '../assets/logo.png'
import wallpaper from '../assets/wallpaper.png'


export default function Adminlogin() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, seterror] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("https://matri-clinic-backend-tau.vercel.app/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        })
        if (res.status === 200) {
            const data = await res.json();
            const { token } = data;
            localStorage.setItem("token", token);
            navigate(`/Admin/${data.admin.id}`, { replace: true });
        }
        else if (res.status === 401) {
            seterror("Incorrect password");
        } else {
            seterror("User not found");
        }
    };
    return (
        <div>
            <h1 className="heading mx-5">
                <div className="d-flex flex-wrap justify-content-between">
                    <div>
                        <img src={logo} alt="logo" style={{ width: "40vh" }} />
                    </div>
                    <div className="gap-1 mt-3">

                        <Button>
                            <Link to="/Patientlogin" className="text-secondary text-decoration-none m-2">
                                Patient
                            </Link>
                            <Outlet />
                        </Button>
                        <Button>
                            <Link to="/Adminlogin" className="text-secondary text-decoration-none m-2">
                                Admin
                            </Link>
                            <Outlet />
                        </Button>
                    </div>
                </div>

            </h1>
            <div style={{
                backgroundImage: `url(${wallpaper})`,
                height: "84vh",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                fontFamily: "Arial"
            }} className="d-flex justify-content-center align-items-center">
                <div className="bg-white text-center p-4 rounded login">
                    <h1 className="mx-auto text-center">Login As Admin</h1>
                    <div className="d-grid gap-2 mx-auto justify-content-center mt-5">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-1 mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-2 mt-4">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    placeholder="Enter Password"
                                />
                            </div>
                            {error && (
                                <Alert severity="error" style={{ marginTop: "10px" }}>
                                    {error}
                                </Alert>
                            )}

                            <Button type="submit" className="bg-secondary text-white col-12 mb-3 mt-4">
                                Login
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
