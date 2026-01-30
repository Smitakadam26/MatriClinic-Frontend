
const testFiles = [
  { label: "Lab Test", name: "labtestfile" },
  { label: "Blood Test", name: "bloodtestfile" },
  { label: "Urine Test", name: "urinetestfile" },
  { label: "Stress Test", name: "stresstestfile" },
];

const ultrasonicOptions = [
  "Early pregnancy scan",
  "Ultrasound NT/NB scan",
  "Ultrasound Level 1",
  "Ultrasound Level 2",
  "Growth scan",
];

export default function TestResultsSection({
  appointmt,
  handleChange,
  handleFileChange,
}) {
  return (
    <div className="row g-3 mt-3">
      <h4>Test Results</h4>

      {testFiles.map((file) => (
        <div className="col-md-3" key={file.name}>
          <label className="form-label">
            Upload {file.label} File
          </label>
          <input
            type="file"
            name={file.name}
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
      ))}

      <div className="col-md-6">
        <fieldset>
          <legend className="form-label">
            Ultrasonic Report (Sonography)
          </legend>

          {ultrasonicOptions.map((option) => (
            <div className="form-check" key={option}>
              <input
                className="form-check-input"
                type="radio"
                name="ultrasonicreportType"
                value={option}
                checked={appointmt.ultrasonicreportType === option}
                onChange={handleChange}
              />
              <label className="form-check-label">{option}</label>
            </div>
          ))}

          {appointmt.ultrasonicreportType && (
            <input
              type="file"
              name="ultrasonicreport"
              className="form-control mt-2"
              onChange={handleFileChange}
            />
          )}
        </fieldset>
      </div>
    </div>
  );
}
