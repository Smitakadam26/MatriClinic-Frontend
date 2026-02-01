import { useEffect, useState } from "react";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton
} from "@mui/material";
import Appointments from "./Appointments";
import wallpaper from '../assets/images/wallpaper.png'
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { Transition, StyledInputBase, Search } from '../components/SearchBar';
import { editAppointment, fetchAppointment, fetchDoctorAvailability,} from "../services/api";
import TestResultsSection from "./TestResultSection";
import BasicInfoSection from "./BasicInfoSection";
import AppointmentsSection from './AppointmentSection';
export default function Todaysappointments() {
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
    const [bloodTestFile, setBloodTestFile] = useState();
    const [urineTestFile, setUrineTestFile] = useState();
    const [labTestFile, setLabTestFile] = useState();
    const [ultraSonicReport, setUltraSonicReport] = useState();
    const [stressTestFile, setStressTestFile] = useState();
    const VitalSignsfields = [
        { label: "Fundal Height", name: "fundalHeight" },
        { label: "Fetal Heart Rate", name: "heartrate" },
        { label: "Fetal Position", name: "fetalPosition" },
        { label: "Fetal Heart Sound", name: "fetalHeartSound" },
        { label: "Fetal Movement", name: "fetalMovement" },
        { label: "Vaccine", name: "vaccine" },
    ];
    const AbdominalExamfields = [
        { label: "Blood Pressure", name: "bloodpresure" },
        { label: "Blood Sugar", name: "bloodsugar" },
        { label: "Weight", name: "weight", type: "number" },
        { label: "Temperature", name: "temperature" },
    ];
    const getusers = async () => {
        try {
            let result = await fetch(
                "https://matri-clinic-backend-tau.vercel.app/patients",
            );
            result =await  result.json();
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
            const res = await fetch(
                `https://matri-clinic-backend-tau.vercel.app/Appointments/todaysappointments?date=${date}`
            );
            const data = await res.json();
            settodaysappointments(data);
        } catch (err) {
            console.error("Error", err);
        }
    };

    const fetchappointments = async () => {
        try {
            const res = await fetch(
                `https://matri-clinic-backend-tau.vercel.app/Appointments`
            );
            const data = await res.json();
            setappointments(data);
        } catch (err) {
            console.error("Error", err);
        }
    };

    const handleSearchappointment = () => {
        if (searchVal === "") { setappointment({}); return; }
        const data = appointments.find((item) => (
            item.identity.toString() === searchVal && item.isvisited === false
        ))
        setappointment((prev) => ({
            ...prev,
            name: data.name,
            mobileNumber: data.mobileNumber,
            doctor: data.doctor,
            Doctorid: data.Doctorid,
            date: data.date,
            time: data.time,
            _id: data._id
        }))
    }
    const fetchAvailability = async (date, Doctorid) => {
        try {
            const res = await fetchDoctorAvailability(date, Doctorid)
            setslots(res.availableSlots)
        }
        catch (err) {
            console.error("Error", err)
        }

    }
    const handlePatient = (id, ID) => {
        setPatientId(id);
        setappointmentID(ID);
        setOpen(true)
    }
    const handleChange = (e) => {
        setappointment({ ...appointment, [e.target.name]: e.target.value })
    }

    const handledit = async (id) => {
        seteditappointmentopen(true);
        try {
            const res = await fetchAppointment(id);
            setappointment(res);
        }
        catch (err) {
            console.error("Error", err)
        }
    }
    const handledate = (e, Doctorid) => {
        if (!Doctorid) {
            alert("Patient is not selected")
        }
        else {
            fetchAvailability(e.target.value, Doctorid)
            setappointment((prev) => ({ ...prev, [e.target.name]: e.target.value, "time": " " }))
        }

    }
    const editappointmnt = () => {
        editAppointment(appointment)
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
        if (
            appointment.name &&
            appointment.mobileNumber &&
            appointment.date &&
            appointment.time &&
            appointment.doctor &&
            appointment.dateofvisit
        ) {
            const formData = new FormData();
            Object.keys(appointment).forEach((key) => {
                formData.append(key, appointment[key]);
            });
            formData.append("labTestFile", labTestFile);
            formData.append("ultraSonicReport", ultraSonicReport);
            formData.append("bloodTestFile", bloodTestFile);
            formData.append("urineTestFile", urineTestFile);
            formData.append("stressTestFile", stressTestFile);
            try {
                const res = await fetch('https://matri-clinic-backend-tau.vercel.app/Appointments', {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();
                if (res.ok) {
                    alert('Upload successful');
                    fetch("https://matri-clinic-backend-tau.vercel.app/Appointments//editvisitstatus/" + appointmentID, {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ isvisited: true }),
                    })
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    setappointment({})
                    setOpen(false);
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
        const formatted = today.toISOString().split('T')[0];
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
            name: data.name,
            mobileNumber: data.mobileNumber,
            doctor: data.doctor,
            Doctorid: data.Doctorid,
            identity: data.identity,
            isvisited: false,
            Patient_Id: data._id
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
                            {todaysAppointments.map((record) => (
                                <tr className="bordered" key={record._id}>
                                    <td>{record.name}</td>
                                    <td>{record.mobileNumber}</td>
                                    <td>{record.doctor}</td>
                                    <td>{record.time}</td>
                                    <td><Checkbox
                                        type="checkbox"
                                        checked={record.isvisited}
                                        disabled={record.isvisited}
                                        onClick={(e) => { handlePatient(record.Patient_Id, record._id) }}
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
                    <Appointments patient_Id={patient_Id} appointmentID={appointmentID} setOpen={setOpen} />
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
                                    <Button onClick={() => { setappointment({ ...appointment, time: time }) }}>
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
                                    <Button onClick={() => { setappointment({ ...appointment, time: time }) }}>
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


                        <BasicInfoSection
                            patient={appointment}
                            appointmt={appointment}
                            currentdate={currentdate}
                            handleChange={handleChange}
                        />

                        <AppointmentsSection
                            appointmt={appointment}
                            handleChange={handleChange}
                            fields={VitalSignsfields}
                        />
                        <AppointmentsSection
                            appointmt={appointment}
                            handleChange={handleChange}
                            fields={AbdominalExamfields}
                        />

                        <TestResultsSection
                            appointmt={appointment}
                            handleChange={handleChange}
                            setStressTestFile={setStressTestFile}
                            setLabTestFile={setLabTestFile}
                            setUltraSonicReport={setUltraSonicReport}
                            setBloodTestFile={setBloodTestFile}
                            setUrineTestFile={setUrineTestFile}
                        />
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
                                    <Button onClick={() => { setappointment({ ...appointment, time: time }) }}>
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