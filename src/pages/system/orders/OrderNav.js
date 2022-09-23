import React from 'react'

const OrderNav = ({ onSetTab , openOrders, closedOrders, deletedOrders }) => {
    return (
        <div className='order-nav_containre'>

            <div
                onClick={() => onSetTab('open')}
                className='nav_tap-container'>
                <span className='order-nav_orders-num'> {openOrders?.length} </span>
                <li>Open</li>
            </div>
            <div
                onClick={() => onSetTab('closed')}
                className='nav_tap-container'>
                <span className='order-nav_orders-num'> {closedOrders?.length} </span>
                <li>Closed</li>
            </div>
            <div
                onClick={() => onSetTab('deleted')}
                className='nav_tap-container'>
                <span className='order-nav_orders-num'> {deletedOrders?.length} </span>
                <li>Archived</li>
            </div>

        </div>)
}

export default OrderNav