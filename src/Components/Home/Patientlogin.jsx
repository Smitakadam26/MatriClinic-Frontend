import "./Home.css";
import { Button, Box, AppBar, Toolbar, Typography, Alert, FormControl, Select,Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

                {type === "login" && <Box sx={{
                    backgroundColor: "white",
                    textAlign: "center",
                    padding: 4,
                    boxSizing: 'border-box'
                }}>
                    <Box sx={{ marginTop: 3 }} >
                        <Typography varient="h1" component="h1" sx={{ textAlign: "center", fontSize: "6vh" }}>Login As Patient</Typography>

                        <Box sx={{
                            display: "grid",
                            gap: 2,
                            justifyContent: "center",
                            marginTop: 3
                        }}>
                            <FormControl onSubmit={handleSubmit}>
                                <Box sx={{ marginBottom: 1, marginTop: 1 }}>
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
                                <Box sx={{ marginBottom: 1, marginTop: 1 }}>
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
                                    <Alert severity="error" style={{ marginTop: "10px" }}>
                                        {error}
                                    </Alert>
                                )}
                                <Button type="submit" sx={{ backgroundColor: "#46505A", marginTop: 4, marginBottom: 3, color: "white" }}>
                                    Login
                                </Button>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <a onClick={() => { settype("signup") }} className="float-center">Register</a>
                                    <a onClick={() => { settype("Forgetpassword") }} className="float-center">Forget password</a>
                                </Box>
                            </FormControl>
                        </Box>
                    </Box>

                </Box>}
                {type === "signup" && <Box sx={{
                    backgroundColor: "white",
                    textAlign: "center",
                    padding: 3,
                    boxSizing: 'border-box'
                }} className="signup">
                    <Box sx={{ marginTop: 1 }}>
                        <Typography varient="h1" component="h1" sx={{ textAlign: "center", fontSize: "6vh" }}>Register As Patient</Typography>
                         <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 1, p: 2 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={credentials.name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    type="password"
                                    label="Password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    type="email"
                                    label="Email"
                                    name="email"
                                    value={credentials.email || ""}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Mobile Number"
                                    name="mobileNumber"
                                    value={credentials.mobileNumber}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Aadhar Number"
                                    name="identity"
                                    value={credentials.identity}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <Select
                                        displayEmpty
                                        value={credentials.doctor}
                                        onChange={(e) => {
                                            const text = e.target.value.split("and");
                                            const name = text[0];
                                            const id = text[1];

                                            setCredentials((prev) => ({
                                                ...prev,
                                                doctor: name,
                                                Doctorid: id,
                                                date: null,
                                                time: null
                                            }));
                                            setdoctor(id);
                                            setslots([]);
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>Click To Choose</em>
                                        </MenuItem>
                                        {doctors.map((doctor) => (
                                            <MenuItem
                                                key={doctor._id}
                                                value={`${doctor.name}and${doctor._id}`}
                                            >
                                                {doctor.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    label="Appointment Date"
                                    InputLabelProps={{ shrink: true }}
                                    value={credentials.date || ""}
                                    onChange={handledate}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Selected Time"
                                    value={credentials.time || ""}
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography sx={{ mb: 1 }}>Slots:</Typography>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                    {slots.map((time) => (
                                        <Button
                                            key={time}
                                            variant="outlined"
                                            onClick={() =>
                                                setCredentials({ ...credentials, time })
                                            }
                                        >
                                            {time}
                                        </Button>
                                    ))}
                                </Box>
                            </Grid>

                            {error && (
                                <Grid item xs={12}>
                                    <Alert severity="error">{error}</Alert>
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                >
                                    Signup
                                </Button>
                            </Grid>
                            <Grid item xs={12} textAlign="center">
                                <Button
                                    variant="text"
                                    onClick={() => settype("login")}
                                >
                                    Login
                                </Button>
                            </Grid>

                        </Grid>
                    </Box>
                    </Box>
                   </Box>
                    }
                    {
                        type === "Forgetpassword" && (
                            <Box
                                sx={{
                                    backgroundColor: "white",
                                    textAlign: "center",
                                    p: 3,
                                    borderRadius: 2,
                                    maxWidth: 400,
                                    mx: "auto",
                                }}
                            >
                                <Typography variant="h4" sx={{ mt: 3 }}>
                                    Forget Password
                                </Typography>

                                <Box
                                    component="form"
                                    onSubmit={handleSubmit}
                                    sx={{ mt: 3 }}
                                >
                                    <TextField
                                        fullWidth
                                        type="email"
                                        label="Email"
                                        placeholder="Enter Email"
                                        name="email"
                                        value={email.email || ""}
                                        onChange={(e) => {
                                            setemail({ ...email, [e.target.name]: e.target.value });
                                            seterror();
                                        }}
                                        sx={{ mb: 2 }}
                                    />

                                    {error && (
                                        <Alert severity="error" sx={{ mb: 2 }}>
                                            {error}
                                        </Alert>
                                    )}

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        sx={{ mt: 2, mb: 2 }}
                                    >
                                        Submit
                                    </Button>

                                    <Button
                                        variant="text"
                                        onClick={() => settype("login")}
                                    >
                                        Login
                                    </Button>
                                </Box>
                            </Box>
                        )
                    }
                </Box>
        </div >
    );
}
