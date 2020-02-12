import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { getData } from '../../redux/actions';
import { AuthContext } from '../Auth';
import Table from '../Table';
import DropdownWithAction from '../common/DropdrownWithAction';
import AddForm from '../AddForm';
import './Screens.css';

const OrderListScreen = ({ orders, getData }) => {

  const [open, setOpen] = useState(false)

  const { user } = useContext(AuthContext);
  const hasPermission = ["admin", "manager"].includes(user.role);

  useEffect( () => {
    getData('requested');
  }, []);

  const headers = [
    { name: "Nº de documento", key: "docId" },
    { name: "Fecha", key: "createdAt" }
  ];

  const titleActions = [
    { action: 'requested', title: "En camino" }, 
    { action: "completed", title: "Entregado" }
  ];

  // if (error) alert(error)
  
  return (
    <div className="main-content">
      { open && (<AddForm onClose={() => setOpen(false)} />)}
      <div className="main-content--header">
        <h1>Pedidos Lopez de Hoyos</h1>
      </div>
      {orders && (
        <Table 
          title={<DropdownWithAction items={titleActions} onChange={getData} />}
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

const mapDispatchToProps = dispatch => {
  return {
    getData: status => dispatch(getData({ table: "orders", status }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListScreen);