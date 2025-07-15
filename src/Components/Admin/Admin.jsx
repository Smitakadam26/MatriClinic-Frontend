import { Button } from "@mui/material"
import { Link, Outlet, useParams } from "react-router-dom"
import logo from '../assets/logo.png'
export default function Admin() {
    const { id } = useParams();
    return (
        <div>
            <h1 className="heading mx-5">
                <div className="d-flex flex-wrap justify-content-between">
                    <div>
                        <img src={logo} alt="logo" style={{ width: "40vh" }} />
                    </div>

                    <div className="navbar d-flex">
                        <div className="d-flex flex-wrap">
                            <Button><Link to={`/Admin/${id}`} className="text-dark text-decoration-none">Appointments</Link></Button>
                            <Button><Link to='Registration' className="text-dark text-decoration-none">Registration</Link></Button>
                            <Button><Link to='Patients' className="text-dark text-decoration-none">Patients</Link></Button>
                            <Button><Link to='Doctors' className="text-dark text-decoration-none">Doctors</Link></Button>
                            <Button><Link to='Profile' className="text-dark text-decoration-none font-weight-bold">Profile</Link></Button>
                        </div>
                    </div>
                </div>

            </h1>
            <Outlet />
        </div>
    )
}