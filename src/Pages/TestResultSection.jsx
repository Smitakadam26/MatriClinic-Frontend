

export default function TestResultsSection({
  appointmt,
  handleChange,
  setStressTestFile,
  setLabTestFile,
  setUltraSonicReport,
  setBloodTestFile,
  setUrineTestFile,
}) {
  return (
    <div className="row g-3 mt-3">
      <h4>Test results:</h4>
      <div className="col-md-3">
        <label className="form-label" placeholder="Name">Upload Lab test File:</label>
        <input type="file" name='labtestfile'
          className="form-control" id="image"
          onChange={(e) => { setLabTestFile(e.target.files[0]) }} />
      </div>
      <div className="col-md-3">
        <label className="form-label"
          placeholder="Name">Upload Blood test File:
        </label>
        <input type="file" name='bloodtestfile'
          className="form-control" id="image"
          onChange={(e) => { setBloodTestFile(e.target.files[0]) }}
        /> </div> <div className="col-md-3">
        <label className="form-label" placeholder="Name">
          Upload Urine test File:
        </label>
        <input type="file" name='urinetestfile'
          className="form-control" id="image"
          onChange={(e) => { setUrineTestFile(e.target.files[0]) }} />
      </div>
      <div className="col-md-3">
        <label className="form-label" placeholder="Name">Upload stress test File:</label>
        <input type="file" name='stresstestfile' className="form-control" id="image" onChange={(e) => { setStressTestFile(e.target.files[0]) }} />
      </div>
      <div className="col-md-6">
        <fieldset className="col md-6" style={{ fontFamily: "Arial" }}>
          <legend className="col-form-label col-sm-5 pt-0">Upload Ultrasonic reports File{"(Sonography reports)"}:</legend>
          <div className="col-sm-10" >
            <div className="form-check" style={{ fontFamily: "Arial" }}>
              <input className="form-check-input" type="radio" name="ultrasonicreportType"
                value="Early pregnancy scan" checked={appointmt.ultrasonicreportType === "Early pregnancy scan"}
                onChange={(e) => { handleChange(e) }} />
              <label className="form-check-label" > Early pregnancy scan </label>
            </div>
            <div className="form-check" style={{ fontFamily: "Arial" }}>
              <input className="form-check-input" type="radio" name="ultrasonicreportType"
                value="Ultrasound NT/NB scan" checked={appointmt.ultrasonicreportType === "Ultrasound NT/NB scan"}
                onChange={(e) => { handleChange(e) }} />
              <label className="form-check-label" > Ultrasound NT/NB scan </label>
            </div>
            <div className="form-check" style={{ fontFamily: "Arial" }}>
              <input className="form-check-input" type="radio" name="ultrasonicreportType"
                value="Ultrasound Level 1" checked={appointmt.ultrasonicreportType === "Ultrasound Level 1"}
                onChange={(e) => { handleChange(e) }} />
              <label className="form-check-label" > Ultrasound Level 1 </label>
            </div>
            <div className="form-check" style={{ fontFamily: "Arial" }}>
              <input className="form-check-input" type="radio" name="ultrasonicreportType"
                value="Ultrasound Level 2" checked={appointmt.ultrasonicreportType === "Ultrasound Level 2"}
                onChange={(e) => { handleChange(e) }} />
              <label className="form-check-label" > Ultrasound Level 2
              </label>
            </div>
            <div className="form-check" style={{ fontFamily: "Arial" }}>
              <input className="form-check-input" type="radio" name="ultrasonicreportType" value="Growth scan" checked={appointmt.ultrasonicreportType === "Growth scan"} onChange={(e) => { handleChange(e) }} />
              <label className="form-check-label" > Growth scan
              </label>
            </div> {appointmt.ultrasonicreportType && <div className="col-md-6">
              <input type="file" name='ultrasonicreport' className="form-control" id="image" onChange={(e) => { setUltraSonicReport(e.target.files[0]) }} />
            </div>}
          </div>
        </fieldset>
      </div>

    </div>
  );
}
