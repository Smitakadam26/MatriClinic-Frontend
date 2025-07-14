import { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call'
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

export default function Patients() {
    const { id } = useParams();
    const navigate = useNavigate();
    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'email', label: 'Email', minWidth: 170 },
        { id: 'mobileNumber', label: 'Mobile Number ', minWidth: 170 },
        { id: 'doctor', label: 'Doctor', minWidth: 170 },
        { id: "action", label: 'Action', minWidth: 170 },
    ];
    const [Patient, setPatient] = useState({});
    const [patients, setpatients] = useState([]);
    const [allpatients, setallpatients] = useState([]);
    const [open, setOpen] = useState(false);
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
            let result = await fetch("http://localhost:8080/patients");
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
        console.log(patients)
    },[]);
    const fetchpatient = async (id) => {
        console.log(id)
        try {
            let result = await fetch("http://localhost:8080/patients/" + id);
            result = await result.json();
            console.log(result);
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
        setOpen(true);
    }
    function handleSearchClick(searchVal) {

        if (searchVal === "") { setpatients(patients); return; }
        const filterBySearch = allpatients.filter((item) => {
            if (item.name.toLowerCase()
                .includes(searchVal.toLowerCase())) { return item; }
        })
        console.log(filterBySearch)
        setpatients(filterBySearch);
    }
    return (
        <div>
            <div className="container mt-2" >
                <div className="d-flex justify-content-between">
                    <h1  style={{fontFamily:"Arial"}}>All Patients</h1>
                    <div className=''>
                        <Search className='d-flex border'>

                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={e => handleSearchClick(e.target.value)}

                            />
                           <SearchIcon className="m-2"/>
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
                onClose={() => { setOpen(false) }}
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
                                        <tr>
                                            <td className="text-secondary">Name:</td>
                                            <td>{Patient.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-secondary">Date of Birth:</td>
                                            <td>{new Date(Patient.dateOfBirth).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-secondary">Nationality :</td>
                                            <td>{Patient.nationality}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-secondary">Identity :</td>
                                            <td>{Patient.identity}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-secondary"> Matrical Status:</td>
                                            <td>{Patient.matricalStatus}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-secondary"> Address:</td>
                                            <td>{Patient.address}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-secondary">Age:</td>
                                            <td>{Patient.age}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-secondary">Doctor:</td>
                                            <td>{Patient.doctor}</td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button className="text-white bg-secondary" onClick={() => { setOpen(false) }}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}