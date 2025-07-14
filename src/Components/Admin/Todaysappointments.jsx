import { useEffect, useState } from "react";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton
} from "@mui/material";
import { useParams } from "react-router-dom";
import Appointments from "./Appointments";
import Slide from '@mui/material/Slide';
import wallpaper from '../assets/wallpaper.png'
import CloseIcon from '@mui/icons-material/Close';
import React
    from "react";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(1)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '16ch',
            },
        },
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Todaysappointments() {
    const { id } = useParams();
    const [slots, setslots] = useState([]);
    const [todaysAppointments, settodaysappointments] = useState([]);
    const [appointments, setappointments] = useState([]);
    const [open, setOpen] = useState(false);
    const [editappointmentopen, seteditappointmentopen] = useState(false);
    const [editappointment, seteditappointment] = useState(false);
    const [bookappointment, setbookappointment] = useState(false);
    const [patient_Id, setPatientId] = useState();
    const [appointmentID, setappointmentID] = useState();
    const [appointment, setappointment] = useState({});
    const [currentdate, setcurrentdate] = useState();
    const [patients, setpatients] = useState([]);
    const [searchVal, setsearchVal] = useState();
    const getusers = async () => {
        try {
            let result = await fetch("http://localhost:8080/patients");
            result = await result.json();
            setpatients(result);
        } catch (error) {
            if (!error.response) {
                console.error("Network error:", error);
            } else {
                console.error("Error response:", error.response);
            }
        }
    }
    const fetchtodaysappointments = async (date) => {
        try {
            const res = await fetch(`http://localhost:8080/Appointments/todaysappointments?date=${date}`);
            const data = await res.json();
            console.log(data);
            settodaysappointments(data);
        }
        catch (err) {
            console.error("Error", err)
        }
    }
    const fetchappointments = async () => {
        try {
            const res = await fetch(`http://localhost:8080/Appointments`);
            const data = await res.json();
            console.log(data);
            setappointments(data);
        }
        catch (err) {
            console.error("Error", err)
        }
    }
    const handleSearchappointment = () => {
        if (searchVal === "") { setappointment({}); return; }
        const data = appointments.find((item) => (
            item.identity.toString() === searchVal && item.isvisited === false
        ))
        console.log(data)
        setappointment((prev) => ({
            ...prev,
            ["name"]: data.name,
            ["mobileNumber"]: data.mobileNumber,
            ["doctor"]: data.doctor,
            ["Doctorid"]: data.Doctorid,
            ["date"]: data.date,
            ["time"]: data.time,
            ["_id"]: data._id
        }))
    }
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
    const handleFileChange = (e) => {
        setappointment((prev) => ({
            ...prev,
            [e.target.name]: e.target.files[0]
        }))
    };
    const handleChange = (id, ID) => {
        console.log(id, ID)
        setPatientId(id);
        setappointmentID(ID);
        setOpen(true)
    }
    const handledit = async (id) => {
        seteditappointmentopen(true);
        try {
            const res = await fetch(`http://localhost:8080/Appointments/` + id);
            const data = await res.json();
            console.log(data);
            setappointment(data);
        }
        catch (err) {
            console.error("Error", err)
        }
    }
    const handledate = (e, Doctorid) => {
        console.log(Doctorid)
        if (!Doctorid) {
            alert("Patient is not selected")
        }
        else {
            console.log(e.target.name, e.target.value, Doctorid)
            fetchAvailability(e.target.value, Doctorid)
            setappointment((prev) => ({ ...prev, [e.target.name]: e.target.value, "time": " " }))
        }

    }
    const editappointmnt = () => {
        console.log(appointment)
        fetch("http://localhost:8080/Appointments/" + appointment._id, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(appointment),
        })
            .then((response) => {
                console.log(response);
                setappointment({});
                seteditappointmentopen(false);
                seteditappointment(false);
                setslots([]);
                window.location.reload()
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const bookappointmnt = async () => {
        console.log(appointment);
        if (
            appointment.name &&
            appointment.mobileNumber &&
            appointment.date &&
            appointment.time &&
            appointment.doctor
        ) {
            const formData = new FormData();
            formData.append("name", appointment.name);
            formData.append("mobileNumber", appointment.mobileNumber);
            formData.append("bloodgroup", appointment.bloodgroup);
            formData.append("bloodpresure", appointment.bloodpresure);
            formData.append("date", appointment.date);
            formData.append("time", appointment.time);
            formData.append("identity", appointment.identity);
            formData.append("Patient_Id", appointment.Patient_Id);
            formData.append("Doctorid", appointment.Doctorid);
            formData.append("month", appointment.month);
            formData.append("week", appointment.week);
            formData.append("vaccine", appointment.vaccine);
            formData.append("doctor", appointment.doctor);
            formData.append("weight", appointment.weight);
            formData.append("temperature", appointment.temperature);
            formData.append("fundalHeight", appointment.fundalHeight);
            formData.append("heartrate", appointment.heartrate);
            formData.append("fetalMovement", appointment.fetalMovement);
            formData.append("urineSugar", appointment.urineSugar);
            formData.append("fetalPosition", appointment.fetalPosition);
            formData.append("labtestfile", appointment.labtestfile);
            formData.append("ultrasonicreport", appointment.ultrasonicreport);
            formData.append("bloodtestfile", appointment.bloodtestfile);
            formData.append("urinetestfile", appointment.urinetestfile);
            formData.append("stresstestfile", appointment.stresstestfile);
            formData.append("dateofvisit", currentdate);
            formData.append("isvisited", appointment.isvisited);
            try {
                const res = await fetch('http://localhost:8080/Appointments', {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();
                if (res.ok) {
                    alert('Upload successful');
                    console.log(data);
                    setappointment({})
                    window.location.reload();
                } else {
                    alert('Upload failed');
                    console.error(data);
                }
            } catch (err) {
                console.error(err);
                alert('Error uploading file');
            }

        } else {
            alert("please fill all details");
        }
    }
    useEffect(() => {
        const today = new Date();
        const formatted = today.toISOString().split('T')[0]; // "YYYY-MM-DD"
        setcurrentdate(formatted);
        fetchtodaysappointments(formatted);
        fetchappointments();
        getusers();
    }, [])

    const handleSearchClick = () => {
        if (searchVal === "") { setappointment({}); return; }
        const data = patients.find((item) => (
            item.identity.toString() === searchVal
        ))
        setappointment((prev) => ({
            ...prev,
            ["name"]: data.name,
            ["mobileNumber"]: data.mobileNumber,
            ["doctor"]: data.doctor,
            ["Doctorid"]: data.Doctorid,
            ["identity"]: data.identity,
            ["isvisited"]: false,
            ["Patient_Id"]: data._id
        }))
    }
    return (

        <div>
            <div className="mt-3 "
                style={{
                    backgroundImage: `url(${wallpaper})`,
                    height: "84vh",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    fontFamily: "Arial"
                }} >
                <div className='p-4 mt-2 d-flex justify-content-between container '>
                    <h2> Todays Appointment</h2>
                    <div>
                        <Button onClick={() => { setbookappointment(true) }} className="text-dark bg-light" >First Appointment</Button>
                        <Button onClick={() => { seteditappointment(true) }} className="text-dark bg-light m-1">Edit Appointment</Button>

                    </div>
                </div>
                <div className="mt-2 container">
                    <table className="sticky table table-bordered text-center w-100 mt-5">
                        <thead>
                            <tr style={{ fontFamily: "Arial" }}>
                                <th>Name</th>
                                <th>Mobile Number</th>
                                <th>Doctor</th>
                                <th>Time</th>
                                <th>isVisited</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todaysAppointments.map((record, index) => (
                                <tr className="bordered" >
                                    <td>{record.name}</td>
                                    <td>{record.mobileNumber}</td>
                                    <td>{record.doctor}</td>
                                    <td>{record.time}</td>
                                    <td><Checkbox
                                        type="checkbox"
                                        checked={record.isvisited}
                                        disabled={record.isvisited}
                                        onClick={(e) => { handleChange(record.Patient_Id, record._id) }}
                                    /></td>
                                    <td className="d-flex">
                                        <Button className="text-secondary m-1" disabled={record.isvisited} onClick={() => { handledit(record._id) }}>Edit </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Dialog
                    fullScreen
                    open={open}
                    onClose={() => { setOpen(false) }}
                    slots={{
                        transition: Transition,
                    }}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={() => { setOpen(false) }}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Record and book next appointment
                            </Typography>
                        </Toolbar>

                    </AppBar>
                    <Appointments patient_Id={patient_Id} appointmentID={appointmentID} />
                </Dialog>
                <Dialog
                    fullWidth={true}
                    maxWidth={'md'}
                    open={editappointmentopen}
                    onClose={() => { seteditappointmentopen(false) }}
                >
                    <DialogTitle className="bg-secondary text-white">Edit Appointment</DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={() => {
                            seteditappointmentopen(false);
                            setappointment({});
                            setslots([]);
                        }}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent className="row r-3">
                        <div className="col-md-6">
                            <label className="form-label" placeholder="Name">Name : </label>
                            <input type="Name"
                                name='name'
                                className="form-control"
                                placeholder="Enter Full Name"
                                value={appointment.name}
                                readOnly />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Mobile Number : </label>
                            <input type="Number"
                                name='mobileNumber'
                                className="form-control"
                                value={appointment.mobileNumber}
                                readOnly />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Date: </label>
                            <input type="date"
                                name="date"
                                className="form-control"
                                placeholder="Enter Date"
                                value={appointment.date}
                                onChange={(e) => { handledate(e, appointment.doctor) }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Time: </label>
                            <input type="text"
                                name="time"
                                className="form-control"
                                value={appointment.time}
                                readonly />
                        </div>
                        <div className="d-flex ">
                            <label className="form-label w-0 p-2" placeholder="Name">Slots : </label>
                            <span className="d-flex gap-3 p-2">
                                {slots.map((time) => (
                                    <Button onClick={() => { setappointment({ ...appointment, ["time"]: time }) }}>
                                        {time}
                                    </Button>
                                ))}
                            </span>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { editappointmnt() }} className="bg-secondary text-white">Submit</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    fullWidth={true}
                    maxWidth={'md'}
                    open={editappointment}
                    onClose={() => {
                        setappointment({});
                        seteditappointmentopen(false);
                        seteditappointment(false);
                        setslots([])
                    }}
                >
                    <DialogTitle className="text-white bg-secondary">Edit Appointment</DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={() => {
                            setappointment({});
                            seteditappointmentopen(false);
                            seteditappointment(false);
                            setslots([]);
                        }}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent className="row r-3">
                        <div className="col-md-6">
                            Enter Aadhar Number :
                            <Search className='d-flex border'>

                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={(e) => setsearchVal(e.target.value)}

                                />
                                <Button onClick={(e) => handleSearchappointment()}><SearchIcon className="m-2" /></Button>
                            </Search>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" placeholder="Name">Name : </label>
                            <input type="Name"
                                name='name'
                                className="form-control"
                                placeholder="Enter Full Name"
                                value={appointment.name}
                                readOnly />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Mobile Number : </label>
                            <input type="Number"
                                name='mobileNumber'
                                className="form-control"
                                value={appointment.mobileNumber}
                                readOnly />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Date: </label>
                            <input type="date"
                                name="date"
                                className="form-control"
                                placeholder="Enter Date"
                                value={appointment.date}
                                onChange={(e) => { handledate(e, appointment.Doctorid) }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Time: </label>
                            <input type="text"
                                name="time"
                                className="form-control"
                                value={appointment.time}
                                readonly />
                        </div>
                        <div className="d-flex ">
                            <label className="form-label w-0 p-2" placeholder="Name">Slots : </label>
                            <span className="d-flex gap-3 p-2">
                                {slots.map((time) => (
                                    <Button onClick={() => { setappointment({ ...appointment, ["time"]: time }) }}>
                                        {time}
                                    </Button>
                                ))}
                            </span>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { editappointmnt() }} className="bg-secondary text-white">Submit</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    fullWidth={true}
                    maxWidth={'md'}
                    open={bookappointment}
                    onClose={() => { setbookappointment(false); setappointment({}); setslots([]); setsearchVal() }}
                >
                    <DialogTitle className="text-white bg-primary">Book First Appointment</DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={() => { setbookappointment(false); setappointment({}); setslots([]); setsearchVal() }}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent className="row r-3">
                        <div className="col-md-6">
                            Enter Aadhar Number :
                            <Search className='d-flex border'>

                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={(e) => setsearchVal(e.target.value)}

                                />
                                <Button onClick={(e) => handleSearchClick()}><SearchIcon className="m-2" /></Button>
                            </Search>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label" placeholder="Name">Name : </label>
                            <input type="text"
                                name='name'
                                className="form-control"
                                value={appointment.name}
                                readOnly />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Mobile Number : </label>
                            <input type="Number"
                                name='mobileNumber'
                                className="form-control"
                                value={appointment.mobileNumber}
                                readOnly />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label" placeholder="Name">Date of Visit:</label>
                            <input type="Date"
                                name='dateofvisit'
                                className="form-control"
                                value={currentdate}
                                onChange={(e) => { setappointment({ ...appointment, [e.target.name]: e.target.value }) }} />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label" placeholder="Name">Month:</label>
                            <input type="number"
                                name='month'
                                className="form-control"
                                placeholder="Enter month"
                                value={appointment.month}
                                onChange={(e) => setappointment({ ...appointment, [e.target.name]: e.target.value })} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label" placeholder="Name">Week:</label>
                            <input type="number"
                                name='week'
                                className="form-control"
                                placeholder="Enter Week"
                                value={appointment.week}
                                onChange={(e) => setappointment({ ...appointment, [e.target.name]: e.target.value })} />
                        </div>
                        <div className="row g-3 mt-3"  >
                            <h4>Vital Signs:</h4>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Blood pressure:</label>
                                <input type="text"
                                    name='bloodpresure'
                                    className="form-control"
                                    placeholder="Enter blood presure"
                                    value={appointment.bloodpresure}
                                    onChange={(e) => setappointment({ ...appointment, [e.target.name]: e.target.value })} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Blood sugar:</label>
                                <input type="text"
                                    name='bloodsugar'
                                    className="form-control"
                                    placeholder="Enter blood sugar"
                                    value={appointment.bloodsugar}
                                    onChange={(e) => setappointment({ ...appointment, [e.target.name]: e.target.value })} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Weight:</label>
                                <input type="number"
                                    name='weight'
                                    className="form-control"
                                    placeholder="Enter Weight"
                                    value={appointment.weight}
                                    onChange={(e) => setappointment({ ...appointment, [e.target.name]: e.target.value })} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Temperarture:</label>
                                <input type="text"
                                    name='temperature'
                                    className="form-control"
                                    placeholder="Enter Temperarture"
                                    value={appointment.temperarture}
                                    onChange={(e) => setappointment({ ...appointment, [e.target.name]: e.target.value })} />
                            </div>
                        </div>
                        <div className="row g-3 mt-3">
                            <h4>Abdominal examination:</h4>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Fundal height:</label>
                                <input type="text"
                                    name='fundalHeight'
                                    className="form-control"
                                    placeholder="Enter Fundal Height"
                                    value={appointment.fundalHeight}
                                    onChange={(e) => setappointment({ ...appointment, [e.target.name]: e.target.value })} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Fetal heart rate:</label>
                                <input type="text"
                                    name='heartrate'
                                    className="form-control"
                                    placeholder="Enter Fetal heart rate"
                                    value={appointment.heartrate}
                                    onChange={(e) => setappointment({ ...appointment, [e.target.name]: e.target.value })} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Fetal Position:</label>
                                <input type="text"
                                    name='fetalPosition'
                                    className="form-control"
                                    placeholder="Enter Fetal Position"
                                    value={appointment.fetalPosition}
                                    onChange={(e) => setappointment({ ...appointment, [e.target.name]: e.target.value })} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Fetal Heart Sound:</label>
                                <input type="text"
                                    name='fetalHeartSound'
                                    className="form-control"
                                    placeholder="Enter Fetal Heart Sound"
                                    value={appointment.fetalHeartSound}
                                    onChange={(e) => setappointment({ ...appointment, [e.target.name]: e.target.value })} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Fetal Movement:</label>
                                <input type="text"
                                    name='fetalMovement'
                                    className="form-control"
                                    placeholder="Enter Fetal Movement"
                                    value={appointment.fetalMovement}
                                    onChange={(e) => setappointment({ ...appointment, [e.target.name]: e.target.value })} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Vaccine:</label>
                                <input type="text"
                                    name='vaccine'
                                    className="form-control"
                                    placeholder="Enter Vaccine Name"
                                    value={appointment.vaccine}
                                    onChange={(e) => setappointment({ ...appointment, [e.target.name]: e.target.value })} />
                            </div>
                        </div>

                        <div className="row g-3 mt-3">
                            <h4>Test results:</h4>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Upload Lab test File:</label>
                                <input type="file"
                                    name='labtestfile'
                                    className="form-control"
                                    id="image"
                                    onChange={(e) => { handleFileChange(e) }} />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Upload Blood test File:</label>
                                <input type="file"
                                    name='bloodtestfile'
                                    className="form-control"
                                    id="image"
                                    onChange={(e) => { handleFileChange(e) }} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Upload Urine test File:</label>
                                <input type="file"
                                    name='urinetestfile'
                                    className="form-control"
                                    id="image"
                                    onChange={(e) => { handleFileChange(e) }} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Upload stress test File:</label>
                                <input type="file"
                                    name='stresstestfile'
                                    className="form-control"
                                    id="image"
                                    onChange={(e) => { handleFileChange(e) }} />
                            </div>
                            <div className="col-md-6">
                                <fieldset className="col md-6" style={{ fontFamily: "Arial" }}>
                                    <legend className="col-form-label pt-0">Upload Ultrasonic reports File{"(Sonography reports)"}:</legend>
                                    <div className="col-sm-10" >
                                        <div className="form-check" style={{ fontFamily: "Arial" }}>
                                            <input className="form-check-input"
                                                type="radio"
                                                name="ultrasonicreportType"
                                                value="Early pregnancy scan"
                                                checked={appointment.ultrasonicreportType === "Early pregnancy scan"}
                                                onChange={(e) => setappointment({ ...appointment, [e.target.name]: e.target.value })}
                                            />
                                            <label className="form-check-label" >
                                                Early pregnancy scan
                                            </label>
                                        </div>
                                        <div className="form-check" style={{ fontFamily: "Arial" }}>
                                            <input className="form-check-input"
                                                type="radio"
                                                name="ultrasonicreportType"
                                                value="Ultrasound NT/NB scan"
                                                checked={appointment.ultrasonicreportType === "Ultrasound NT/NB scan"}
                                                onChange={(e) => setappointment({ ...appointment, [e.target.name]: e.target.value })}
                                            />
                                            <label className="form-check-label" >
                                                Ultrasound NT/NB scan
                                            </label>
                                        </div>
                                        <div className="form-check" style={{ fontFamily: "Arial" }}>
                                            <input className="form-check-input"
                                                type="radio"
                                                name="ultrasonicreportType"
                                                value="Ultrasound Level 1"
                                                checked={appointment.ultrasonicreportType === "Ultrasound Level 1"}
                                                onChange={(e) => setappointment({ ...appointment, [e.target.name]: e.target.value })}
                                            />
                                            <label className="form-check-label" >
                                                Ultrasound Level 1
                                            </label>
                                        </div>
                                        <div className="form-check" style={{ fontFamily: "Arial" }}>
                                            <input className="form-check-input"
                                                type="radio"
                                                name="ultrasonicreportType"
                                                value="Ultrasound Level 2"
                                                checked={appointment.ultrasonicreportType === "Ultrasound Level 2"}
                                                onChange={(e) => setappointment({ ...appointment, [e.target.name]: e.target.value })}
                                            />
                                            <label className="form-check-label" >
                                                Ultrasound Level 2
                                            </label>
                                        </div>
                                        <div className="form-check" style={{ fontFamily: "Arial" }}>
                                            <input className="form-check-input"
                                                type="radio"
                                                name="ultrasonicreportType"
                                                value="Growth scan"
                                                checked={appointment.ultrasonicreportType === "Growth scan"}
                                                onChange={(e) => ({ ...appointment, [e.target.name]: e.target.value },
                                                    console.log(e.target.value))
                                                }
                                            />
                                            <label className="form-check-label" >
                                                Growth scan
                                            </label>
                                        </div>
                                        {appointment.ultrasonicreportType && <div className="col-md-6">
                                            <input type="file"
                                                name='ultrasonicreport'
                                                className="form-control"
                                                id="image"
                                                onChange={(e) => { handleFileChange(e) }} />
                                        </div>}
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <h4>Next appointment Date and time :</h4>
                        <div className="col-md-6">
                            <label className="form-label">Date: </label>
                            <input type="date"
                                name="date"
                                className="form-control"
                                placeholder="Enter Date"
                                value={appointment.date || " "}
                                onChange={(e) => { handledate(e, appointment.Doctorid) }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Time: </label>
                            <input type="text"
                                name="time"
                                className="form-control"
                                value={appointment.time}
                                readonly />
                        </div>
                        <div className="d-flex ">
                            <label className="form-label w-0 p-2" placeholder="Name">Slots : </label>
                            <span className="d-flex gap-3 p-2">
                                {slots.map((time) => (
                                    <Button onClick={() => { setappointment({ ...appointment, ["time"]: time }) }}>
                                        {time}
                                    </Button>
                                ))}
                            </span>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { bookappointmnt() }} className="bg-primary text-white">Submit</Button>
                    </DialogActions>
                </Dialog>
            </div >
        </div >
    )
}