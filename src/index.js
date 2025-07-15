import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Home from "./Components/Home/Home";
import Patientlogin from "./Components/Home/Patientlogin";
import Admin from "./Components/Admin/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Components/Admin/Profile";
import Patients from "./Components/Admin/Patients";
import Doctors from "./Components/Admin/Doctors";
import Registration from "./Components/Admin/Registration";
import Adminlogin from "./Components/Home/Adminlogin";
import Editpatient from "./Components/Admin/Editpatient";
import Patient from "./Components/Patient/Patient";
import Health from "./Components/Patient/Health";
import PatientProfile from "./Components/Patient/PatientProfile";
import Food from "./Components/Patient/Food";
import Exercise from "./Components/Patient/Exercise";
import Todaysappointments from './Components/Admin/Todaysappointments'
import { Navigate } from "react-router-dom";
import Forgetpassword from "./Components/Home/Forgetpassword";
import Appointments from "./Components/Patient/Appointments";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="Home" element={<Home />} />
        <Route path="Adminlogin" element={<Adminlogin />} />
        <Route path="Patientlogin" element={<Patientlogin />} />
        <Route path="patients/resetpassword/:id/:token" element={<Forgetpassword/>}/>
        <Route path="/Admin/:id" element={<ProtectedRoute><Admin /></ProtectedRoute>}>
          <Route index element={<Todaysappointments />} />
          <Route path="Registration" element={<Registration/>}/>
          <Route path="Patients" element={<Patients />} />
          <Route path="Doctors" element={<Doctors />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Editpatient/:id" element={<Editpatient />} />
        </Route>
        <Route path="/Patient/:id" element={<ProtectedRoute><Patient /></ProtectedRoute>}>
          <Route index element={<Health/>} />
          <Route path="Appointments" element={<Appointments/>}/>
          <Route path="PatientProfile" element={<PatientProfile/>} />
          <Route path="Food" element={<Food/>} />
          <Route path="Exercise" element={<Exercise/>} />
        </Route>
        {/*
      <Route path="CoachSignUp" element={<CoachSignUp />}/>
      <Route path="Coachhome" element={<Coachhome />}/>
      <Route path="Usersignup" element={<Usersignup />}/>
      <Route path="Userhome" element={<Userhome />}/>
      <Route path="Myschedules" element={<Myschedules />}/>
      <Route path='Viewprofile' element={<Viewprofile/>}/>
      */}
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
