import "./Home.css";
import { Typography, Box} from "@mui/material";
import wallpaper from '../assets/images/wallpaper.png'
import Header from "../components/Header";
export default function Home() {
  return (
    <>
      <Header/>

      <Box
        sx={{
          backgroundImage: `url(${wallpaper})`,
          height: "84vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h4"
          component="h4"
          sx={{ fontFamily: "Arial", height: 100, marginRight: 3, color: "#46505A", padding: 2 }}>
          Happy Maternity
        </Typography>
        <Typography variant="h3"
          component="h3"
          sx={{ fontSize: "10vh", marginTop: "20vh", fontFamily: "Arial",p:3 }}
          className="w-100 typing">
          <span>Welcome to matriClinic,<br />we are at the heart of appropriate care</span>
        </Typography>

      </Box>
    </>
  );
}
