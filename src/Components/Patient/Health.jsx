import { useState } from "react";
import { useParams } from "react-router-dom";
import wallpaper from '../assets/patientwallpaper.jpg'
import { Button } from "@mui/material";
import bloodpresure from '../assets/icons8-pressure-16.png';
import heartrate from '../assets/icons8-heartrate-16.png';
import temp from '../assets/icons8-temperature-16.png';
import weight from '../assets/icons8-weight-16.png';
import movement from '../assets/icons8-movement-16.png';
import urine from '../assets/icons8-urine-test-16.png';
import HeightIcon from '@mui/icons-material/Height';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import "../Home/Home.css"
import DateRangeIcon from '@mui/icons-material/DateRange';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from "react";
import SearchIcon from '@mui/icons-material/Search'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Health() {
    const { id } = useParams();
    const [appointmts, setappointments] = useState([]);
    const [admin, setadmin] = useState([]);
    const [open, setopen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState();

    const fetchappointments = async (id) => {
        console.log(id)
        try {
            let result = await fetch(`http://localhost:8080/Appointments/patientapmnt?patientid=${id}`);
            result = await result.json();
            console.log(result);
            setappointments(result);
        }
        catch (err) {
            console.error("Error", err)
        }
    }
    const fetchadmin = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/admin`);
            const data = await res.json();
            setadmin(data);
        }
        catch (err) {
            console.error("Error", err)
        }
    }
    useState(() => {
        fetchappointments(id)
        fetchadmin()
    }, [id])
    return (
        <div>
            <div>
                <div className="m-5">
                    <div>
                        <img src={wallpaper} alt="wallpaper" className="w-100 h-75" />
                    </div>
                </div>
                <div className="container mt-5">
                    <div className="row gy-4">
                        {/* Appointment Details */}
                        <div className="col-md-6">
                            <div className="p-3 border rounded shadow-sm bg-white">
                                <h3 className="mb-4 text-secondary border-bottom pb-2">Appointment Details</h3>
                                {appointmts.map((record, index) =>
                                    record.dateofvisit !== "undefined" && (
                                        <div key={index} className="mb-3">
                                            <span className="text-muted fw-semibold">
                                                {/* Format date */}
                                                {new Date(record.dateofvisit).getDate()}{" "}
                                                {new Date(record.dateofvisit).toLocaleString("default", { month: "long" })}
                                            </span>
                                            <div className="border rounded p-3 mt-2 bg-light">
                                                {record.month !== "undefined" !== "undefined" && (
                                                    <div className="d-flex align-items-center mb-2">
                                                        <img
                                                            src={temp}
                                                            alt="Temperature"
                                                            className="me-2 p-1 border border-warning bg-warning rounded-3"
                                                            style={{ width: "32px", height: "32px" }}
                                                        />
                                                        <span className="fw-bold w-25">Month:</span>
                                                        <span className="ms-2 text-dark">{record.month} Month</span>
                                                    </div>
                                                )}
                                                {record.week !== "undefined" && (
                                                    <div className="d-flex align-items-center mb-2">
                                                        <img
                                                            src={temp}
                                                            alt="Temperature"
                                                            className="me-2 p-1 border border-warning bg-warning rounded-3"
                                                            style={{ width: "32px", height: "32px" }}
                                                        />
                                                        <span className="fw-bold w-25">Week:</span>
                                                        <span className="ms-2 text-dark">{record.week} Weeks</span>
                                                    </div>
                                                )}
                                                {record.temperature !== "undefined" && (
                                                    <div className="d-flex align-items-center mb-2">
                                                        <img
                                                            src={temp}
                                                            alt="Temperature"
                                                            className="me-2 p-1 border border-warning bg-warning rounded-3"
                                                            style={{ width: "32px", height: "32px" }}
                                                        />
                                                        <span className="fw-bold w-25">Temperature:</span>
                                                        <span className="ms-2 text-dark">{record.temperature}</span>
                                                    </div>
                                                )}

                                                {record.weight !== "undefined" && (
                                                    <div className="d-flex align-items-center mb-2">
                                                        <img
                                                            src={weight}
                                                            alt="Weight"
                                                            className="me-2 p-1 border border-warning bg-warning rounded-3"
                                                            style={{ width: "32px", height: "32px" }}
                                                        />
                                                        <span className="fw-bold w-25">Weight:</span>
                                                        <span className="ms-2 text-dark">{record.weight}</span>
                                                    </div>
                                                )}

                                                {record.bloodpresure !== "undefined" && (
                                                    <div className="d-flex align-items-center mb-2">
                                                        <img
                                                            src={bloodpresure}
                                                            alt="Blood Pressure"
                                                            className="me-2 p-1 border border-warning bg-warning rounded-3"
                                                            style={{ width: "32px", height: "32px" }}
                                                        />
                                                        <span className="fw-bold w-25">Blood Pressure:</span>
                                                        <span className="ms-2 text-dark">{record.bloodpresure}</span>
                                                    </div>
                                                )}
                                                {record.bloodsugar !== "undefined" && (
                                                    <div className="d-flex align-items-center mb-2">
                                                        <BloodtypeIcon
                                                            className="me-2 p-1 border border-warning bg-warning rounded-3"
                                                            style={{ width: "32px", height: "32px" }}
                                                        />
                                                        <span className="fw-bold w-25">Blood Sugar:</span>
                                                        <span className="ms-2 text-dark">{record.bloodsugar}</span>
                                                    </div>
                                                )}
                                                {record.heartrate !== "undefined" && (
                                                    <div className="d-flex align-items-center mb-2">
                                                        <img
                                                            src={heartrate}
                                                            alt="heartrate"
                                                            className="me-2 p-1 border border-warning bg-warning rounded-3"
                                                            style={{ width: "32px", height: "32px" }}
                                                        />
                                                        <span className="fw-bold w-25">Heart Rate:</span>
                                                        <span className="ms-2 text-dark">{record.heartrate}</span>
                                                    </div>
                                                )}
                                                {record.fundalHeight !== "undefined" && (
                                                    <div className="d-flex align-items-center mb-2">
                                                        <HeightIcon
                                                            className="me-2 p-1 border border-warning bg-warning rounded-3"
                                                            style={{ width: "32px", height: "32px" }} />
                                                        <span className="fw-bold w-25">Fundal Height:</span>
                                                        <span className="ms-2 text-dark">{record.fundalHeight}</span>
                                                    </div>
                                                )}
                                                {record.fetalPosition !== "undefined" && (
                                                    <div className="d-flex align-items-center mb-2">
                                                        <ControlCameraIcon
                                                            className="me-2 p-1 border border-warning bg-warning rounded-3"
                                                            style={{ width: "32px", height: "32px" }} />
                                                        <span className="fw-bold w-25">Fetal Position:</span>
                                                        <span className="ms-2 text-dark">{record.fetalPosition}</span>
                                                    </div>
                                                )}
                                                {record.fetalMovement !== "undefined" && (
                                                    <div className="d-flex align-items-center mb-2">
                                                        <img
                                                            src={movement}
                                                            alt="heartrate"
                                                            className="me-2 p-1 border border-warning bg-warning rounded-3"
                                                            style={{ width: "32px", height: "32px" }}
                                                        />
                                                        <span className="fw-bold w-25">Fetal Movement:</span>
                                                        <span className="ms-2 text-dark">{record.fetalMovement}</span>
                                                    </div>
                                                )}
                                                {record.date !== "undefined" && (
                                                    <div className="d-flex align-items-center mb-2">
                                                        <DateRangeIcon
                                                            className="me-2 p-1 border border-warning bg-warning rounded-3"
                                                            style={{ width: "32px", height: "32px" }} />
                                                        <span className="fw-bold w-25">Next Appointment Date:</span>
                                                        <span className="ms-2 text-dark">{record.date}</span>
                                                    </div>
                                                )}
                                                {record.time !== "undefined" && (
                                                    <div className="d-flex align-items-center mb-2">
                                                        <AccessTimeFilledIcon
                                                            className="me-2 p-1 border border-warning bg-warning rounded-3"
                                                            style={{ width: "32px", height: "32px" }} />
                                                        <span className="fw-bold w-25">Next Appointment Time:</span>
                                                        <span className="ms-2 text-dark">{record.time}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Files Details */}
                        <div className="col-md-6">
                            <div className="p-3 border rounded shadow-sm bg-white">
                                <h3 className="mb-4 text-secondary border-bottom pb-2">Files Details</h3>
                                {appointmts.map((record, index) =>
                                    record.dateofvisit !== "undefined" && (
                                        <div key={index} className="mb-3">
                                            <span className="text-muted fw-semibold">
                                                {new Date(record.dateofvisit).getDate()}{" "}
                                                {new Date(record.dateofvisit).toLocaleString("default", { month: "long" })}
                                            </span>
                                            <div className="border rounded p-3 mt-2 bg-light">
                                                {record.labtestfile !== "undefined" && (
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="fw-bold w-25">Lab Report:</span>
                                                        <Button
                                                            variant="outline-primary"
                                                            size="sm"
                                                            className="ms-2"
                                                            onClick={() => {
                                                                setopen(true);
                                                                setSelectedRecord(record.labtestfile);
                                                            }}
                                                        >
                                                            <SearchIcon />
                                                        </Button>
                                                    </div>
                                                )}
                                                {record.ultrasonicreport !== "undefined" && (
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="fw-bold w-25">Ultrasonic Report:</span>
                                                        <Button
                                                            variant="outline-primary"
                                                            size="sm"
                                                            className="ms-2"
                                                            onClick={() => {
                                                                setopen(true);
                                                                setSelectedRecord(record.ultrasonicreport);
                                                            }}
                                                        >
                                                            <SearchIcon />
                                                        </Button>
                                                    </div>
                                                )}
                                                {record.bloodtestfile !== "undefined" && (
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="fw-bold w-25">Blood Test:</span>
                                                        <Button
                                                            variant="outline-primary"
                                                            size="sm"
                                                            className="ms-2"
                                                            onClick={() => {
                                                                setopen(true);
                                                                setSelectedRecord(record.bloodtestfile);
                                                            }}
                                                        >
                                                            <SearchIcon />
                                                        </Button>
                                                    </div>
                                                )}
                                                {record.urinetestfile !== "undefined" && (
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="fw-bold w-25">Urine Test:</span>
                                                        <Button
                                                            variant="outline-primary"
                                                            size="sm"
                                                            className="ms-2"
                                                            onClick={() => {
                                                                setopen(true);
                                                                setSelectedRecord(record.urinetestfile);
                                                            }}
                                                        >
                                                            <SearchIcon />
                                                        </Button>
                                                    </div>
                                                )}
                                                {record.stresstestfile !== "undefined" && (
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="fw-bold w-25">Stress Test:</span>
                                                        <Button
                                                            variant="outline-primary"
                                                            size="sm"
                                                            className="ms-2"
                                                            onClick={() => {
                                                                setopen(true);
                                                                setSelectedRecord(record.stresstestfile);
                                                            }}
                                                        >
                                                            <SearchIcon />
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <Dialog
                        fullScreen
                        open={open}
                        onClose={() => { setopen(false); setSelectedRecord() }}
                        TransitionComponent={Transition}
                    >
                        <AppBar sx={{ position: 'relative' }}>
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={() => { setopen(false); setSelectedRecord() }}
                                    aria-label="close"
                                >
                                    <CloseIcon />
                                </IconButton>
                                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                    {selectedRecord || 'File Preview'}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <List sx={{ height: '100%' }}>
                            <iframe
                                src={`http://localhost:8080/uploads/${selectedRecord}`}
                                width="100%"
                                height="100%"
                                style={{ flex: 1, border: 'none' }}
                            ></iframe>
                        </List>
                    </Dialog>
                    </div>
                </div>

                <div className="float-end">
                    IF want change appointment date then call on following number :
                    {admin.map((record) => (
                        <a href={record.mobileNumber} className="p-2">{record.mobileNumber}</a>
                    ))}

                </div>
            </div>
        </div>
    )
}