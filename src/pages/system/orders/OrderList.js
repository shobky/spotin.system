import React, { useEffect, useState } from 'react'
import { TbCalendarStats } from 'react-icons/tb'
import { useDb } from '../../../contexts/Database'
import Order from './Order'

const OrderList = ({ orders, onSetReceipt, searchTerm, tab }) => {
  const { deletedOrders } = useDb()
  const [dayTotal, setDayTotal] = useState()

  useEffect(() => {
    const countDayTotal = () => {
      let allPrices = [];
      deletedOrders?.map((order) =>
        allPrices.push(order.total)
      )
      setDayTotal(allPrices.reduce((a, b) => a + b, 0))
    }
    countDayTotal()
  }, [deletedOrders])

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
            <p><TbCalendarStats className='order-footer-stats-ico' /></p>
          </div> : ""
      }
    </div>
  )
}

export default OrderList