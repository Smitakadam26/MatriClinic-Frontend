import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Slide
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTimeFilled";
import HeightIcon from "@mui/icons-material/Height";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";

import wallpaper from "../assets/images/wallpaper.png";

const Transition = (props) => <Slide direction="up" {...props} />;

export default function Health() {
    const { id } = useParams();
    const [appointments, setAppointments] = useState([]);
    const [admin, setAdmin] = useState([]);
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState("");
    const StatCard = ({ icon, label, value }) => (
        <Box
            sx={{
                p: 2,
                borderRadius: 3,
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                height: "100%",
            }}
        >
            <Typography variant="caption" color="text.secondary">
                {label}
            </Typography>
            <Typography variant="h6" fontWeight="bold">
                {icon} {value}
            </Typography>
        </Box>
    );

    useEffect(() => {
        fetchAppointments();
        fetchAdmin();
    }, [id]);

    const fetchAppointments = async () => {
        const res = await fetch(
            `https://matri-clinic-backend-tau.vercel.app/Appointments/patientapmnt?patientid=${id}`
        );
        setAppointments(await res.json());
    };

    const fetchAdmin = async () => {
        const res = await fetch(`https://matri-clinic-backend-tau.vercel.app/admin`);
        setAdmin(await res.json());
    };

    const openFile = (fileName) => {
        setFile(fileName);
        setOpen(true);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundImage: `linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)), url(${wallpaper})`,
                backgroundSize: "cover",
                p: 4,
            }}
        >
            <Typography variant="h4" color="white" fontWeight="bold" mb={4}>
               Health Records
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={7}>
                    {appointments.map((r, i) => (
                        <Card
                            key={i}
                            sx={{
                                mb: 3,
                                borderRadius: 4,
                                background: "linear-gradient(135deg, #ffffff, #f8f9fb)",
                                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                            }}
                        >
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" mb={2}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Appointment Summary
                                    </Typography>
                                    <Chip
                                        icon={<DateRangeIcon />}
                                        label={new Date(r.dateofvisit).toDateString()}
                                        color="primary"
                                        size="small"
                                    />
                                </Box>

                                <Grid container spacing={2}>
                                    {r.temperature && (
                                        <Grid item xs={6} sm={4}>
                                            <StatCard icon="🌡" label="Temperature" value={r.temperature} />
                                        </Grid>
                                    )}
                                    {r.weight && (
                                        <Grid item xs={6} sm={4}>
                                            <StatCard icon="⚖" label="Weight" value={r.weight} />
                                        </Grid>
                                    )}
                                    {r.bloodpresure && (
                                        <Grid item xs={6} sm={4}>
                                            <StatCard  label="Blood Pressure" value={r.bloodpresure} />
                                        </Grid>
                                    )}
                                    {r.heartrate && (
                                        <Grid item xs={6} sm={4}>
                                            <StatCard  label="Heart Rate" value={r.heartrate} />
                                        </Grid>
                                    )}
                                    {r.bloodsugar && (
                                        <Grid item xs={6} sm={4}>
                                            <StatCard
                                                icon={<BloodtypeIcon fontSize="small" />}
                                                label="Blood Sugar"
                                                value={r.bloodsugar}
                                            />
                                        </Grid>
                                    )}
                                    {r.fundalHeight && (
                                        <Grid item xs={6} sm={4}>
                                            <StatCard
                                                icon={<HeightIcon fontSize="small" />}
                                                label="Fundal Height"
                                                value={r.fundalHeight}
                                            />
                                        </Grid>
                                    )}
                                    {r.fetalPosition && (
                                        <Grid item xs={6} sm={4}>
                                            <StatCard
                                                icon={<ControlCameraIcon fontSize="small" />}
                                                label="Fetal Position"
                                                value={r.fetalPosition}
                                            />
                                        </Grid>
                                    )}
                                </Grid>

                                {(r.date || r.time) && (
                                    <Box
                                        mt={3}
                                        p={2}
                                        borderRadius={3}
                                        sx={{ backgroundColor: "#eef3ff" }}
                                    >
                                        <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                                            Next Appointment
                                        </Typography>
                                        {r.date && (
                                            <Typography variant="body2">
                                                <DateRangeIcon fontSize="small" /> {r.date}
                                            </Typography>
                                        )}
                                        {r.time && (
                                            <Typography variant="body2">
                                                <AccessTimeIcon fontSize="small" /> {r.time}
                                            </Typography>
                                        )}
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </Grid>

                <Grid item xs={12} md={5}>
                    <Card
                        sx={{
                            borderRadius: 4,
                            height: "100%",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" mb={3}>
                                Medical Reports
                            </Typography>

                            {appointments.map((r, i) => (
                                <Box key={i} mb={3}>
                                    <Chip
                                        label={new Date(r.dateofvisit).toDateString()}
                                        size="small"
                                        sx={{ mb: 1 }}
                                    />

                                    <Grid container spacing={1}>
                                        {[
                                            { file: r.labtestfile, label: "Lab Report" },
                                            { file: r.ultrasonicreport, label: "Ultrasound" },
                                            { file: r.bloodtestfile, label: "Blood Test" },
                                            { file: r.urinetestfile, label: "Urine Test" },
                                        ]
                                            .filter((f) => f.file)
                                            .map((f, idx) => (
                                                <Grid item xs={12} key={idx}>
                                                    <Button
                                                        fullWidth
                                                        variant="outlined"
                                                        startIcon={<SearchIcon />}
                                                        sx={{
                                                            justifyContent: "flex-start",
                                                            borderRadius: 3,
                                                            textTransform: "none",
                                                        }}
                                                        onClick={() => openFile(f.file)}
                                                    >
                                                        {f.label}
                                                    </Button>
                                                </Grid>
                                            ))}
                                    </Grid>
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


            <Dialog fullScreen open={open} TransitionComponent={Transition}>
                <AppBar>
                    <Toolbar>
                        <IconButton color="inherit" onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2 }} variant="h6">
                            File Preview
                        </Typography>
                    </Toolbar>
                </AppBar>

                <iframe
                   src={`https://matri-clinic-backend-tau.vercel.app/uploads/${file}`}

                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                />
            </Dialog>

            <Box mt={4} color="white">
                <Typography variant="body2">
                    For appointment changes, contact:
                </Typography>
                {admin.map((a, i) => (
                    <Typography key={i} fontWeight="bold">
                        {a.mobileNumber}
                    </Typography>
                ))}
            </Box>
        </Box>
    );
}
