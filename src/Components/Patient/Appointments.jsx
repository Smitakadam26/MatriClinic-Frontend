import { useState } from "react";
import { useParams } from "react-router-dom";
import "../Home/Home.css"
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function Appointments() {
    const { id } = useParams();
    const [appointments, setappointments] = useState([]);
    const [dataDate,setdataDate] = useState();
    const currentdate = new Date();

    const fixedDate = dayjs(dataDate);
    const fetchappointments = async (id) => {
        console.log(id)
        try {
            let result = await fetch(`http://localhost:8080/Appointments/patientapmnt?patientid=${id}`);
            result = await result.json();
            console.log(result);
            const filterBySearch = result.filter((item) => {
            if (item.isvisited === false) { return item; }
        })
            setdataDate(filterBySearch[0].date)
            setappointments(result);
        }
        catch (err) {
            console.error("Error", err)
        }
    }
    const formatdate = (dateStr) => {
        const date = new Date(dateStr);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });

        const formattedDate = `${day} ${month}`;
        return formattedDate;

    }
    useState(() => {
        fetchappointments(id)
        //console.log(appointments.filter((r)=> (r.date)))
    
    }, [id])
    return (
        <div>
            <div className="min-h-screen bg-background p-4 border rounded-3 container mt-5 transperent" style={{ borderColor: "rgba(247, 246, 246, 0.94)"}}>
                <div className="max-w-7xl mx-auto">

                    <div className="d-flex justify-content-between">
                        <div>
                            <h5>Calendar & Appointments</h5>
                            <h5><span className="text-secondary" style={{ fontFamily: "Arial" }}>{currentdate.toDateString()}</span></h5>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                                    <DateCalendar value={fixedDate} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div>
                            <h5>Appointments</h5>
                            <div style={{ height: "60vh", overflowY: "scroll" }} className="transperent">
                                {appointments.map((appointment) => (
                                    <Card
                                        key={appointment.id}
                                        className='border-l-4 hover:shadow-md transition-shadow'
                                    >
                                        <CardContent className="border rounded-3 p-3" style={{ borderColor: "rgba(247, 246, 246, 0.94)", width: "80vh" }}>
                                            <div className="d-flex items-center justify-between">
                                                <div className="flex-1">

                                                    <div className="">
                                                        <CalendarMonthIcon className="h-4 p-1 w-5" />
                                                        <span>{formatdate(appointment.date)}</span>{!appointment.isvisited && <span className="text-secondary transperent border rounded-3 m-3 p-1"> Scheduled </span>}
                                                    </div>

                                                    <div className="d-flex align-items-center gap-4 text-sm text-muted-foreground mb-1 text-secondary">
                                                        <div className="flex items-center gap-1">
                                                            <PersonOutlineIcon className="h-2 p-1 w-4" />
                                                            <span>{appointment.doctor}</span>
                                                        </div>

                                                        <div className="d-flex align-items-center gap-1">
                                                            <AccessTimeIcon className="h-5 p-1 w-5" />
                                                            <span>{appointment.time}</span>
                                                        </div>
                                                    </div>

                                                    <div className="m-2 d-flex float-right gap-2 text-sm text-muted-foreground mb-1 text-secondary">
                                                        <div className="flex align-items-center gap-1">
                                                            <span>{appointment.month} month -</span>
                                                        </div>

                                                        <div className="d-flex align-items-center gap-1">
                                                            <span>{appointment.week} week</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}

                                {appointments.length === 0 && (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No appointments to display
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}