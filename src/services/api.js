export const getPatient = async (id) => {
  let res = await fetch(
    "https://matri-clinic-backend-tau.vercel.app/patients/" + id,
  );
  return res.json();
};
export const fetchDoctorAvailability = async (date, id) => {
  const res = await fetch(
    `https://matri-clinic-backend-tau.vercel.app/Appointments/availability?date=${date}&&Doctorid=${id}`,
  );
  return res.json();
};
export const getDoctors = async () => {
  const res = await fetch(
    "https://matri-clinic-backend-tau.vercel.app/doctors",
  );
  return res.json();
};
export const getPatients= async()=>{
    const res = fetch("https://matri-clinic-backend-tau.vercel.app/patients");
    return res.json();
}
export const editPatient = async (id,patient) => {
  fetch("https://matri-clinic-backend-tau.vercel.app/patients/" + id, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patient),
  });
};

export const fetchAppointment= async(id)=>{
    const res = fetch(`https://matri-clinic-backend-tau.vercel.app/Appointments/` + id);
    return res.json();
}
export const editAppointment= async(appointment)=>{
    fetch("https://matri-clinic-backend-tau.vercel.app/Appointments/" + appointment._id, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(appointment),
        })
}