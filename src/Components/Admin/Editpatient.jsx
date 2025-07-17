import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

export default function Editpatient() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setpatient] = useState({});

    const [open, setOpen] = useState(false);


    const fetchpatient = async (id) => {
        console.log(id)
        try {
            let result = await fetch("https://matri-clinic-backend-tau.vercel.app/patients/" + id);
            result = await result.json();
            console.log(result);
            setpatient(result);
            const isoDate = result.dateOfBirth;
            const date = new Date(isoDate);
            const formatted = date.toISOString().split("T")[0];
            setpatient((prev) => ({ ...prev, ["dateOfBirth"]: formatted }))
        }
        catch (err) {
            console.error("Error", err)
        }
    }
    useEffect(() => {
        fetchpatient(id);
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setpatient({ ...patient, [name]: value })
    }
    const handleEdit = (id, newState) => {

        fetch("https://matri-clinic-backend-tau.vercel.app/patients/" + id, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(patient),
        })
            .then((response) => {
                console.log(response);
                setOpen(true)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <>
            <div className="container mt-2">
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
                        Information updated succesfully
                    </Alert>
                </Collapse>
                <h1>Edit Patient</h1>
                <div className='border rounded-3 p-3 mt-2 bg'>
                    <form className="row g-3 mt-2">
                        <div className="col-md-3">
                            <label className="form-label" placeholder="Name">Name:</label>
                            <input type="Name"
                                name='name'
                                className="form-control"
                                placeholder="Enter Full Name"
                                value={patient.name}
                                onChange={(e) => { handleChange(e) }} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Email :</label>
                            <input type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter Email"
                                value={patient.email}
                                onChange={(e) => { handleChange(e) }}
                                aria-label="Speciality" />
                        </div>
                        <fieldset className="col md-3">
                            <legend className="col-form-label col-sm-2 pt-0 w-100">Matrical Status : </legend>
                            <div className="col-sm-10">
                                <div className="form-check">
                                    <input className="form-check-input"
                                        type="radio"
                                        name="matricalStatus"
                                        value="unMarried"
                                        checked={patient.matricalStatus === "unMarried"}
                                        onChange={(e) => { handleChange(e) }}
                                    />
                                    <label className="form-check-label" >
                                        UnMarried
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input"
                                        type="radio"
                                        name="matricalStatus"
                                        value="Married"
                                        checked={patient.matricalStatus === "Married"}
                                        onChange={(e) => { handleChange(e) }}
                                    />
                                    <label className="form-check-label" >
                                        Married
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                        <div className="col-md-3">
                            <label className="form-label">Date Of Birth :</label>
                            <input type="date"
                                name='dateOfBirth'
                                className="form-control"
                                value={patient.dateOfBirth}
                                onChange={(e) => { handleChange(e) }}
                                placeholder="mm/dd/yyyy" />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label" placeholder="Name">Mobile number :</label>
                            <input type='number'
                                className="form-control"
                                name='mobileNumber'
                                placeholder="Mobile number"
                                value={patient.mobileNumber}
                                onChange={(e) => { handleChange(e) }}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Age :</label>
                            <input type="number"
                                name="age"
                                className="form-control"
                                placeholder="Enter Age"
                                value={patient.age}
                                onChange={(e) => { handleChange(e) }}
                                aria-label="Speciality" />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Blood group : </label>
                            <input type="text"
                                name="bloodgroup"
                                className="form-control"
                                placeholder="Enter Blood group :"
                                value={patient.bloodgroup}
                                onChange={(e) => { handleChange(e) }}
                                aria-label="Speciality" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Menstrual stop date: </label>
                            <input type="date"
                                name="menstrualstopdate"
                                className="form-control"
                                placeholder="Enter Menstrual stop date"
                                value={patient.menstrualstopdate}
                                onChange={(e) => { handleChange(e) }}
                                aria-label="Speciality" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Expected Birth Date: </label>
                            <input type="date"
                                name="birthdate"
                                className="form-control"
                                placeholder="Enter Birth Date"
                                value={patient.birthdate}
                                onChange={(e) => { handleChange(e) }}
                                aria-label="Speciality" />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Nationality :</label>
                            <input type="text"
                                name="nationality"
                                className="form-control"
                                placeholder="Enter nationality"
                                value={patient.nationality}
                                onChange={(e) => { handleChange(e) }}
                                aria-label="Speciality" />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Identification Number :</label>
                            <input type="number"
                                name="identity"
                                className="form-control"
                                placeholder="Enter Identification Number (Aadhar or Pan Numner)"
                                value={patient.identity}
                                onChange={(e) => { handleChange(e) }}
                                aria-label="Speciality" />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Address :</label>
                            <input type="text"
                                name="address"
                                className="form-control"
                                placeholder="Enter Address"
                                value={patient.address}
                                onChange={(e) => { handleChange(e) }}
                                aria-label="Speciality" />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Consulting Doctor :</label>
                            <input type="text"
                                name="doctor"
                                className="form-control"
                                placeholder="Enter doctor"
                                value={patient.doctor}
                                onChange={(e) => { handleChange(e) }}
                                aria-label="Speciality" />
                        </div>
                        <div className="text-center">
                            <Button className="bg-secondary text-white" onClick={() => { handleEdit(id) }}><EditIcon />Edit</Button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}