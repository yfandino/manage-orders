import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../../redux/actions'
import Table from './Table'

const List = ({ orders, getOrders, title }) => {
  
  useEffect( () => {
    getOrders();
  }, []);

  return (
    orders && (
      <Table 
        title="Pedidos pendientes"
        headers={['Código Nuuvola', 'Código', 'Marca', 'Modelo', 'Descripción', 'Cantidad', 'Fecha']} 
        rows={orders} 
      />
    )
  )
}

const mapToStateToProps = state => {
  return { orders: state.orders };
}

export default connect(mapToStateToProps, { getOrders })(List);