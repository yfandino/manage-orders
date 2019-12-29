import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getOrders, deleteOrder } from '../../redux/actions';
import Table from '../Table';

const List = ({ orders, getOrders, deleteOrder }) => {
  
  useEffect( () => {
    getOrders();
  }, []);
  
  const headers = [
    { name: "Código Nuuvola", key: "nuuvola" },
    { name: "Código", key: "code" },
    { name: "Marca", key: "brand" },
    { name: "Modelo", key: "model" },
    { name: "Descripción", key: "description" },
    { name: "Cantidad", key: "qty" },
    { name: "Fecha", key: "date" }
  ]

  return (
    orders && (
      <Table 
        title="Pedidos pendientes"
        headers={headers} 
        rows={orders}
        onDelete={deleteOrder}
      />
    )
  )
}

const mapToStateToProps = state => {
  return { orders: state.orders };
}

export default connect(mapToStateToProps, { getOrders, deleteOrder })(List);