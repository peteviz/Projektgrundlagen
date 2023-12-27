// import React from "react";
// import Checkbox from "../Checkbox/Checkbox";
// import './card.css';

// interface CardProps {
//   title: string;
//   options: string[];
//   handleCheckboxChange: (label: string) => void;
// }

// const Card: React.FC<CardProps> = ({ title, options, handleCheckboxChange }) => {
//   return (
//     <div className="card">
//       <div className="cardContent">
//         <h1 className="cardTitle">{title}</h1>
//         <div className="options">
//           {options.map((option, index) => (
//             <div key={index} className="optionItem">
//               <Checkbox label={option} handleCheckboxChange={handleCheckboxChange} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;

import React from "react";
import Checkbox from "../Checkbox/Checkbox";
import './card.css';

interface CardProps {
  title: string;
  options: string[];
  handleCheckboxChange: (label: string) => void;
  checkedOptions: string[]; // Add this prop
}

const Card: React.FC<CardProps> = ({ title, options, handleCheckboxChange, checkedOptions }) => {
  return (
    <div className="card">
      <div className="cardContent">
        <h1 className="cardTitle">{title}</h1>
        <div className="options">
          {options.map((option, index) => (
            <div key={index} className="optionItem">
              <Checkbox
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
