import { useEffect } from "react";
import { useState } from "react"
import { useParams } from "react-router-dom";
import { Button } from "@mui/material"
import logo from '../assets/logo.png'
import wallpaper from '../assets/wallpaper.png'
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Alert from "@mui/material/Alert";

export default function Forgetpassword() {
    const { id, token } = useParams();
    const [credentials, setCredentials] = useState({});
    const [open, setOpen] = useState(false);
    const handleSubmit = () => {
        console.log(credentials);
    }
    useEffect(() => {
        console.log(id, token)
    }, [])
    const handleReset = async () => {
        console.log(credentials);
        const res = await fetch(`http://localhost:8080/patients/resetpassword/${id}/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        })
        if (res.status === 200) {
            const data = await res.json(); // parse JSON
            console.log("Backend response:", data);
            setOpen(true);
        }
    }
    return (
        <div>
            <div>
                <h1 className="d-flex justify-content-between heading mx-5">
                    <img src={logo} alt="logo" style={{ width: "40vh" }} />
                </h1>

                <div style={{
                    backgroundImage: `url(${wallpaper})`,
                    height: "84vh",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    fontFamily: "Arial"
                }} className="d-flex justify-content-center align-items-center">


                    <div className="bg-white w-25 text-center p-4 rounded">
                        <Collapse in={open}>
                            <Alert icon={false} severity="success">
                                Password Updated
                            </Alert>
                        </Collapse>
                        <h1 className="mx-auto text-center">Reset Password</h1>
                        <div className="d-grid gap-2 mx-auto justify-content-center mt-2">
                            <form onSubmit={handleSubmit} className="p-3">
                                <div className="mb-2 mt-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        name="email"
                                        value={credentials.email || " "}
                                        onChange={(e) => { setCredentials({ ...credentials, [e.target.name]: e.target.value }) }}
                                    />
                                </div>
                                <div className="mb-2 mt-3">
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={credentials.password}
                                        onChange={(e) => { setCredentials({ ...credentials, [e.target.name]: e.target.value }) }}
                                        placeholder="Enter New Password"
                                    />
                                </div>

                                <div className="mb-2 mt-3">
                                    <Button onClick={() => { handleReset() }} className="bg-secondary text-white">
                                        Reset
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}