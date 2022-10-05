import React, { useEffect, useState } from 'react'
import { TbCalendarStats } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { useDb } from '../../../contexts/Database'
import Order from './Order'

const OrderList = ({ orders, onSetReceipt, searchTerm, tab }) => {
  const { deletedOrders } = useDb()
  const [dayTotal, setDayTotal] = useState()

  useEffect(() => {
    const countDayTotal = () => {
      let allPrices = [];
      deletedOrders?.map((order) =>
        allPrices.push(order.timeSpent[0] >= 2 ? order.total + order.tickets.number * 15 : order.total)
      )
      setDayTotal(allPrices.reduce((a, b) => a + b, 0))
    }
    countDayTotal()
  }, [deletedOrders])

  console.log(searchTerm)

  orders?.sort((a, b) => {
    return a.id - b.id
  })
  deletedOrders?.sort((a, b) => {
    return b.id - a.id
  })

  return (
    <div>
      <div className='order-container order-container_header'>
        <p className='order_cat_name'>Id</p>
        <p className='order_cat_name'>Time</p>
        <p className='order_cat_name'>Name</p>
        <p className='order_cat_name'>Total</p>
      </div>
      {
        orders?.filter((filterd) => {
          if (searchTerm === "") {
            return filterd;
          } else if (filterd.user.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return filterd;
          } else if (filterd.user.uid.includes(searchTerm)) {
            return filterd
          } else {
          }
        }).map((order, index) => (
          <Order onSetReceipt={onSetReceipt} key={index} order={order} />
        ))
      }

      {
        deletedOrders?.length > 0 ?
          tab === "deleted" &&
          <div className='order-container-footer'>
            <p><strong><span>{deletedOrders.length + 1}</span> orders</strong> today, Total:<strong> {dayTotal}L.e</strong> </p>
            <Link to='/cashier.system/orders/ledger'><TbCalendarStats className='order-footer-stats-ico' /></Link>
          </div> : ""
      }
    </div>
  )
}

export default OrderList