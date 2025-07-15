import { useState, useEffect } from "react";
import { Button } from "@mui/material";

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
    const getpatient = async (id) => {
        console.log(id)
        try {
            let result = await fetch("https://matriclinic-website-backend.onrender.com/patients/" + id);
            result = await result.json();
            console.log(result);
            setPatient(result);
            const isoDate = result.dateOfBirth;
            const date = new Date(isoDate);
            const formatted = date.toISOString().split("T")[0];
            setPatient((prev) => ({ ...prev, ["dateOfBirth"]: formatted }))
        }
        catch (err) {
            console.error("Error", err)
        }
    }
    const fetchAvailability = async (date) => {
        try {
            const res = await fetch(`https://matriclinic-website-backend.onrender.com/Appointments/availability?date=${date}&&Doctorid=${patient.Doctorid}`);
            const data = await res.json();
            setdate(data.date)
            setslots(data.availableSlots)
            console.log(data.availableSlots);
            setappointmt((prev) => ({
                ...prev,
                ["name"]: patient.name,
                ["mobileNumber"]: patient.mobileNumber,
                ["doctor"]: patient.doctor,
                ["Doctorid"]:patient.Doctorid,
                ["Patient_Id"]: patient._id,
                ["isvisited"]: false,
                ["dateofvisit"]: currentdate,
                ["identity"]:patient.identity
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
        console.log(patient_Id, appointmentID)
    }, []);
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
                const res = await fetch('http://localhost:8080/Appointments', {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();
                if (res.ok) {
                    alert('Upload successful');
                    console.log(data);
                    fetch("http://localhost:8080/Appointments//editvisitstatus/" + appointmentID, {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ ["isvisited"]: true }),
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
                <div className='p-4'>
                    <form >
                        <div className="row g-3 mt-3"  >
                            <h4>Basic info:</h4>
                            <div className="col-md-3">
                                <label className="form-labe" placeholder="Name">Name : </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={patient.name || " "}
                                    className="form-control"
                                    readOnly />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Doctor : </label>
                                <input
                                    type="text"
                                    name="doctor"
                                    value={patient.doctor || " "}
                                    className="form-control"
                                    readOnly />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label w-0" placeholder="Name">Mobile No. : </label>
                                <input
                                    type="number"
                                    name="mobileNumber"
                                    value={patient.mobileNumber || " "}
                                    className="form-control"
                                    readOnly />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Date of Visit:</label>
                                <input type="date"
                                    name='dateofvisit'
                                    className="form-control"
                                    value={currentdate}
                                    onChange={(e) => { handleChange(e) }} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Month:</label>
                                <input type="number"
                                    name='month'
                                    className="form-control"
                                    placeholder="Enter month"
                                    value={appointmt.month}
                                    onChange={(e) => { handleChange(e) }} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Week:</label>
                                <input type="number"
                                    name='week'
                                    className="form-control"
                                    placeholder="Enter Week"
                                    value={appointmt.week}
                                    onChange={(e) => { handleChange(e) }} />
                            </div>
                        </div>
                        <div className="row g-3 mt-3"  >
                            <h4>Vital Signs:</h4>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Blood pressure:</label>
                                <input type="text"
                                    name='bloodpresure'
                                    className="form-control"
                                    placeholder="Enter blood presure"
                                    value={appointmt.bloodpresure}
                                    onChange={(e) => { handleChange(e) }} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Blood sugar:</label>
                                <input type="text"
                                    name='bloodsugar'
                                    className="form-control"
                                    placeholder="Enter blood sugar"
                                    value={appointmt.bloodsugar}
                                    onChange={(e) => { handleChange(e) }} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Weight:</label>
                                <input type="number"
                                    name='weight'
                                    className="form-control"
                                    placeholder="Enter Weight"
                                    value={appointmt.weight}
                                    onChange={(e) => { handleChange(e) }} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Temperarture:</label>
                                <input type="text"
                                    name='temperature'
                                    className="form-control"
                                    placeholder="Enter Temperarture"
                                    value={appointmt.temperarture}
                                    onChange={(e) => { handleChange(e) }} />
                            </div>
                        </div>
                        <div className="row g-3 mt-3">
                            <h4>Abdominal examination:</h4>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Fundal height:</label>
                                <input type="text"
                                    name='fundalHeight'
                                    className="form-control"
                                    placeholder="Enter Fundal Height"
                                    value={appointmt.fundalHeight}
                                    onChange={(e) => { handleChange(e) }} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Fetal heart rate:</label>
                                <input type="text"
                                    name='heartrate'
                                    className="form-control"
                                    placeholder="Enter Fetal heart rate"
                                    value={appointmt.heartrate}
                                    onChange={(e) => { handleChange(e) }} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Fetal Position:</label>
                                <input type="text"
                                    name='fetalPosition'
                                    className="form-control"
                                    placeholder="Enter Fetal Position"
                                    value={appointmt.fetalPosition}
                                    onChange={(e) => { handleChange(e) }} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Fetal Heart Sound:</label>
                                <input type="text"
                                    name='fetalHeartSound'
                                    className="form-control"
                                    placeholder="Enter Fetal Heart Sound"
                                    value={appointmt.fetalHeartSound}
                                    onChange={(e) => { handleChange(e) }} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Fetal Movement:</label>
                                <input type="text"
                                    name='fetalMovement'
                                    className="form-control"
                                    placeholder="Enter Fetal Movement"
                                    value={appointmt.fetalMovement}
                                    onChange={(e) => { handleChange(e) }} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Vaccine:</label>
                                <input type="text"
                                    name='vaccine'
                                    className="form-control"
                                    placeholder="Enter Vaccine"
                                    value={appointmt.vaccine}
                                    onChange={(e) => { handleChange(e) }} />
                            </div>
                        </div>
                        <div className="row g-3 mt-3">
                            <h4>Test results:</h4>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Upload Lab test File:</label>
                                <input type="file"
                                    name='labtestfile'
                                    className="form-control"
                                    id="image"
                                    onChange={(e) => { handleFileChange(e) }} />
                            </div>
                            
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Upload Blood test File:</label>
                                <input type="file"
                                    name='bloodtestfile'
                                    className="form-control"
                                    id="image"
                                    onChange={(e) => { handleFileChange(e) }} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Upload Urine test File:</label>
                                <input type="file"
                                    name='urinetestfile'
                                    className="form-control"
                                    id="image"
                                    onChange={(e) => { handleFileChange(e) }} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label" placeholder="Name">Upload stress test File:</label>
                                <input type="file"
                                    name='stresstestfile'
                                    className="form-control"
                                    id="image"
                                    onChange={(e) => { handleFileChange(e) }} />
                            </div>
                            <div className="col-md-6">
                                <fieldset className="col md-6" style={{ fontFamily: "Arial" }}>
                                    <legend className="col-form-label col-sm-5 pt-0">Upload Ultrasonic reports File{"(Sonography reports)"}:</legend>
                                    <div className="col-sm-10" >
                                        <div className="form-check" style={{ fontFamily: "Arial" }}>
                                            <input className="form-check-input"
                                                type="radio"
                                                name="ultrasonicreportType"
                                                value="Early pregnancy scan"
                                                checked={appointmt.ultrasonicreportType === "Early pregnancy scan"}
                                                onChange={(e) => { handleChange(e) }}
                                            />
                                            <label className="form-check-label" >
                                                Early pregnancy scan
                                            </label>
                                        </div>
                                        <div className="form-check" style={{ fontFamily: "Arial" }}>
                                            <input className="form-check-input"
                                                type="radio"
                                                name="ultrasonicreportType"
                                                value="Ultrasound NT/NB scan"
                                                checked={appointmt.ultrasonicreportType === "Ultrasound NT/NB scan"}
                                                onChange={(e) => { handleChange(e) }}
                                            />
                                            <label className="form-check-label" >
                                                Ultrasound NT/NB scan
                                            </label>
                                        </div>
                                        <div className="form-check" style={{ fontFamily: "Arial" }}>
                                            <input className="form-check-input"
                                                type="radio"
                                                name="ultrasonicreportType"
                                                value="Ultrasound Level 1"
                                                checked={appointmt.ultrasonicreportType === "Ultrasound Level 1"}
                                                onChange={(e) => { handleChange(e) }}
                                            />
                                            <label className="form-check-label" >
                                                Ultrasound Level 1
                                            </label>
                                        </div>
                                        <div className="form-check" style={{ fontFamily: "Arial" }}>
                                            <input className="form-check-input"
                                                type="radio"
                                                name="ultrasonicreportType"
                                                value="Ultrasound Level 2"
                                                checked={appointmt.ultrasonicreportType === "Ultrasound Level 2"}
                                                onChange={(e) => { handleChange(e) }}
                                            />
                                            <label className="form-check-label" >
                                                Ultrasound Level 2
                                            </label>
                                        </div>
                                        <div className="form-check" style={{ fontFamily: "Arial" }}>
                                            <input className="form-check-input"
                                                type="radio"
                                                name="ultrasonicreportType"
                                                value="Growth scan"
                                                checked={appointmt.ultrasonicreportType === "Growth scan"}
                                                onChange={(e) => { handleChange(e) }}
                                            />
                                            <label className="form-check-label" >
                                                Growth scan
                                            </label>
                                        </div>
                                        {appointmt.ultrasonicreportType && <div className="col-md-6">
                                            <input type="file"
                                                name='ultrasonicreport'
                                                className="form-control"
                                                id="image"
                                                onChange={(e) => { handleFileChange(e) }} />
                                        </div>}
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </form>
                    <h2 className="mt-3"> Book Next Appointment</h2>
                    <div className="mt-4 p-2">
                        <form className="row g-3">

                            <div className="col-md-3">
                                <label className="form-label p-2" placeholder="Name">Date : </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Enter your date"
                                    name="date"
                                    value={appointmt.date || " "}
                                    onChange={(e) => { handledate(e) }}
                                />
                            </div>

                            <div className="d-flex ">
                                <label className="form-label w-0 p-2" placeholder="Name">Slots : </label>
                                <span className="d-flex gap-3 p-2">
                                    {slots.map((time) => (
                                        <Button className="text-white bg-primary" onClick={() => { setappointmt({ ...appointmt, ["time"]: time }); setTime(time) }}>
                                            {time}
                                        </Button>
                                    ))}
                                </span>
                            </div>

                            <div className="d-flex justify-content-around">
                                <span>Date : {date}</span>
                                <span>Time : {Time}</span>
                            </div>

                            <div className="d-grid gap-2 col-7 mx-auto mb-3">
                                <Button className="text-white bg-primary" onClick={() => { handleSubmit() }} >Submit</Button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}
