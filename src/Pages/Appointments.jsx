import { useState, useEffect } from "react";
import BasicInfoSection from "./BasicInfoSection";
import AppointmentsSection from '../components/AppointmentSection'
import NextAppointmentSection from "./NextAppointmentSection";
import TestResultsSection from "./TestResultSection";
export default function Appointments({ patient_Id, appointmentID }) {
    const [patient, setPatient] = useState({});
    const [appointmt, setappointmt] = useState({});
    const [slots, setslots] = useState([]);
    const [Time, setTime] = useState();
    const [date, setdate] = useState();
    const [currentdate, setCurrentdate] = useState();
    const handleFileChange = (e) => {
        setappointmt((prev) => ({
            ...prev,
            [e.target.name]: e.target.files[0]
        }))
    };
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
            let result = await fetch("https://matri-clinic-backend-tau.vercel.app/patients/" + id);
            result = await result.json();
            console.log(result);
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
            const res = await fetch(`https://matri-clinic-backend-tau.vercel.app/Appointments/availability?date=${date}&&Doctorid=${patient.Doctorid}`);
            const data = await res.json();
            setdate(data.date)
            setslots(data.availableSlots)
            console.log(data.availableSlots);
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
        const formatted = today.toISOString().split('T')[0]; // "YYYY-MM-DD"
        setCurrentdate(formatted);
        getpatient(patient_Id);
    }, [patient_Id, appointmentID]);
    const handleSubmit = async () => {
        console.log(appointmt)
        if (
            appointmt.name &&
            appointmt.mobileNumber &&
            appointmt.date &&
            appointmt.time &&
            appointmt.doctor &&
            appointmt.dateofvisit
        ) {
            const formData = new FormData();
            formData.append("name", appointmt.name);
            formData.append("mobileNumber", appointmt.mobileNumber);
            formData.append("bloodpresure", appointmt.bloodpresure);
            formData.append("bloodsugar", appointmt.bloodsugar);
            formData.append("date", appointmt.date);
            formData.append("time", appointmt.time);
            formData.append("identity", appointmt.identity);
            formData.append("vaccine", appointmt.vaccine);
            formData.append("Patient_Id", appointmt.Patient_Id);
            formData.append("Doctorid", appointmt.Doctorid);
            formData.append("doctor", appointmt.doctor);
            formData.append("weight", appointmt.weight);
            formData.append("month", appointmt.month);
            formData.append("week", appointmt.week);
            formData.append("temperature", appointmt.temperature);
            formData.append("fundalHeight", appointmt.fundalHeight);
            formData.append("heartrate", appointmt.heartrate);
            formData.append("fetalMovement", appointmt.fetalMovement);
            formData.append("fetalHeartsound", appointmt.fetalHeartsound);
            formData.append("fetalPosition", appointmt.fetalPosition);
            formData.append("labtestfile", appointmt.labtestfile);
            formData.append("ultrasonicreport", appointmt.ultrasonicreport);
            formData.append("bloodtestfile", appointmt.bloodtestfile);
            formData.append("urinetestfile", appointmt.urinetestfile);
            formData.append("stresstestfile", appointmt.stresstestfile);
            formData.append("dateofvisit", appointmt.dateofvisit);
            formData.append("isvisited", appointmt.isvisited);
            try {
                const res = await fetch('https://matri-clinic-backend-tau.vercel.app/Appointments', {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();
                if (res.ok) {
                    alert('Upload successful');
                    console.log(data);
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
                    window.location.reload();
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
                            handleFileChange={handleFileChange}
                        />
                    </form>

                    <NextAppointmentSection
                        appointmt={appointmt}
                        slots={slots}
                        date={date}
                        Time={Time}
                        handledate={handledate}
                        handleSubmit={handleSubmit}
                    />
                </div>

            </div>
        </div>
    )
}
