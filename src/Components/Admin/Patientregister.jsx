import { useState } from "react";
import { Button } from "@mui/material";
import { useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from "@mui/material/Alert";

export default function Patientregister() {
    const [state, setState] = useState({});
    const [doctors, setdoctors] = useState([]);
    const [status, setstatus] = useState("");
    const [doctor, setdoctor] = useState();
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };
    const generatePassword = (length = 12) => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        let password = "";
        for (let i = 0; i < length; i++) {
            password += chars[Math.floor(Math.random() * chars.length)];
        }
        return password;

    };
    const handleGenerate = () => {
        setState({...state, password: generatePassword()});
    };
    const handleSubmit = (e) => {
        console.log(state);
        if (
            state.name &&
            state.nationality &&
            state.dateOfBirth &&
            state.email &&
            state.mobileNumber &&
            state.matricalStatus &&
            state.doctor &&
            state.address &&
            state.identity &&
            state.password &&
            state.age &&
            state.menstrualstopdate &&
            state.birthdate &&
            state.Doctorid
        ) {
            fetch("https://matri-clinic-backend-tau.vercel.app/patients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(state),
            })
                .then((response) => {
                    console.log(response);
                    setState({});
                    setstatus("Patient Successfully Registered")
                    window.location.reload();

                })
                .catch((err) => {
                    console.log(err);
                    setstatus("Some error")
                });
        } else {
            setstatus("Please fill all details");
        }
    };
    const getdoctors = async () => {
        try {
            let result = await fetch("https://matri-clinic-backend-tau.vercel.app/doctors");
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
    useEffect(() => {
        getdoctors();
    }, [])
    return (
        <div>
            {status === "Patient Successfully Registered" && (
                <Alert severity="success" style={{ marginTop: "10px" }}>
                    {status}
                </Alert>
            )}
            {status === "Please fill all details" && (
                <Alert severity="warning" style={{ marginTop: "10px" }}>
                    {status}
                </Alert>
            )}
            {status === "Some error" && (
                <Alert severity="error" style={{ marginTop: "10px" }}>
                    {status}
                </Alert>
            )}
            <div className='p-4'>
                <form className="row g-3 border rounded-2 transperent container" >
                    <h1 style={{fontFamily:"Arial"}}>Patient Registration</h1>
                    <div className="col-md-6" style={{fontFamily:"Arial"}}>
                        <label className="form-label" placeholder="Name">Name</label>
                        <input type="Name"
                            name='name'
                            className="form-control"
                            placeholder="Enter Full Name"
                            value={state.name}
                            onChange={(e) => { handleChange(e) }} />
                    </div>
                    <div className="col-md-6" style={{fontFamily:"Arial"}}>
                        <label className="form-label">Password</label>

                        <div className="d-flex">
                            <input
                                type="text"
                                name="password"
                                className="form-control"
                                value={state.password}
                                readOnly
                            />
                            <Button type="button" className="p-0" onClick={() => { handleGenerate() }}>🔁</Button>
                        </div>
                    </div>
                    <div className="col-md-6" style={{fontFamily:"Arial"}}>
                        <label className="form-label">Email</label>
                        <input type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={state.email}
                            onChange={(e) => { handleChange(e) }}
                            aria-label="Speciality" />
                    </div>
                    <fieldset className="col md-6" style={{fontFamily:"Arial"}}>
                        <legend className="col-form-label col-sm-2 pt-0 w-100" style={{fontFamily:"Arial"}}>Matrical Status</legend>
                        <div className="col-sm-10">
                            <div className="form-check"  style={{fontFamily:"Arial"}}>
                                <input className="form-check-input"
                                    type="radio"
                                    name="matricalStatus"
                                    value="unMarried"
                                    checked={state.matricalStatus === "unMarried"}
                                    onChange={(e) => { handleChange(e) }}
                                />
                                <label className="form-check-label" >
                                    UnMarried
                                </label>
                            </div>
                            <div className="form-check"  style={{fontFamily:"Arial"}}>
                                <input className="form-check-input"
                                    type="radio"
                                    name="matricalStatus"
                                    value="Married"
                                    checked={state.matricalStatus === "Married"}
                                    onChange={(e) => { handleChange(e) }}
                                />
                                <label className="form-check-label" >
                                    Married
                                </label>
                            </div>
                        </div>
                    </fieldset>
                    <div className="col-md-6" style={{fontFamily:"Arial"}}>
                        <label className="form-label">Date Of Birth</label>
                        <input type="date"
                            name='dateOfBirth'
                            className="form-control"
                            value={state.dateOfBirth}
                            onChange={(e) => { handleChange(e) }}
                            placeholder="mm/dd/yyyy" />
                    </div>
                    <div className="col-md-6" style={{fontFamily:"Arial"}}>
                        <label className="form-label" placeholder="Name">Mobile number</label>
                        <input type='number'
                            className="form-control"
                            name='mobileNumber'
                            placeholder="Mobile number"
                            value={state.mobileNumber}
                            onChange={(e) => { handleChange(e) }}
                        />
                    </div>
                    <div className="col-md-6" style={{fontFamily:"Arial"}}>
                        <label className="form-label">Age</label>
                        <input type="number"
                            name="age"
                            className="form-control"
                            placeholder="Enter Age"
                            value={state.age}
                            onChange={(e) => { handleChange(e) }}
                            aria-label="Speciality" />
                    </div>
                    <div className="col-md-6" style={{fontFamily:"Arial"}}>
                        <label className="form-label">Blood group : </label>
                        <input type="text"
                            name="bloodgroup"
                            className="form-control"
                            placeholder="Enter Blood group :"
                            value={state.bloodgroup}
                            onChange={(e) => { handleChange(e) }}
                            aria-label="Speciality" />
                    </div>
                    <div className="col-md-6" style={{fontFamily:"Arial"}}>
                        <label className="form-label">Menstrual stop date: </label>
                        <input type="date"
                            name="menstrualstopdate"
                            className="form-control"
                            placeholder="Enter Menstrual stop date"
                            value={state.menstrualstopdate}
                            onChange={(e) => { handleChange(e) }}
                            aria-label="Speciality" />
                    </div>
                    <div className="col-md-6" style={{fontFamily:"Arial"}}>
                        <label className="form-label">Expected Birth Date: </label>
                        <input type="date"
                            name="birthdate"
                            className="form-control"
                            placeholder="Enter Birth Date"
                            value={state.birthdate}
                            onChange={(e) => { handleChange(e) }}
                            aria-label="Speciality" />
                    </div>
                    <div className="col-md-6" style={{fontFamily:"Arial"}}>
                        <label className="form-label">Nationality</label>
                        <input type="text"
                            name="nationality"
                            className="form-control"
                            placeholder="Enter nationality"
                            value={state.nationality}
                            onChange={(e) => { handleChange(e) }}
                            aria-label="Speciality" />
                    </div>
                    <div className="col-md-6" style={{fontFamily:"Arial"}}>
                        <label className="form-label">Identification Number</label>
                        <input type="number"
                            name="identity"
                            className="form-control"
                            placeholder="Enter Identification Number (Aadhar Number)"
                            value={state.identity}
                            onChange={(e) => { handleChange(e) }}
                            aria-label="Speciality" />
                    </div>
                    <div className="col-md-6" style={{fontFamily:"Arial"}}>
                        <label className="form-label">Address</label>
                        <input type="text"
                            name="address"
                            className="form-control"
                            placeholder="Enter Address"
                            value={state.address}
                            onChange={(e) => { handleChange(e) }}
                            aria-label="Speciality" />
                    </div>
                    <div className="col-md-6" style={{fontFamily:"Arial"}}>
                        <label className="form-labe" placeholder="Name">Consulting Doctor : </label>
                        <FormControl sx={{ minWidth: 250 }} size="small">
                            <Select
                                name="doctor"
                                className="form-control"
                                value={doctor}
                                onChange={(e) => {const text = e.target.value.split("and");
                                                    const name = text[0];
                                                    const id = text[1];
                                                    console.log(name,id);
                                                    setState((prev)=>({...prev,["doctor"]:name,["Doctorid"]:id}))
                                                    setdoctor(name)
                                 }} 
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="">Click To Choose</MenuItem>
                                {doctors.map((doctor) => (
                                    <MenuItem value={doctor.name+ "and" + doctor._id}>{doctor.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    
                    <div className="d-grid gap-2 col-7 mx-auto mb-3">
                        <Button className="text-white bg-secondary" onClick={() => { handleSubmit() }}  style={{fontFamily:"Arial"}}>Register</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}