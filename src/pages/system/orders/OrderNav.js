import React from 'react'

const OrderNav = ({ onSetTab, openOrders, closedOrders, deletedOrders,tab }) => {
    return (
        <div className='order-nav_containre'>

            <div
                onClick={() => onSetTab('open')}
                className={tab === "open" ? "current-open nav_tap-container" : 'nav_tap-container'}>
                <span className='order-nav_orders-num'> {openOrders?.length} </span>
                <li>Open</li>
            </div>
            <div
                onClick={() => onSetTab('closed')}
                className={tab === "closed" ? "current-closed nav_tap-container" : 'nav_tap-container'}>
                <span className='order-nav_orders-num'> {closedOrders?.length} </span>
                <li>Closed</li>
            </div>
            <div
                onClick={() => onSetTab('deleted')}
                className={tab === "deleted" ? "current-deleted nav_tap-container" : 'nav_tap-container'}>
                <span className='order-nav_orders-num'> {deletedOrders?.length} </span>
                <li>Archived</li>
            </div>

        </div>)
}

export default OrderNav