import wallpushups from '../assets/wallpushups.webp'
import sqauts from '../assets/squats.webp'
import shoulderrotation from '../assets/shoulderrotation.jpg'
import allfours from '../assets/All-fours.jpg'
import legraises from '../assets/legraises.webp'
import Supportedvsits from '../assets/Supportedv-sits.webp'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useState } from 'react'
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton
} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close'
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));
export default function Exercise() {
    const data = [{
        name: "Wall pushups",
        description: "Wall pushups work the pectoral muscles in the front of the chest wall and the triceps muscles in the back of the upper arms.Stand up facing a wall. Keep your knees comfortably apart. Place your hands on the wall at the level of your shoulders, slightly more than shoulder-width apart. Slowly bend your elbows and lower your chest until your chin reaches the wall. Keep your back straight. Then go back to the starting position. Gradually work up to 15 repetitions.",
        images: wallpushups
    },
    {
        name: "Squats with a fitness ball",
        description: "Squatting during labor — even for a short amount of time — helps open the pelvis and allows more room for a baby to move through the birth canal. Practicing squats while you're pregnant can make it easier to squat during labor. Try squats with a fitness ball.Stand up straight with a fitness ball behind your back against a wall. Put your feet about shoulder-width apart. Slide down the wall until your knees reach a 90-degree angle. Keep your heels flat on the floor. If you can't bend your knees to a 90-degree angle, just go as low as you can. Then go back to the starting position. When you do this exercise, have someone nearby to help in case you lose your balance. Gradually work up to 10 repetitions.",
        images: sqauts
    },
    {
        name: "Leg raises",
        description: "To strengthen your back and abdominal muscles, try leg raises. Start on your hands and knees, Keep your arms straight and your hands directly beneath your shoulders. Lift your right knee, then straighten your leg behind you. Your raised leg should be parallel to the floor. Put your knee back down on the floor. Repeat on the other side. Gradually work up to 10 repetitions on both sides.",
        images: legraises
    },
    {
        name: "Supported v-sits",
        description: "You can do several core exercises with a balance trainer that has a flat base, as pictured below. Start with a supported v-sit.Sit on the floor, with your back leaning against the trainer. Put your feet flat on the floor and your arms straight in front of you. Lift your right foot off the floor, until your right leg is parallel with the floor. Hold for several seconds. Then go back to the starting position. Gradually work up to 10 repetitions. Repeat with your left leg.",
        images: Supportedvsits
    },
    {
        name: "Shoulder rotation",
        description: "Ease and drop your shoulders forward, rotate them up towards your ears, and gently push them back down. Repeat four times.",
        images: shoulderrotation
    },
    {
        name: "All fours",
        description: "Get down on your hands and knees. Keep your hands and knees in line with your shoulders and hips, respectively. Your back should be flat, and your shoulders should be relaxed. Inhale and tighten your abdomen, tuck your buttocks in, and propel your pelvis forward in a single thrust. Relax, exhale, and ensure you keep your back straight. Repeat ten times.",
        images: allfours
    }]
    const [exercise, setexercise] = useState({})
    const [open, setopen] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width:500px)');
    return (
        <div>
            <div className="container mt-3">
                <h1 style={{ fontFamily: "Arial" }} className="mt-2">Exercises :</h1>
                <p className="m-4" style={{ fontFamily: "Tahoma" }}>
                    Staying active during pregnancy can have many benefits, including easing aches and pains and helping to prevent too much weight gain. Along with aerobic exercise, such as walking and swimming, exercises to strengthen muscles are important to include in a well-rounded exercise program.
                </p>
                <div className="d-flex flex-wrap">
                    <div className="">
                        <Box sx={{ width: '100%' }}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                className="contain">
                                {data.map((record) => (
                                    <Grid size={isSmallScreen ? 7 : 4}  className="card__container gap-50">
                                        <Item className="mt-3 p-2" style={{ backgroundImage: `url(${record.images})`, height: "33vh" }}>
                                            <div className="d-flex flex-column justify-content-end h-100">
                                                <div className="d-flex flex-wrap justify-content-between align-items-center bg border rounded-3" >
                                                    <h3 style={{ fontFamily: "cursive" }} className=''>{record.name}</h3>
                                                    <Button className="bg-white text-secondary" onClick={() => { setopen(true); setexercise(record) }}>Learn More</Button>
                                                </div>
                                            </div>
                                        </Item>
                                    </Grid>
                                ))}

                            </Grid>
                        </Box>
                    </div>
                </div>
                <Dialog
                    fullWidth={true}
                    maxWidth={'md'}
                    open={open}
                    onClose={() => {
                        setopen(false); setexercise({})
                    }}
                >
                    <DialogTitle className="text-white bg-secondary">{exercise.name}</DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={() => {
                            setopen(false); setexercise({})
                        }}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent className="row r-3">
                        <div className='align-items-center'>
                            <h1>{exercise.name} : </h1>
                            <div className='d-flex flex-wrap mt-3 p-2'>
                                <p className='p-2'>{exercise.description}</p>
                                <img src={exercise.images} />
                            </div>
                            {exercise.name === "Wall pushups" &&<div>
                                <iframe size={isSmallScreen ? "small" : "large"} src="https://www.youtube.com/embed/Zd990gYvDvA?si=u-Yr2Zrp5aADGFO-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            </div>}
                            {exercise.name === "Squats with a fitness ball" &&<div>
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/Pc23LbwdkPQ?si=6Xur93BlU5SVFQoL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            </div>}
                            {exercise.name === "Leg raises" &&<div>
                               <iframe width="560" height="315" src="https://www.youtube.com/embed/2jRF_qVXXhg?si=m6jZemJPWTM5rjWU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            </div>}
                            {exercise.name === "Supported v-sits" &&<div>
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/EKGMtoOqXgY?si=XRqaNosrumBTnav7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            </div>}
                            {exercise.name === "All fours" &&<div>
                               <iframe width="560" height="315" src="https://www.youtube.com/embed/752vqMlZveM?si=tFZ3FikEjP-x-eHa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            </div>}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}