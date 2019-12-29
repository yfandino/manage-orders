import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const HeaderOptions = ({ title, rowCount, onEdit, onDelete }) => {
  return(
    <div className={`tl-table--header-options ${rowCount ? 'items-selected': ""}`}>
      <h2>{rowCount ? `${rowCount} items seleccionados` : title}</h2>
      <div className="tl-table--header-options-icons">
      { rowCount > 0 && (
        <div>
          <span><FaEdit /></span>
          <span><FaTrash onClick={onDelete}/></span>
        </div>  
      )}
      </div>
    </div>
  )
}

export default HeaderOptions;