import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const HeaderOptions = ({ title, rowCount, onEdit, onDelete, actionButton }) => {

  return(
    <div className={`tl-table--header-options ${rowCount ? 'items-selected': ""}`}>
      <h2>{rowCount ? `${rowCount} items seleccionados` : title}</h2>
      <div className="tl-table--header-options-icons">
      { rowCount > 0 && (
        <div>
          <div>
          <span><FaEdit /></span>
          <span><FaTrash onClick={onDelete}/></span>
          </div>
          {actionButton && (
            <div><button className="btn reversed" onClick={actionButton}>Solicitar</button></div>
          )}
        </div>
      )}
      </div>
    </div>
  )
}

export default HeaderOptions;