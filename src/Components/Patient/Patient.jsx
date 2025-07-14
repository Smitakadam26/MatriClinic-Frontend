import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'
export default function Patient () {
    const {id} = useParams();
        return(
            <div>
                <div className="d-flex justify-content-between heading mx-5">
                    <img src={logo} alt="logo" style={{ width: "40vh" }} />
                    <div className="navbar d-grid ">
                            <div className="d-flex">
                                <Button><Link to={`/Patient/${id}`} className="text-dark text-decoration-none">Health</Link></Button>
                                <Button><Link to='Appointments' className="text-dark text-decoration-none">Appointments </Link></Button>
                                <Button><Link to='Food' className="text-dark text-decoration-none">Diet Plan</Link></Button>
                                <Button><Link to='Exercise' className="text-dark text-decoration-none">Exercises</Link></Button>
                                <Button><Link to='PatientProfile' className="text-dark text-decoration-none font-weight-bold">Profile</Link></Button>
                            </div>
                    </div>
                </div>
                <Outlet/>
            </div>
    )
}