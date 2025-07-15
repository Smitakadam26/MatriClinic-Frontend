import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import { Button } from "@mui/material";
import wallpaper from "../assets/profilewallpaper.webp"

export default function Profile() {
    const { id } = useParams();
    const [admin, setadmin] = useState({});
    const navigate = useNavigate();
    console.log(id)
    const fetchadmin = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/admin/` + id);
            const data = await res.json();
            setadmin(data);
        }
        catch (err) {
            console.error("Error", err)
        }
    }
    useEffect(() => {
        fetchadmin(id);
    }, [])
    const [avatarSrc, setAvatarSrc] = useState(undefined);

    const handleAvatarChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            // Read the file as a data URL
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }

    };
    const handlelogout = () => {
        fetch(`http://localhost:8080/admin/logout`)
            .then((response) => {
                console.log(response);
                localStorage.removeItem("token")
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
                    bottom: "0px", // space from bottom
                    left: "8%",
                    transform: "translateX(-50%)", // center horizontally

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
                <div className="row g-3 mx-auto mt-5 container profile"  style={{fontFamily:"Arial"}}>
                    <h3 className="col-md-6" >Email : <span className="text-secondary"> {admin.email}</span></h3>
                    <h3 className="col-md-6">Mobile Number : <span className="text-secondary"> {admin.mobileNumber}</span></h3>
                    <h3 className="col-md-6">Date of Birth : <span className="text-secondary"> {admin.dateOfBirth}</span></h3>
                </div>
                <Button onClick={() => { handlelogout() }} className="m-3 text-white bg-secondary">Logout</Button>
            </div>
        </div >
    )
}