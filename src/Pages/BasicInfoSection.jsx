import FormInput from "../components/FormInput";

export default function BasicInfoSection({
  patient,
  appointmt,
  currentdate,
  handleChange,
}) {
  return (
    <div className="row g-3 mt-3">
      <h4>Basic Info</h4>

      <FormInput label="Name" value={patient.name} readOnly />
      <FormInput label="Doctor" value={patient.doctor} readOnly />
      <FormInput label="Mobile No." type="number" value={patient.mobileNumber} readOnly />

      <FormInput
        label="Date of Visit"
        type="date"
        name="dateofvisit"
        value={currentdate}
        onChange={handleChange}
      />

      <FormInput
        label="Month"
        type="number"
        name="month"
        value={appointmt.month}
        onChange={handleChange}
      />

      <FormInput
        label="Week"
        type="number"
        name="week"
        value={appointmt.week}
        onChange={handleChange}
      />
    </div>
  );
}
