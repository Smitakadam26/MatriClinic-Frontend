import "./Home.css";
import { Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";

import { Typography,Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import "./Home.css";
import wallpaper from '../assets/images/wallpaper.png'
import Header from "../Components/Header";


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
        <>
            <Header/>
            <Box
                sx={{
                    backgroundImage: `url(${wallpaper})`,
                    height: "84vh",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    textAlign: "center",
                    fontFamily: "Arial",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Box sx={{
                    backgroundColor: "white",
                    textAlign: "center",
                    padding: 4,
                    boxSizing: 'border-box'
                }}>
                    <Typography varient="h1" component="h1" sx={{ textAlign: "center", fontSize: "6vh" }}>Login As Admin</Typography>
                    <Box sx={{
                        display: "grid",
                        gap: 2,
                        justifyContent: "center",
                        marginTop: 5
                    }}>
                        <form onSubmit={handleSubmit}>
                            <FormControl fullWidth>
                                <Box sx={{ marginBottom: 1, marginTop: 3 }}>
                                    <TextField
                                        type="text"
                                        placeholder="Enter Email"
                                        name="email"
                                        value={credentials.email}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Box>

                                <Box sx={{ marginBottom: 1, marginTop: 3 }}>
                                    <TextField
                                        type="password"
                                        placeholder="Enter Password"
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Box>

                                {error && (
                                    <Alert severity="error" sx={{ mt: 2 }}>
                                        {error}
                                    </Alert>
                                )}

                                <Button
                                    type="submit"
                                    sx={{
                                        backgroundColor: "#46505A",
                                        marginTop: 4,
                                        marginBottom: 3,
                                        color: "white"
                                    }}
                                >
                                    Login
                                </Button>
                            </FormControl>
                        </form>

                    </Box>
                </Box>
            </Box>
        </>
    );
}
