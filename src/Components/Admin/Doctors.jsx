import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
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

export default function Doctors() {
    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'email', label: 'Email', minWidth: 170 },
        { id: 'mobileNumber', label: 'Mobile Number ', minWidth: 170 },
        { id: 'specialization', label: 'Specialization', minWidth: 170 },
        { id: 'Patients', label: 'Patients', minWidth: 170 },
        { id: 'Appointments', label: 'Todays Appointments', minWidth: 170 }
    ];
    const [doctors, setdoctors] = useState([]);
    const [patients, setpatients] = useState([]);
    const [appointments, setappointments] = useState([]);
    const [alldoctors, setalldoctors] = useState([]);
    const [Doctor, setDoctor] = useState({});
    const [open, setOpen] = useState(false);
    const [openpatientslist, setOpenpatientslist] = useState(false);
    const [openappointments, setOpenappointments] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getusers = async () => {
        try {
            let result = await fetch("http://localhost:8080/doctors");
            result = await result.json();
            setdoctors(result);
            setalldoctors(result);
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
    });
    const fetchDoctor = async (id) => {
        console.log(id)
        try {
            let result = await fetch("http://localhost:8080/doctors/" + id);
            result = await result.json();
            console.log(result);
            setDoctor(result);
        }
        catch (err) {
            console.error("Error", err)
        }
    }
    const handleView = (Id) => {
        fetchDoctor(Id)
        setOpen(true);
    }
    function handleSearchClick(searchVal) {

        if (searchVal === "") { setdoctors(doctors); return; }
        const filterBySearch = alldoctors.filter((item) => {
            if (item.name.toLowerCase()
                .includes(searchVal.toLowerCase())) { return item; }
        })
        setdoctors(filterBySearch);
    }
    const handleAppointments = async (Doctorid) => {
        console.log(Doctorid)
        try {
            let result = await fetch(`http://localhost:8080/Appointments/doctorappointment/${Doctorid}`);
            result = await result.json();
            console.log(result);
            setappointments(result);
            setOpenappointments(true);
        }
        catch (err) {
            console.error("Error", err)
        }
    }
    const handlePatients = async (Doctorid) => {
        console.log(Doctorid)
        try {
            let result = await fetch(`http://localhost:8080/patients/patientsappointsdoctor/${Doctorid}`);
            result = await result.json();
            console.log(result);
            setpatients(result);
            setOpenpatientslist(true);
        }
        catch (err) {
            console.error("Error", err)
        }
    }
    return (
        <div>
            <div className="container mt-2">
                <div className="d-flex justify-content-between">
                    <h1  style={{fontFamily:"Arial"}}>All Doctors</h1>
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
                    <TableContainer sx={{ maxHeight: 440 }}>
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
                                {doctors
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
                                                            {column.id === "Patients"
                                                                && <Button onClick={() => { handlePatients(row["_id"]) }}  >Patients</Button>

                                                            }
                                                            {column.id === "Appointments"
                                                                && <Button onClick={() => { handleAppointments(row["_id"]) }} >{column.id}</Button>

                                                            }
                                                            {(column.id === "specialization" || column.id === "email" || column.id === "mobileNumber") && value}
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
                        count={doctors.length}
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
                onClose={() => { setOpen(false) }}
            >
                <DialogTitle>Doctor Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div className='text-light d-flex justify-content-between p-2 bg-secondary'>
                            <span><PersonIcon />{Doctor.name}</span>
                            <span><CallIcon />{Doctor.mobileNumber}</span>
                        </div>
                        <div className="card w-100">
                            <div className="card-body p-0 d-flex">
                                <table className="table table-sm m-4">

                                    <tbody>
                                        <tr>
                                            <td className='text-secondary'>Name:</td>
                                            <td>{Doctor.name}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-secondary'>Email:</td>
                                            <td>{Doctor.email}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-secondary'>Gender :</td>
                                            <td>{Doctor.gender === 'F' && 'Female' || Doctor.gender === 'M' && 'Male'}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-secondary'>Nationality :</td>
                                            <td>{Doctor.nationality}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-secondary'>Identity :</td>
                                            <td>{Doctor.identity}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-secondary'> Address:</td>
                                            <td>{Doctor.address}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-secondary'>Age:</td>
                                            <td>{Doctor.age}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-secondary'>Specialization:</td>
                                            <td>{Doctor.specialization}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-secondary'>Qualification:</td>
                                            <td>{Doctor.qualification}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-secondary'>Year of Experience:</td>
                                            <td>{Doctor.yearofExper}</td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }} className="text-white bg-secondary">Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                open={openpatientslist}
                onClose={() => { setOpenpatientslist(false) }}
            >
                <DialogTitle>Patients</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div className="card w-100">
                            <div className="card-body p-0 d-flex">
                                <table className="table table-sm m-4">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Mobile Number</th>
                                            <th>Email</th>
                                            <th>Identity</th>
                                            <th>Blood Group</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patients.map((record) => (
                                            <tr>
                                                <td>{record.name}</td>
                                                <td>{record.mobileNumber}</td>
                                                <td>{record.email}</td>
                                                <td>{record.identity}</td>
                                                <td>{record.bloodgroup}</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpenpatientslist(false) }} className="text-white bg-secondary">Close</Button>
                </DialogActions>
            </Dialog>
             <Dialog
                fullWidth={true}
                maxWidth={'md'}
                open={openappointments}
                onClose={() => { setOpenappointments(false) }}
            >
                <DialogTitle>Todays Appointments</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div className="card w-100">
                            <div className="card-body p-0 d-flex">
                                <table className="table table-sm m-4">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Mobile Number</th>
                                            <th>Time</th>
                                            <th>Isvisited</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointments.map((record) => (
                                            <tr>
                                                <td>{record.name}</td>
                                                <td>{record.mobileNumber}</td>
                                                <td>{record.time}</td>
                                                <td>{record.isvisited === true ? "Visited" : "Not Visited"}</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpenappointments(false) }} className="text-white bg-secondary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}