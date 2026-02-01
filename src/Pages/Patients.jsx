import { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Card from "@mui/material/Card";
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import SearchIcon from '@mui/icons-material/Search';
import "./Home.css"
import { Grid, Box, Divider } from '@mui/material'
import Typography from '@mui/material/Typography';
import { Search, StyledInputBase } from "../components/SearchBar";
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
export default function Patients() {
    const { id } = useParams();
    const navigate = useNavigate();
    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'email', label: 'Email', minWidth: 170 },
        { id: 'mobileNumber', label: 'Mobile Number ', minWidth: 170 },
        { id: 'doctor', label: 'Doctor', minWidth: 170 },
        { id: "action", label: 'Action', minWidth: 170 },
        { id: "appointments", label: 'Appointments', minWidth: 170 },
    ];
    const formatDate = date =>
        new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    const [Patient, setPatient] = useState({});
    const [patients, setpatients] = useState([]);
    const [allpatients, setallpatients] = useState([]);
    const [open, setopen] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [appointments, setappointments] = useState([]);
    const [openappointments, setopenappointments] = useState(false);
    const [openDocument, setDocumentOpen] = useState();
    const [document, setDocument] = useState();
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleAppointments = async (id) => {
        setopenappointments(true);
        try {
            let result = await fetch(`https://matri-clinic-backend-tau.vercel.app/Appointments/patientapmnt?patientid=${id}`);
            result = await result.json();
            setappointments(result);
            console.log(result);
        }
        catch (err) {
            console.error("Error", err)
        }
    }
    const getusers = async () => {
        try {
            let result = await fetch("https://matri-clinic-backend-tau.vercel.app/patients");
            result = await result.json();
            setpatients(result);
            setallpatients(result)
        } catch (error) {
            if (!error.response) {
                console.error("Network error:", error);
            } else {
                console.error("Error response:", error.response);
            }
        }
    }
    useEffect(() => {
        getusers();
    }, []);
    const fetchpatient = async (id) => {
        try {
            let result = await fetch("https://matri-clinic-backend-tau.vercel.app/patients/" + id);
            result = await result.json();
            setPatient(result);
        }
        catch (err) {
            console.error("Error", err)
        }
    }
    const handleEdit = (Id) => {
        navigate(`/Admin/${id}/Editpatient/` + Id)
    }
    const handleView = (Id) => {
        fetchpatient(Id)
        setopen(true);
    }
    function handleSearchClick(searchVal) {

        if (searchVal === "") { setpatients(patients); return; }
        const filterBySearch = allpatients.filter(item =>
            item.name.toLowerCase().includes(searchVal.toLowerCase())
        );
        setpatients(filterBySearch);
    }
    return (
        <div>
            <div className="container mt-2" >
                <div className="d-flex justify-content-between">
                    <h1 style={{ fontFamily: "Arial" }}>All Patients</h1>
                    <div className=''>
                        <Search className='d-flex border'>

                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={e => handleSearchClick(e.target.value)}
                            />
                            <SearchIcon className="m-2" />
                        </Search>
                    </div>
                </div>
                <Paper sx={{ width: '100%', overflow: 'hidden' }} className="mt-3">
                    <TableContainer sx={{ maxHeight: 500 }}>
                        <Table stickyHeader aria-label="sticky table table-bordered text-center w-100 mt-5">
                            <TableHead >
                                <TableRow >
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            className="bg-secondary text-white"
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {patients
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.id === "name"
                                                                && <Button onClick={() => { handleView(row["_id"]) }}  >{value}</Button>
                                                            }
                                                            {column.id === "action"
                                                                && <Button onClick={() => { handleEdit(row["_id"]) }} className="text-success"><EditIcon /></Button>
                                                            }
                                                            {column.id === "appointments"
                                                                && <Button onClick={() => { handleAppointments(row["_id"]) }} className="text-success"><CalendarMonthIcon className="h-4 p-1 w-5" /></Button>
                                                            }
                                                            {(column.id === "email" || column.id === "mobileNumber" || column.id === "doctor") && value}
                                                        </TableCell>

                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={patients.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                </Paper>
            </div>
            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                open={open}
                onClose={() => { setopen(false) }}
            >
                <DialogTitle>Patient Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div className='text-light d-flex justify-content-between p-2 bg-secondary'>
                            <span><PersonIcon />{Patient.name}</span>
                            <span><CallIcon />{Patient.mobileNumber}</span>
                        </div>
                        <div className="card w-100">
                            <div className="card-body p-0 d-flex">
                                <table className="table table-sm m-4">

                                    <tbody>
                                        {[
                                            ["Name", Patient.name],
                                            ["Date of Birth", formatDate(Patient.dateOfBirth)],
                                            ["Nationality", Patient.nationality],
                                            ["Identity", Patient.identity],
                                            ["Matrical Status", Patient.matricalStatus],
                                            ["Address", Patient.address],
                                            ["Age", Patient.age],
                                            ["Doctor", Patient.doctor],
                                        ].map(([label, value]) => (
                                            <tr key={label}>
                                                <td className="text-secondary">{label}:</td>
                                                <td>{value}</td>
                                            </tr>
                                        ))}
                                    </tbody>


                                </table>
                            </div>
                        </div>
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button className="text-white bg-secondary" onClick={() => { setopen(false) }}>Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullWidth={true}
                maxWidth={'lg'}
                open={openappointments}
                onClose={() => { setappointments(false) }}
            >
                <DialogTitle>Appointments Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Grid container spacing={3}>
                            {appointments.map((record, index) => (
                                record.dateofvisit !== "undefined" && (
                                    <Grid item xs={12} key={index}>

                                        <Card elevation={3} sx={{ padding: 3, borderRadius: 3 }}>

                                            <Typography
                                                variant="h6"
                                                sx={{ fontWeight: 'bold', color: '#5a5a5a', mb: 2 }}
                                            >
                                                📅 {new Date(record.dateofvisit).toLocaleDateString('en-US', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </Typography>

                                            <Divider sx={{ mb: 3 }} />

                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                                Appointment Details
                                            </Typography>

                                            <Grid container spacing={2}>

                                                {[
                                                    { label: "Month", value: record.month },
                                                    { label: "Week", value: record.week },
                                                    { label: "Temperature", value: record.temperature },
                                                    { label: "Weight", value: record.weight },
                                                    { label: "Blood Pressure", value: record.bloodpresure },
                                                    { label: "Blood Sugar", value: record.bloodsugar },
                                                    { label: "Heart Rate", value: record.heartrate },
                                                    { label: "Fundal Height", value: record.fundalHeight },
                                                    { label: "Fetal Position", value: record.fetalPosition },
                                                    { label: "Fetal Movement", value: record.fetalMovement },
                                                    { label: "Ultrasonic Report Type", value: record.ultrasonicreportType },
                                                    { label: "Next Appointment Date", value: record.date },
                                                    { label: "Next Appointment Time", value: record.time },
                                                ].map((item, i) => (
                                                    item.value !== "undefined" && (
                                                        <Grid item xs={12} sm={6} key={i}>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    padding: 1.5,
                                                                    backgroundColor: '#fafafa',
                                                                    borderRadius: 2,
                                                                    border: '1px solid #e0e0e0'
                                                                }}
                                                            >
                                                                <Typography sx={{ fontWeight: 600 }}>
                                                                    {item.label}:
                                                                </Typography>
                                                                <Typography>{item.value}</Typography>
                                                            </Box>
                                                        </Grid>
                                                    )
                                                ))}

                                            </Grid>

                                            <Divider sx={{ my: 3 }} />

                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                                Files & Reports
                                            </Typography>

                                            {[
                                                { label: "Lab Report", file: record.labTestFile },
                                                { label: "Ultrasonic Report", file: record.ultraSonicReport },
                                                { label: "Blood Test", file: record.bloodTestFile },
                                                { label: "Urine Test", file: record.urineTestFile },
                                                { label: "Stress Test", file: record.stressTestFile },
                                            ]
                                                
                                                .map((item, i) => (
                                                    <Box
                                                        key={i}
                                                        sx={{
                                                            mb: 2,
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            p: 1.5,
                                                            backgroundColor: "#f3f3f3",
                                                            borderRadius: 2,
                                                            border: "1px solid #dcdcdc",
                                                        }}
                                                    >
                                                        <Typography fontWeight={600}>
                                                            {item.label}
                                                        </Typography>

                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            onClick={() => {
                                                                console.log(item.file)
                                                                setDocument(item.file);
                                                                setDocumentOpen(true);
                                                            }}
                                                        >
                                                            View File
                                                        </Button>
                                                    </Box>
                                                ))}


                                        </Card>
                                    </Grid>
                                )
                            ))}
                        </Grid>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button className="text-white bg-secondary" onClick={() => { setopenappointments(false) }}>Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullScreen
                open={openDocument}
                onClose={() => {
                    setDocumentOpen(false);
                    setDocument(null);
                }}
            >
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => {
                                setDocumentOpen(false);
                                setDocument(null);
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    p={3}
                >
                    {document && (
                        <Box
                            component="img"
                            src={document}
                            sx={{
                                maxWidth: "100%",
                                maxHeight: "90vh",
                                objectFit: "contain",
                                borderRadius: 1,
                                border: "1px solid #ddd",
                            }}
                        />
                    )}
                </Box>
            </Dialog>

        </div>
    )
}