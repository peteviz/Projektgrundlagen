import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import expOpt from "../Card/exportOpt.json";

interface Service {
  title: string;
  options: string[];
  name: string;
}

function ExportSelection(): JSX.Element {
  const [checkedOptions, setCheckedOptions] = useState<string[]>(() => {
    const storedState = localStorage.getItem("checkedOptions");
    return storedState ? JSON.parse(storedState) : [];
  });

  // Save the state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("checkedOptions", JSON.stringify(checkedOptions));
  }, [checkedOptions]);
  const handleCheckboxChange = (label: string): void => {
    setCheckedOptions((prevCheckedOptions) => {
      const isChecked = prevCheckedOptions.includes(label);
      if (isChecked) {
        return prevCheckedOptions.filter((item) => item !== label);
      } else {
        return [...prevCheckedOptions, label];
      }
    });
  };

  return (
    <div>
      <div className="cards">
        {expOpt.map((item: Service, index: number) => (
          <Card
            name={item.name}
            key={index}
            title={item.title}
            options={item.options}
            handleCheckboxChange={handleCheckboxChange}
            checkedOptions={checkedOptions}
          />
        ))}
      </div>
    </div>
  );
}

export default ExportSelection;
