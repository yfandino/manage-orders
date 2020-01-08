import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const DropdownWithAction = ({ items, onChange }) => {

  const [selected, setSelected] = useState(items[0]);

  useEffect(() => {
    onChange(selected.action);
  }, [selected]);

  return(
    <div className="dropdown--container">
      <div className="dropdown--selected">
        <span>{selected.title}</span>
        <span><FaChevronDown /></span>
      </div>
      <div className="dropdown--actions">
        <ul>
          {items
            .filter( item => item.action !== selected.action)
            .map( item => (
            <li key={item.action} onClick={() => setSelected(item)}>{item.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DropdownWithAction;