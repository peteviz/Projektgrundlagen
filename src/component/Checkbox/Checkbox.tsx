import './Checkbox.css'
import {Field} from 'formik'
interface CheckboxProps {
  label: string;
  handleCheckboxChange: (label: string) => void;
  checked: boolean;
  title:string;
  name:string;
}

const Checkbox: React.FC<CheckboxProps> = ({ name, label, handleCheckboxChange, checked }) => {
  return (
    <div className="checkbox-wrapper-40">

      <Field name={name} value={label} type="checkbox" />
      <label>{label}</label>
    </div>
  );
};

export default Checkbox;
