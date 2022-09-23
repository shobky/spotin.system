import React from 'react'
import { FaReceipt } from 'react-icons/fa'
const Order = ({ order, onSetReceipt }) => {

    const openreceipt = () => {
        onSetReceipt(order)
    }



    return (
        <div className='order-container'>
            <strong>#{order.id}</strong>
            <p>{order.time}</p>
            <p>{order.user.name}</p>
            {/* <p>{order.total}L.e</p> */}
            <button onClick={openreceipt} className='order_checkOut-btn'><FaReceipt /></button>
        </div>
    )
}

export default Order