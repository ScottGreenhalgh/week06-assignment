export default function Switch({ label, isOn, handleToggle }) {
  return (
    <div className="switch-container">
      <label className="switch">
        <input type="checkbox" checked={isOn} onChange={handleToggle} />
        <span className="slider round"></span>
      </label>
      <span>{label}</span>
    </div>
  );
}
