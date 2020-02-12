import React, { useState, useEffect, useContext } from 'react';
import { FaPlus } from 'react-icons/fa'
import { connect } from 'react-redux';
import { getData, deleteOrderLine, createOrder } from '../../redux/actions';
import { AuthContext } from '../Auth';
import Table from '../Table';
import DropdownWithAction from '../common/DropdrownWithAction';
import AddForm from '../AddForm';
import './Screens.css';

const OrderLineListScreen = ({ requestLines, orderLines, error, getData, deleteOrderLine }) => {

  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const hasPermission = ["admin", "manager"].includes(user.role);

  useEffect( () => {
    getData('pending');
  }, []);

  const headers = [
    { name: "Proveedor", key: "store" },
    { name: "Nuuvola", key: "nuuvola" },
    { name: "Código", key: "code" },
    { name: "Marca", key: "brand" },
    { name: "Modelo", key: "model" },
    { name: "Descripción", key: "description" },
    { name: "Cantidad", key: "qty" },
    { name: "Fecha", key: "date" }
  ];

  const titleActions = [
    { action: 'pending', title: "Pendiente" }, 
    { action: "completed", title: "Completado" },
    { action: "inactive", title: "Inactiva" }
  ];

  const markAsRequested = (selected) => {
    let order = {
      orderLines: selected,
      status: 'requested',
      createdAt: new Date().toISOString(),
      createdBy: user.displayName
    }
    requestLines(order);
  }

  if (error) alert(error)

  return (
    <div className="main-content">
      { open && (<AddForm onClose={() => setOpen(false)} />)}
      <div className="main-content--header">
        <h1>Pedidos Lopez de Hoyos</h1>
        <button className="btn ghost" onClick={() => setOpen(true)}>
          <span>Añadir</span><FaPlus />
        </button>
      </div>
      {orderLines && (
        <Table 
          title={<DropdownWithAction items={titleActions} onChange={getData} />}
          headers={headers} 
          rows={orderLines}
          onDelete={deleteOrderLine}
          actionButton={hasPermission ? markAsRequested : null}
        />
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return { 
    orderLines: state.data.orderLines,
    error: state.error
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    requestLines: order => dispatch(createOrder(order)),
    getData: status => dispatch(getData({ table: "order-lines", status })),
    deleteOrderLine: ids => dispatch(deleteOrderLine(ids))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderLineListScreen);