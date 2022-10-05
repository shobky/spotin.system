import React from 'react'
import { FaReceipt } from 'react-icons/fa'
const Order = ({ order, onSetReceipt }) => {


    const openreceipt = () => {
        onSetReceipt(order)
    }



    return (
        <div className='order-container'>
            <strong className={order.status === 'archived' ? "strike-through" : order.status === 'open' ? "open-order-id" : "closed-order-id"}>#{order.id}</strong>
            <p>{order.time}</p>
            <p>{order.user.name}</p>
            <button

                onClick={openreceipt} className='order_checkOut-btn'><FaReceipt
                    style={{ cursor: "pointer" }} /></button>
        </div>
    )
}

export default Order