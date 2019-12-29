import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const CheckboxCell = ({ id, empty, onSelect, onDeselect }) => {
  const [checked, setChecked] = useState(false);

  const onChange = (e) => {
    setChecked(!checked);
    if (!checked) onSelect(id)
    else onDeselect(id)
  }
  
  if (empty) return <td className="tl-table--checkbox"></td>;
  
  return (
    <td className="tl-table--checkbox">
      <input id={`tl-table--body-checkbox-${id}`} type="checkbox" onChange={onChange} checked={checked}/>
      <label htmlFor={`tl-table--body-checkbox-${id}`}>{checked && (<FaCheck />)}</label>
    </td>
  );
}

export default CheckboxCell;