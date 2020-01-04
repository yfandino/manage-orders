import React, { useState } from 'react';
import HeaderOptions from './components/HeaderOptions';
import CheckboxCell from './components/CheckboxCell';
import './Table.css';

const Table = ( { title, headers, rows, onDelete }) => {

  const [rowsSelected, setRowsSelected] = useState([]);
  
  const selectRows = (id) => {
    setRowsSelected([...rowsSelected, rows.find(row => row.id === id)]);
  }

  const deselectRows = (id) => {
    let rows = rowsSelected.filter( row => row.id !== id);
    setRowsSelected(rows);
  }

  const deleteRows = () => {
    let ids = rowsSelected.map( row => row.id);
    setRowsSelected([]);
    onDelete(ids);
  }

  if (!rows.length) {
    return (
      <div className="tl-table--container">
        <HeaderOptions title={title} rowCount={rowsSelected.length} onDelete={deleteRows} />
        <div className="tl-table-empty">No hay pedidos pendientes</div>
      </div>
    )
  }

  return (
    <div className="tl-table--container">
      <HeaderOptions title={title} rowCount={rowsSelected.length} onDelete={deleteRows} />
      <table className="tl-table">
        <thead>
          <tr className="tl-table--row-header">
            <CheckboxCell empty />
            {headers && (headers.map( header => (
              <th key={header.key}>{header.name}</th>
            )))}
          </tr>
        </thead>
        <tbody>
          {rows && (rows.map( (row, i) => (
            <tr className="tl-table--row" key={`row-${row.id}`}>
              <CheckboxCell id={row.id} onSelect={selectRows} onDeselect={deselectRows} />
              {headers.map( header => (
                <td key={`cell-${header.key}-${i}`}>{row[header.key]}</td>
              ))}
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  )
}

export default Table;