
import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import { Button } from "@mui/material";
import wallpaper from '../assets/images/wallpaper.png';
import { useAuth } from "../context/AuthContext";


export default function PatientProfile() {
    const [Patient, setPatient] = useState({});
    const navigate = useNavigate();
    const {user,logout} = useAuth();
    const id = user.id;
    const fetchPatient = async (id) => {
        try {
            const res = await fetch(`https://matri-clinic-backend-tau.vercel.app/patients/` + id);
            const data = await res.json();
            setPatient(data);
        }
        catch (err) {
            console.error("Error", err)
        }
    }
    useEffect(() => {
        fetchPatient(id);
    }, [id])
    const [avatarSrc, setAvatarSrc] = useState(undefined);

    const handleAvatarChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }

    };
    const handlelogout = () => {

        fetch(`https://matri-clinic-backend-tau.vercel.app/patients/logout`)
            .then((response) => {
                console.log(response);
                logout();
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            });

    }
    return (
        <div className="mt-3 container"> 
            <div className="border rounded-2" style={{ height: "30vh", position: "relative", backgroundImage: `url(${wallpaper})` }}>
                <div style={{
                    position: "absolute",
                    bottom: "0px", 
                    left: "8%",
                    transform: "translateX(-50%)", 

                }}>
                    <ButtonBase
                        component="label"
                        role={undefined}
                        tabIndex={-1}
                        aria-label="Avatar image"
                        sx={{
                            borderRadius: '50%',
                            top: 40,
                            width: 120,
                            height: 120,
                            overflow: 'hidden',
                            '&:has(:focus-visible)': {
                                outline: '3px solid',
                                outlineOffset: '3px',
                            },
                        }}
                    >
                        <Avatar
                            alt="Upload new avatar"
                            src={avatarSrc}
                            sx={{
                                width: 120,
                                height: 120,
                            }}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            style={{
                                opacity: 0,
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                cursor: 'pointer',
                            }}
                            onChange={handleAvatarChange}
                        />
                    </ButtonBase>


                </div>
            </div>
            <div className="container">
                <div className="row g-3 mx-auto mt-5 container profile">
                    <h3 className="col-md-6">Name : <span className=" text-secondary"> {Patient.name}</span></h3>
                    <h3 className="col-md-6">Email : <span className=" text-secondary"> {Patient.email}</span></h3>
                    <h3 className="col-md-6">Mobile Number : <span className=" text-secondary"> {Patient.mobileNumber}</span></h3>
                    <h3 className="col-md-6">Date of Birth : <span className=" text-secondary"> {Patient.dateOfBirth}</span></h3>
                    <h3 className="col-md-6">Address : <span className=" text-secondary"> {Patient.address}</span></h3>
                    <h3 className="col-md-6">Nationality : <span className=" text-secondary"> {Patient.nationality}</span></h3>
                    <h3 className="col-md-6">Matrical status: <span className=" text-secondary"> {Patient.matricalStatus}</span></h3>
                    <h3 className="col-md-6">Doctor : <span className=" text-secondary" > {Patient.doctor}</span></h3>
                    <h3 className="col-md-6">Identification : <span className=" text-secondary"> {Patient.identity}</span></h3>
                </div>
                <Button onClick={() => { handlelogout() }}  className="mt-3 bg-secondary text-white float-end">Logout</Button>
            </div>
        </div >
    )
}