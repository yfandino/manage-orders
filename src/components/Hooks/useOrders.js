import React, { useState } from 'react';

export default function useOrders(initialValue = {}) {
  const [orders, setOrders] = useState(initialValue);

  return [orders, setOrders];
}