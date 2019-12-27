import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../../redux/actions'

const List = ({ orders, getOrders }) => {
  
  useEffect( () => {
    getOrders();
  }, []);

  return (
    <React.Fragment>
      <h2>Pedidos pendientes</h2>
      <ul>
        {orders && (orders.map( (order, i) => (
          <li key={i}>{JSON.stringify(order)}</li>
        )))}
      </ul>
    </React.Fragment>
  )
}

const mapToStateToProps = state => {
  return { orders: state.orders };
}

export default connect(mapToStateToProps, { getOrders })(List);