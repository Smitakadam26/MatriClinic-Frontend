import { useState } from "react";
import Doctorregister from "./Doctorregister";
import Patientregister from "./Patientregister";
import { Button } from "@mui/material";
import wallpaper from '../assets/wallpaper.png'
export default function Registration() {
    const [type, setType] = useState("Patient");
    return (
        <div style={{
            backgroundImage: `url(${wallpaper})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}  >
            <div className="container pt-3">
                <Button onClick={() => { setType("Patient") }} className="text-dark ml-5">Patient</Button>
                <Button onClick={() => { setType("Doctor") }} className="text-dark ">Doctor</Button>
            </div>
            <div className="d-flex justify-content-center gap-5">
                {type === "Patient" && <Patientregister />}
                {type === "Doctor" && <Doctorregister />}

            </div>
        </div>
    )
}