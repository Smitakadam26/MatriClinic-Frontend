import './App.css';
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Home from "./Pages/Home";
import Patientlogin from "./Pages/Patientlogin";
import Admin from "./Pages/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Pages/Profile";
import Patients from "./Pages/Patients";
import Doctors from "./Pages/Doctors";
import Registration from "./Pages/Registration";
import Adminlogin from "./Pages/Adminlogin";
import Editpatient from "./Pages/Editpatient";
import Patient from "./Pages/Patient";
import Health from "./Pages/Health";
import PatientProfile from "./Pages/PatientProfile";
import Food from "./Pages/Food";
import Exercise from "./Pages/Exercise";
import Todaysappointments from './Pages/Todaysappointments'
import { Navigate } from "react-router-dom";
import Forgetpassword from "./Pages/Forgetpassword";
import Appointments from "./Pages/PatientAppointments";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}
function App() {
  return (
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
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
