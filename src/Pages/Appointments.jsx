import { useState, useEffect } from "react";
import BasicInfoSection from "./BasicInfoSection";
import AppointmentsSection from '../components/AppointmentSection'
import NextAppointmentSection from "./NextAppointmentSection";
import TestResultsSection from "./TestResultSection";
import { getPatient, fetchDoctorAvailability } from "../services/api";

export default function Appointments({ patient_Id, appointmentID,setOpen }) {
    const [patient, setPatient] = useState({});
    const [appointmt, setappointmt] = useState({});
    const [slots, setslots] = useState([]);
    const [Time, setTime] = useState();
    const [date, setdate] = useState();
    const [currentdate, setCurrentdate] = useState();
    const [bloodTestFile, setBloodTestFile] = useState();
    const [urineTestFile, setUrineTestFile] = useState();
    const [labTestFile, setLabTestFile] = useState();
    const [ultraSonicReport, setUltraSonicReport] = useState();
    const [stressTestFile, setStressTestFile] = useState();
    const VitalSignsfields = [
        { label: "Fundal Height", name: "fundalHeight" },
        { label: "Fetal Heart Rate", name: "heartrate" },
        { label: "Fetal Position", name: "fetalPosition" },
        { label: "Fetal Heart Sound", name: "fetalHeartSound" },
        { label: "Fetal Movement", name: "fetalMovement" },
        { label: "Vaccine", name: "vaccine" },
    ];
    const AbdominalExamfields = [
        { label: "Blood Pressure", name: "bloodpresure" },
        { label: "Blood Sugar", name: "bloodsugar" },
        { label: "Weight", name: "weight", type: "number" },
        { label: "Temperature", name: "temperature" },
    ];
    const getpatient = async (id) => {
        try {
            let result = await getPatient(id);
            setPatient(result);
            const isoDate = result.dateOfBirth;
            const date = new Date(isoDate);
            const formatted = date.toISOString().split("T")[0];
            setPatient((prev) => ({ ...prev, dateOfBirth: formatted }))
        }
        catch (err) {
            console.error("Error", err)
        }
    }
    const fetchAvailability = async (date) => {
        try {
            const data = await fetchDoctorAvailability(date, patient.Doctorid);
            setdate(data.date)
            setslots(data.availableSlots)
            setappointmt((prev) => ({
                ...prev,
                name: patient.name,
                mobileNumber: patient.mobileNumber,
                doctor: patient.doctor,
                Doctorid: patient.Doctorid,
                Patient_Id: patient._id,
                isvisited: false,
                dateofvisit: currentdate,
                identity: patient.identity
            }))
        }
        catch (err) {
            console.error("Error", err)
        }

    }
    useEffect(() => {
        const today = new Date();
        const formatted = today.toISOString().split('T')[0];
        setCurrentdate(formatted);
        getpatient(patient_Id);
    }, [patient_Id, appointmentID]);

    const handleSubmit = async () => {
        if (
            appointmt.name &&
            appointmt.mobileNumber &&
            appointmt.date &&
            appointmt.time &&
            appointmt.doctor &&
            appointmt.dateofvisit
        ) {
            const formData = new FormData();
            Object.keys(appointmt).forEach((key) => {
                formData.append(key, appointmt[key]);
            });
            formData.append("labTestFile", labTestFile);
            formData.append("ultraSonicReport", ultraSonicReport);
            formData.append("bloodTestFile", bloodTestFile);
            formData.append("urineTestFile", urineTestFile);
            formData.append("stressTestFile", stressTestFile);
            try {
                const res = await fetch('https://matri-clinic-backend-tau.vercel.app/Appointments', {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();
                if (res.ok) {
                    alert('Upload successful');
                    fetch("https://matri-clinic-backend-tau.vercel.app/Appointments//editvisitstatus/" + appointmentID, {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ isvisited: true }),
                    })
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    setappointmt({})
                    setPatient({});
                    setdate();
                    setTime();
                    setOpen(false);
                } else {
                    alert('Upload failed');
                    console.error(data);
                }
            } catch (err) {
                console.error(err);
                alert('Error uploading file');
            }

        } else {
            alert("please fill all details");
        }

    }
    const handledate = (e) => {
        setTime();
        const { name, value } = e.target;
        setappointmt({ ...appointmt, [name]: value });
        fetchAvailability(e.target.value)
    }
    const handleChange = (e) => {
        setappointmt({ ...appointmt, [e.target.name]: e.target.value })
    }
    return (

        <div>
            <div className="container mt-2">
                <div className="p-4">
                    <form>
                        <BasicInfoSection
                            patient={patient}
                            appointmt={appointmt}
                            currentdate={currentdate}
                            handleChange={handleChange}
                        />

                        <AppointmentsSection
                            appointmt={appointmt}
                            handleChange={handleChange}
                            fields={VitalSignsfields}
                        />

                        <AppointmentsSection
                            appointmt={appointmt}
                            handleChange={handleChange}
                            fields={AbdominalExamfields}
                        />

                        <TestResultsSection
                            appointmt={appointmt}
                            handleChange={handleChange}
                            setStressTestFile={setStressTestFile}
                            setLabTestFile={setLabTestFile}
                            setUltraSonicReport={setUltraSonicReport}
                            setBloodTestFile={setBloodTestFile}
                            setUrineTestFile={setUrineTestFile}
                        />
                    </form>

                    <NextAppointmentSection
                        appointmt={appointmt}
                        slots={slots}
                        date={date}
                        setTime={setTime}
                        Time={Time}
                        setappointmt={setappointmt}
                        handledate={handledate}
                        handleSubmit={handleSubmit}
                    />
                </div>

            </div>
        </div>
    )
}
