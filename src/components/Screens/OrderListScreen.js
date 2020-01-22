import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { FaPlus } from 'react-icons/fa'
import { getOrderLines } from '../../redux/actions';
import { AuthContext } from '../Auth';
import Table from '../Table';
import DropdownWithAction from '../common/DropdrownWithAction';
import AddForm from '../AddForm';
import './Screens.css';

const OrderListScreen = ({ orders, getOrderLines }) => {

  const [open, setOpen] = useState(false)

  const { user } = useContext(AuthContext);
  const hasPermission = ["admin", "manager"].includes(user.role);

  useEffect( () => {
    getOrderLines('pending');
  }, []);

  const headers = [
    { name: "Nuuvola", key: "nuuvola" },
    { name: "Código", key: "code" },
    { name: "Marca", key: "brand" },
    { name: "Modelo", key: "model" },
    { name: "Descripción", key: "description" },
    { name: "Cantidad", key: "qty" },
    { name: "Fecha", key: "date" }
  ];

  const titleActions = [
    { action: 'pending', title: "En camino" }, 
    { action: "completed", title: "Entregado" }
  ];

  // if (error) alert(error)

  return (
    <div className="main-content">
      { open && (<AddForm onClose={() => setOpen(false)} />)}
      <div className="main-content--header">
        <h1>Pedidos Lopez de Hoyos</h1>
        <button className="btn ghost" onClick={() => setOpen(true)}>
          <span>Añadir</span><FaPlus />
        </button>
      </div>
      {orders && (
        <Table 
          title={<DropdownWithAction items={titleActions} onChange={getOrderLines} />}
          headers={headers} 
          rows={orders}
          onDelete={() => console.log('delete')}
        />
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return { 
    orders: state.data.orders,
    error: state.error
  };
}

export default connect(mapStateToProps, { getOrderLines })(OrderListScreen);