import React from 'react'
import Order from './Order'

const OrderList = ({ orders, onSetReceipt, searchTerm }) => {
  return (
    <div>
      <div className='order-container order-container_header'>
        <p className='order_cat_name'>Id</p>
        <p className='order_cat_name'>Time</p>
        <p className='order_cat_name'>Name</p>
        <p className='order_cat_name'>Total</p>
        {/* <button className='order_checkOut-btn'><IoBagCheckOutline /></button> */}


      </div>
      {
        orders?.filter((filterd) => {
          if (searchTerm === "") {
            return filterd;
          } else if (filterd.user.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return filterd;
          } else if (filterd.user.uid.includes(searchTerm)) {
            return filterd
          } else if (filterd.id.includes(searchTerm)) {
            return filterd
          } else {
          }
        }).map((order, index) => (
          <Order onSetReceipt={onSetReceipt} key={index} order={order} />
        ))
      }
    </div>
  )
}

export default OrderList