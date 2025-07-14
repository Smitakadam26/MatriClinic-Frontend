import "./Home.css";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Home() {
    const [credentials, setCredentials] = useState({ id: "", password: "" });
    const [error, setError] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const getusers = async () => {
        try {
            let result = await fetch("http://localhost:8080/doctors");
            result = await result.json();
            setUsers(result);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { id, password } = credentials;

        // Validate credentials
        const user = users.find(
            (user) => user.email === id && user.password === password
        );
        if (user) {
            alert("Login successful!");
            navigate(`/Doctor/${user._id}`, { replace: true });
        } else {
            setError("Invalid username or password");
        }
    };
    return (
        <div>
            <h1 className="heading mx-5 mt-5">
                <span className="mt-5">We are at the heart of appropriate care</span>
            </h1>
            <div className="d-flex justify-content-around ms-4 gap-2 mt-5">
                <div className="teacher-dashboard mt-5">
                    <h1 className="mx-auto text-center text-white mt-5">Login As Doctor</h1>
                    <div className="d-grid gap-2 mx-auto justify-content-center mt-5">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-1 mt-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Email"
                                name="id"
                                value={credentials.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-2 mt-4">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                            />
                        </div>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <Button type="submit" className="bg-warning text-white col-12 mb-3 mt-4">
                            Login
                        </Button>
                    </form>
                    </div>
                </div>
                <div className="mt-5 w-50">
                    <h1 style={{ fontSize: "100px", color: "#c3255e", marginLeft: "50px" }}>
                        Women's Healthcare
                    </h1>
                    <h2 className="text-warning" style={{ fontSize: "50px" }}>
                        Happy Maternity
                    </h2>
                </div>
            </div>
        </div>
    );
}
