

import React from "react";
import Checkbox from "../Checkbox/Checkbox";
import './card.css';

interface CardProps {
  title: string;
  options: string[];
  handleCheckboxChange: (label: string) => void;
  checkedOptions: string[];
  name:string; // Add this prop
}

const Card: React.FC<CardProps> = ({ name, title, options, handleCheckboxChange, checkedOptions }) => {
  return (
    <div className="card">
      <div className="cardContent">
        <h1 className="cardTitle">{title}</h1>
        <div className="options">
          {options.map((option, index) => (
            <div key={index} className="optionItem">
              <Checkbox
                name={name}
                title={title}
                label={option}
                handleCheckboxChange={handleCheckboxChange}
                checked={checkedOptions.includes(option)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
