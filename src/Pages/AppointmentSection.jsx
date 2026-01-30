import FormInput from "../components/FormInput";

export default function VitalSignsSection({ appointmt, handleChange,fields }) {
  return (
    <div className="row g-3 mt-3">
      <h4>Vital Signs</h4>

      {fields.map((f) => (
        <FormInput
          key={f.name}
          label={f.label}
          name={f.name}
          type={f.type}
          value={appointmt[f.name]}
          onChange={handleChange}
        />
      ))}
    </div>
  );
}
