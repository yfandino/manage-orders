import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getOrders, deletePhonePart } from '../../redux/actions';
import Table from '../Table';
import DropdownWithAction from '../common/DropdrownWithAction';

const List = ({ orders, getOrders, deletePhonePart }) => {
  
  useEffect( () => {
    getOrders('pending');
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
    { action: 'pending', title: "Pendiente" }, 
    { action: "completed", title: "Completado" },
    { action: "inactive", title: "Inactiva" }
    ];

  return (
    orders && (
      <Table 
        title={<DropdownWithAction items={titleActions} onChange={getOrders} />}
        headers={headers} 
        rows={orders}
        onDelete={deletePhonePart}
      />
    )
  )
}

const mapToStateToProps = state => {
  return { orders: state.data.orders };
}

export default connect(mapToStateToProps, { getOrders, deletePhonePart })(List);