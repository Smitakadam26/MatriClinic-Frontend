import "./Home.css";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from "react";
import "./Home.css";
import { Link, Outlet } from "react-router-dom";
import logo from '../assets/logo.png'
import wallpaper from '../assets/wallpaper.png'
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

export default function Home() {
    const [credentials, setCredentials] = useState({});
    const [type, settype] = useState("login");
    const [email, setemail] = useState({});
    const [doctor, setdoctor] = useState();
    const [doctors, setdoctors] = useState();
    const [error, seterror] = useState("");
    const [open, setOpen] = useState(false);
    const [slots, setslots] = useState([]);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
        setCredentials((prev) => ({
            ...prev,
            ["date"]: null,
            ["time"]: null
        }))
        setslots([]);
    };
    const getdoctors = async () => {
        try {
            let result = await fetch("http://localhost:8080/doctors");
            result = await result.json();
            setdoctors(result);
        } catch (error) {
            if (!error.response) {
                console.error("Network error:", error);
            } else {
                console.error("Error response:", error.response);
            }
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(credentials)
        if (type === "login") {
            const res = await fetch("http://localhost:8080/patients/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            })
            if (res.status === 200) {
                const data = await res.json(); // parse JSON
                console.log("Backend response:", data);
                const { token } = data;
                localStorage.setItem("token", token);
                navigate(`/Patient/${data.patient.id}`, { replace: true });
            }
            else if (res.status === 401) {
                seterror('Incorrect password');
            }
            else {
                seterror("User not found")
            }
        }
        else if (type === "Forgetpassword") {
            console.log(email)
            const res = await fetch("http://localhost:8080/patients/forgetpassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(email),
            })
            if (res.status === 200) {
                const data = await res.json(); // parse JSON
                console.log("Backend response:", data);
                setOpen(true);
            }
            if (res.status === 404) {
                const data = await res.json(); // parse JSON
                console.log("Backend response:", data);
                seterror("User not Found")
            }
        }
        else {
            if (
                credentials.name &&
                credentials.email &&
                credentials.mobileNumber &&
                credentials.doctor &&
                credentials.password &&
                credentials.identity &&
                credentials.Doctorid &&
                credentials.date &&
                credentials.time
            ) {
                const res = await fetch("http://localhost:8080/patients", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentials),
                })
                if (res.status === 200) {
                    const data = await res.json(); // parse JSON
                    console.log("Backend response:", data);
                    const { token } = data;
                    localStorage.setItem("token", token);
                    const formData = new FormData();
                    formData.append("name", credentials.name);
                    formData.append("mobileNumber", credentials.mobileNumber);
                    formData.append("date", credentials.date);
                    formData.append("time", credentials.time);
                    formData.append("Patient_Id", data.patient.id);
                    formData.append("doctor", credentials.doctor);
                    formData.append("Doctorid", credentials.Doctorid);
                    formData.append("identity", credentials.identity);
                    formData.append("isvisited", false);
                    try {
                        const res = await fetch('http://localhost:8080/Appointments', {
                            method: 'POST',
                            body: formData,
                        });
                        await res.json();
                        navigate(`/`, { replace: true });
                        setCredentials({});
                    } catch (err) {
                        console.error(err);
                        alert('Error uploading file');
                    }

                }
            } else {
                alert("Please fill all details");
            }
        }
    };
    const fetchAvailability = async (date, Doctorid) => {
        console.log(date, Doctorid)
        try {
            const res = await fetch(`http://localhost:8080/Appointments/availability?date=${date}&&Doctorid=${Doctorid}`);
            const data = await res.json();
            setslots(data.availableSlots)
        }
        catch (err) {
            console.error("Error", err)
        }
    }
    const handledate = (e) => {
        if (!doctor) {
            alert("Patient is not selected")
        }
        else {
            console.log(e.target.name, e.target.value, doctor)
            fetchAvailability(e.target.value, doctor)
            setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value, "time": " " }))
        }
    }
    useEffect(() => {
        getdoctors()
    }, [])
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
             <Collapse in={open}>
                <Alert size="small"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                                navigate(-1);
                            }}
                        >
                            Ok
                        </IconButton>
                    }
                    sx={{ mb: 2, mx: 5 }}
                >
                    Reset Password link send to the email
                </Alert>
            </Collapse>
            <div style={{
                backgroundImage: `url(${wallpaper})`,
                height: "84vh",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                fontFamily: "Arial"
            }} className="d-flex justify-content-center align-items-center">
                
                {type === "login" && <div className="bg-white text-center p-3 rounded login">
                    <div className="mt-3">
                        <h1 className="mx-auto text-centermt-5">Login As Patient</h1>
                        <div className="d-grid gap-2 mx-auto justify-content-center mt-3">
                            <form onSubmit={handleSubmit}>
                                {type === "login" && <div className="mb-2 mt-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        name="email"
                                        value={credentials.email || " "}
                                        onChange={handleChange}
                                    />
                                </div>}
                                {type === "login" && <div className="mb-2 mt-3">
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        placeholder="Enter Password"
                                    />
                                </div>}
                                {error && (
                                    <Alert severity="error" style={{ marginTop: "10px" }}>
                                        {error}
                                    </Alert>
                                )}
                                {type === "login" && <Button type="submit" className="bg-secondary text-white col-12 mb-3 mt-4">
                                    Login
                                </Button>}
                                <div className="d-flex justify-content-between">
                                    {type === "login" && <a onClick={() => { settype("signup") }} className="float-center">Register</a>}
                                    {type === "login" && <a onClick={() => { settype("Forgetpassword") }} className="float-center">Forget password</a>}
                                </div>
                            </form>

                        </div>
                    </div>

                </div>}
                {type === "signup" && <div className="bg-white p-3 rounded signup">
                    <div className="mt-1">
                        <h1 className="text-center">Register As Patient</h1>
                        <form onSubmit={handleSubmit} className="d-flex mt-1 p-2 row r-3">
                            {type === "signup" && <div className="mt-3 col-md-6">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={credentials.name}
                                    onChange={handleChange}
                                    placeholder="Enter Name"
                                />
                            </div>}
                            {type === "signup" && <div className="mt-3 col-md-6">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    placeholder="Enter Password"
                                />
                            </div>}
                            {type === "signup" && <div className="mt-3 col-md-6">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    name="email"
                                    value={credentials.email || " "}
                                    onChange={handleChange}
                                />
                            </div>}
                            {type === "signup" && <div className="mt-3 col-md-6">
                                <input
                                    type="number"
                                    name="mobileNumber"
                                    className="form-control"
                                    value={credentials.mobileNumber}
                                    onChange={handleChange}
                                    placeholder="Enter Mobile Number"
                                />
                            </div>}
                            {type === "signup" && <div className="mt-3 col-md-6">
                                <input
                                    type="number"
                                    name="identity"
                                    className="form-control"
                                    value={credentials.identity}
                                    onChange={handleChange}
                                    placeholder="Enter Aadhar Number"
                                />
                            </div>}
                            {type === "signup" && <div className="mt-3 col-md-6">
                                <FormControl sx={{ minWidth: 250 }} size="small">
                                    <Select
                                        name="doctor"
                                        className="form-control"
                                        value={credentials.doctor}
                                        onChange={(e) => {
                                            const text = e.target.value.split("and");
                                            const name = text[0];
                                            const id = text[1];
                                            console.log(name, id);
                                            setCredentials((prev) => ({ ...prev, ["doctor"]: name, ["Doctorid"]: id, ["date"]: null, ["time"]: null }))
                                            setdoctor(id);
                                            setslots([]);

                                        }}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="">Click To Choose</MenuItem>
                                        {doctors.map((doctor) => (
                                            <MenuItem value={doctor.name + "and" + doctor._id}>{doctor.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>}
                            {type === "signup" && <div className="mt-3 col-md-6">
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Enter Date for appointment"
                                    name="date"
                                    value={credentials.date || " "}
                                    onChange={(e) => { handledate(e) }}
                                />
                            </div>}

                            {type === "signup" && <div className="mt-3 col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="time"
                                    value={credentials.time || " "}
                                    readonly
                                />
                            </div>}
                            {type === "signup" && <div className="mt-3 col-md-6">
                                <label className="form-label w-0 p-2" placeholder="Name">Slots : </label>
                                <span className="d-flex flex-wrap g-2 p-2">
                                    {slots.map((time) => (
                                        <Button onClick={() => { setCredentials({ ...credentials, ["time"]: time }) }}>
                                            {time}
                                        </Button>
                                    ))}
                                </span>
                            </div>}
                            {error && (
                                <Alert severity="error" style={{ marginTop: "10px" }}>
                                    {error}
                                </Alert>
                            )}
                            {type === "signup" && <Button type="submit" className="bg-secondary text-white col-12 mb-3 mt-4">
                                Signup
                            </Button>}
                            {type === "signup" && <a onClick={() => { settype("login") }} className="float-center">Login</a>}
                        </form>

                    </div>
                </div>}
                {type === "Forgetpassword" && <div className="bg-white text-center p-3 rounded login">
                    <div className="mt-3">
                        <h1 className="mx-auto text-centermt-5">Forget Password</h1>
                        <div className="d-grid gap-2 mx-auto justify-content-center mt-3">
                            <form onSubmit={handleSubmit}>
                                {type === "Forgetpassword" && <div className="mb-2 mt-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        name="email"
                                        value={email.email || " "}
                                        onChange={(e) => { setemail({ ...email, [e.target.name]: e.target.value }); seterror() }}
                                    />
                                </div>}
                                {error && (
                                    <Alert severity="error" style={{ marginTop: "10px" }}>
                                        {error}
                                    </Alert>
                                )}
                                {type === "Forgetpassword" && <Button type="submit" className="bg-secondary text-white col-12 mb-3 mt-4">
                                    Submit
                                </Button>}
                                <div className="d-flex justify-content-between">
                                    {type === "Forgetpassword" && <a onClick={() => { settype("login") }} className="float-center">Login</a>}
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    );
}
