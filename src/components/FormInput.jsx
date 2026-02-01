function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  readOnly = false,
  placeholder = "",
}) {
  return (
    <div className="col-md-3">
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        className="form-control"
        value={value || ""}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
      />
    </div>
  );
}

export default FormInput;
