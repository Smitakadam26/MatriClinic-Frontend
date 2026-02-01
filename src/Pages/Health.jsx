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
    IconButton
} from "@mui/material";
import { useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTimeFilled";
import HeightIcon from "@mui/icons-material/Height";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import wallpaper from "../assets/images/wallpaper.png";
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
export default function Health() {
    const { id } = useParams();
    const [appointments, setAppointments] = useState([]);
    const [admin, setAdmin] = useState([]);
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState("");
    const stats = [
        { key: "temperature", label: "Temperature", icon: "🌡" },
        { key: "weight", label: "Weight", icon: "⚖" },
        { key: "bloodpresure", label: "Blood Pressure" },
        { key: "heartrate", label: "Heart Rate" },
        {
            key: "bloodsugar",
            label: "Blood Sugar",
            icon: <BloodtypeIcon fontSize="small" />
        },
        {
            key: "fundalHeight",
            label: "Fundal Height",
            icon: <HeightIcon fontSize="small" />
        },
        {
            key: "fetalPosition",
            label: "Fetal Position",
            icon: <ControlCameraIcon fontSize="small" />
        }
    ];

    const fetchAppointments = useCallback(async () => {
        const res = await fetch(`https://matri-clinic-backend-tau.vercel.app/Appointments/patientapmnt?patientid=${id}`);
        setAppointments(await res.json());
    }, [id]);

    const fetchAdmin = useCallback(async () => {
        const res = await fetch(`https://matri-clinic-backend-tau.vercel.app/admin`);
        setAdmin(await res.json());
    }, []);

    useEffect(() => {
        fetchAppointments();
        fetchAdmin();
    }, [fetchAppointments, fetchAdmin]);


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

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
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
                                    {stats.map(
                                        ({ key, label, icon }) =>
                                            r[key] && (
                                                <Grid item xs={6} sm={4} key={key}>
                                                    <StatCard icon={icon} label={label} value={r[key]} />
                                                </Grid>
                                            )
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

                                <Box key={i} mb={3}>
                                    <Chip
                                        label={new Date(r.dateofvisit).toDateString()}
                                        size="small"
                                        sx={{ mb: 1 }}
                                    />

                                    <Grid container spacing={1}>
                                        {[
                                            { file: r.labTestFile, label: "labTestFile" },
                                            { file: r.ultraSonicReport, label: "ultraSonicReport" },
                                            { file: r.bloodTestFile, label: "bloodTestFile" },
                                            { file: r.urineTestFile, label: "urineTestFile" },
                                            { file: r.stressTestFile, label: "stressTestFile" },
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
                                                        onClick={() => { setFile(f.file); setOpen(true) }}
                                                    >
                                                        {f.label}
                                                    </Button>
                                                </Grid>
                                            ))}
                                    </Grid>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
            </Grid>


            <Dialog
                fullScreen
                open={open}
                onClose={() => {
                    setOpen(false);
                    setFile(null);
                }}
            >
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => {
                                setOpen(false);
                                setFile(null);
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    p={3}
                >
                    {file && (
                        <Box
                            component="img"
                            src={file}
                            sx={{
                                maxWidth: "100%",
                                maxHeight: "90vh",
                                objectFit: "contain",
                                borderRadius: 1,
                                border: "1px solid #ddd",
                            }}
                        />
                    )}
                </Box>
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
