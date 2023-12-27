import './Checkbox.css'
interface CheckboxProps {
  label: string;
  handleCheckboxChange: (label: string) => void;
  checked: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, handleCheckboxChange, checked }) => {
  return (
    <div className="checkbox-wrapper-40">
      <input type="checkbox" checked={checked} onChange={() => handleCheckboxChange(label)} />
      <label> <span>{label}</span></label>
    </div>
  );
};

export default Checkbox;
