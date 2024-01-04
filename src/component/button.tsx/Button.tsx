import React from "react";
import "./Button.css";

interface ButtonProps {
  classes?: string;
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset"; // Add type prop
  hidden?: boolean;
}

const Button: React.FC<ButtonProps> = ({ classes = '', text = 'Next', onClick, disabled = false, type = 'button', hidden}) => {
  return (
    <button
      className={`Button ${classes}`}
      type={type} // Use the type prop
      onClick={onClick}
      disabled={disabled}
      hidden ={hidden}
    >
      {text}
    </button>
  );
};

export default Button;