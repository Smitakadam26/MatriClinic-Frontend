import './App.css';
import "./index.css";
import Home from "./pages/Home";
import Patientlogin from "./pages/Patientlogin";
import Admin from "./pages/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Registration from "./pages/Registration";
import Adminlogin from "./pages/Adminlogin";
import Editpatient from "./pages/Editpatient";
import Patient from "./pages/Patient";
import Health from "./pages/Health";
import PatientProfile from "./pages/PatientProfile";
import Food from "./pages/Food";
import Exercise from "./pages/Exercise";
import Todaysappointments from './pages/Todaysappointments'
import Forgetpassword from "./pages/Forgetpassword";
import Appointments from "./pages/PatientAppointments";
import ProtectedRoute from "./components/ProtectedRoute"
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
