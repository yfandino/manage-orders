import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import CheckboxCell from './CheckboxCell';

const Table = ( { title, headers, rows }) => {

  const [rowsSelected, setRowsSelected] = useState([]);
  
  const selecRows = (id) => {
    setRowsSelected([...rowsSelected, id]);
  }

  const deselecRows = (id) => {
    let rows = rowsSelected.filter( rowId => rowId !== id);
    setRowsSelected(rows);
  }

  return (
    <div className="tl-table--container">
      <div className={`tl-table--header-options ${rowsSelected.length ? 'items-selected': ""}`}>
        <h2>{rowsSelected.length ? `${rowsSelected.length} items seleccionados` : title}</h2>
        <div className="tl-table--header-options-icons">
        { rowsSelected.length > 0 && (
          <div>
            <span><FaEdit /></span>
            <span><FaTrash /></span>
          </div>  
        )}
        </div>
      </div>
      <table className="tl-table">
        <thead>
          <tr className="tl-table--row-header">
            <CheckboxCell empty />
            {headers && (headers.map( header => (
              <th key={header}>{header}</th>
            )))}
          </tr>
        </thead>
        <tbody>
          {rows && (rows.map( (row, i) => (
            <tr className="tl-table--row" key={`row-${i}`}>
              <CheckboxCell id={i} onSelect={selecRows} onDeselect={deselecRows}/>
              {Object.keys(row).map( (key, j) => (
                <td key={`cell-${i}-${j}`}>{row[key]}</td>
              ))}
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  )
}

export default Table;