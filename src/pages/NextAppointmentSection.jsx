import { Button } from "@mui/material";

export default function NextAppointmentSection({
  appointmt,
  slots,
  date,
  Time,
  handledate,
  handleSubmit,
  setappointmt,
  setTime,
}) {
  return (
    <div className="mt-4 p-2">
      <h2>Book Next Appointment</h2>

      <div className="row g-3 mt-3">
        <div className="col-md-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={appointmt.date || ""}
            onChange={handledate}
          />
        </div>

        <div className="col-12 d-flex align-items-center">
          <label className="form-label me-3">Slots:</label>

          <div className="d-flex gap-2 flex-wrap">
            {slots.map((time) => (
              <Button
                key={time}
                variant="contained"
                onClick={() => {
                  setappointmt({ ...appointmt, time });
                  setTime(time);
                }}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>

        <div className="d-flex justify-content-around mt-3">
          <span>Date: {date}</span>
          <span>Time: {Time}</span>
        </div>

        <div className="d-grid col-7 mx-auto mt-3">
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
