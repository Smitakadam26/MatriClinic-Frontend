import { useState } from "react";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";

export default function Doctorregister() {
    const [state, setState] = useState({});

    const [status, setstatus] = useState("");
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };
    const generatePassword = (length = 12) => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
        let password = "";
        for (let i = 0; i < length; i++) {
            password += chars[Math.floor(Math.random() * chars.length)];
        }
        return password;
    };
    const handleGenerate = () => {
        setState({...state, password: generatePassword()});
    };
    const handleSubmit = () => {
        console.log(state);
        if (
            state.name &&
            state.nationality &&
            state.dateOfBirth &&
            state.email &&
            state.gender &&
            state.mobileNumber &&
            state.specialization &&
            state.address &&
            state.identity &&
            state.password &&
            state.age &&
            state.yearofExper &&
            state.qualification
        ) {
            fetch("https://matriclinic-website-backend.onrender.com/doctors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(state),
            })
                .then((response) => {
                    console.log(response);
                    setState({});
                    setstatus("Doctor Successfully Registered")
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
    return (
        <div>
            {status === "Doctor Successfully Registered" && (
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
                <form className="row g-3 container transperent rounded-2 border">
                    <h1  style={{fontFamily:"Arial"}}>Doctor Registration</h1>
                    <div className="col-md-6"  style={{fontFamily:"Arial"}}>
                        <label className="form-label" placeholder="Name">Name</label>
                        <input type="Name"
                            name='name'
                            className="form-control"
                            placeholder="Enter Full Name"
                            value={state.name}
                            onChange={(e) => { handleChange(e) }} />
                    </div>
                    <div className="col-md-6"  style={{fontFamily:"Arial"}}>
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
                    <div className="col-md-6"  style={{fontFamily:"Arial"}}>
                        <label className="form-label">Date Of Birth</label>
                        <input type="date"
                            name='dateOfBirth'
                            className="form-control"
                            value={state.dateOfBirth}
                            onChange={(e) => { handleChange(e) }}
                            placeholder="mm/dd/yyyy" />
                    </div>
                    <div className="col-md-6"  style={{fontFamily:"Arial"}}>
                        <label className="form-label">Email</label>
                        <input type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={state.email}
                            onChange={(e) => { handleChange(e) }}
                            aria-label="Speciality" />
                    </div>
                    <fieldset className="col md-6"  style={{fontFamily:"Arial"}}>
                        <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
                        <div className="col-sm-10" >
                            <div className="form-check"  style={{fontFamily:"Arial"}}>
                                <input className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    value="F"
                                    checked={state.gender === "F"}
                                    onChange={(e) => { handleChange(e) }}
                                />
                                <label className="form-check-label" >
                                    Female
                                </label>
                            </div>
                            <div className="form-check"  style={{fontFamily:"Arial"}}>
                                <input className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    value="M"
                                    checked={state.gender === "M"}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label">
                                    Male
                                </label>
                            </div>
                        </div>
                    </fieldset>
                    <div className="col-md-6"  style={{fontFamily:"Arial"}}>
                        <label className="form-label" placeholder="Name">Mobile number</label>
                        <input type='number'
                            className="form-control"
                            name='mobileNumber'
                            placeholder="Mobile number"
                            value={state.mobileNumber}
                            onChange={(e) => { handleChange(e) }}
                        />
                    </div>
                    <div className="col-md-6"  style={{fontFamily:"Arial"}}>
                        <label className="form-label">Age</label>
                        <input type="number"
                            name="age"
                            className="form-control"
                            placeholder="Enter Age"
                            value={state.age}
                            onChange={(e) => { handleChange(e) }}
                            aria-label="Speciality" />
                    </div>
                    <div className="col-md-6"  style={{fontFamily:"Arial"}}>
                        <label className="form-label">Nationality</label>
                        <input type="text"
                            name="nationality"
                            className="form-control"
                            placeholder="Enter nationality"
                            value={state.nationality}
                            onChange={(e) => { handleChange(e) }}
                            aria-label="Speciality" />
                    </div>
                    <div className="col-md-6"  style={{fontFamily:"Arial"}}>
                        <label className="form-label">Identification Number</label>
                        <input type="text"
                            name="identity"
                            className="form-control"
                            placeholder="Enter Identification Number (Aadhar Number)"
                            value={state.identity}
                            onChange={(e) => { handleChange(e) }}
                            aria-label="Speciality" />
                    </div>
                    <div className="col-md-6"  style={{fontFamily:"Arial"}}>
                        <label className="form-label">Address</label>
                        <input type="text"
                            name="address"
                            className="form-control"
                            placeholder="Enter Address"
                            value={state.address}
                            onChange={(e) => { handleChange(e) }}
                            aria-label="Speciality" />
                    </div>
                    <div className="col-md-6"  style={{fontFamily:"Arial"}}>
                        <label className="form-label">Degree/Qualification</label>
                        <input type="text"
                            name="qualification"
                            className="form-control"
                            placeholder="Enter Qualification"
                            value={state.qualification}
                            onChange={(e) => { handleChange(e) }}
                            aria-label="Speciality" />
                    </div>
                    <div className="col-md-6"  style={{fontFamily:"Arial"}}>
                        <label className="form-label">Specialization</label>
                        <input type="text"
                            name="specialization"
                            className="form-control"
                            placeholder="Enter Specialization"
                            value={state.specialization}
                            onChange={(e) => { handleChange(e) }}
                            aria-label="Speciality" />
                    </div>
                    <div className="col-md-6"  style={{fontFamily:"Arial"}}>
                        <label className="form-label">Years Of Experience</label>
                        <input type="number"
                            name="yearofExper"
                            className="form-control"
                            placeholder="Enter Years Of Experience"
                            value={state.yearofExper}
                            onChange={(e) => { handleChange(e) }}
                            aria-label="Speciality" />
                    </div>

                    <div className="d-grid gap-2 col-7 mx-auto mb-3" >
                        <Button className="text-white bg-secondary" onClick={() => { handleSubmit() }}  style={{fontFamily:"Arial"}}>Register</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
