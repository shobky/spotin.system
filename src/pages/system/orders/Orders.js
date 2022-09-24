import { deleteDoc, doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { BsArchive } from 'react-icons/bs'
import { IoMdAdd } from 'react-icons/io'
import { MdDeleteSweep, MdOutlineDelete } from 'react-icons/md'
import { TbSearch, TbSearchOff } from 'react-icons/tb'

import { Link } from 'react-router-dom'
import { useDb } from '../../../contexts/Database'
import { db } from '../../../firebase/Config'
import AddToOrder from '../addNewToOrder/AddToOrder'
import Header from '../header/Header'
import OrderList from './OrderList'
import OrderNav from './OrderNav'
import './orders.css'
import Receipt from './Receipt'

const Orders = () => {
  const { remove, openOrders, closedOrders, deletedOrders } = useDb()
  const [tab, setTab] = useState('open')
  const [order, setOrder] = useState()
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [newCart, setNewCart] = useState(false)

  const [receipt, setReceipt] = useState(false)
  const msg = document.getElementById("orders_msg_confirm")




  const onSetTab = (tabName) => {
    setTab(tabName)
  }
  const handleAddNewItems = () => {
    setNewCart(!newCart)
  }
  const onSetReceipt = (data) => {
    setOrder(data ?? order)
    setReceipt(!receipt)
  }
  const onArchiveAllMsg = () => {
    if (closedOrders?.length > 0) {
      msg.classList.remove("orders_confirmation-archive-msg")

    }
  }
  const closeArchiveMsg = () => {
    msg.classList.add("orders_confirmation-archive-msg")
  }
  const handleArchiveAllOrders = () => {
    closedOrders.map(async (mappedOrder) => {
      const data = {
        id: `${mappedOrder.id}`,
        status: "archived",
        user: { name: mappedOrder.user.name, uid: mappedOrder.user.uid },
        time: mappedOrder.time,
        date: mappedOrder.date,
        total: mappedOrder.total,
        tickets: mappedOrder.tickets,
        cart: mappedOrder.cart,
        timeSpent: mappedOrder.timeSpent

      }
      await setDoc(doc(db, "archived-orders", `#${mappedOrder.id}`), data);
      await deleteDoc(doc(db, "closed-orders", `#${mappedOrder.id}`));
      msg.classList.add("orders_confirmation-archive-msg")

    })
  }
  const onMsgDelete = () => {
    const deleteMsg = document.getElementById("delteMsg")
    if (deletedOrders?.length > 0) {
      deleteMsg.classList.remove("orders_confirmation-delete-msg")
    }
  }
  const onCloseMsgDelete = () => {
    const deleteMsg = document.getElementById("delteMsg")
    if (deletedOrders?.length > 0) {
      deleteMsg.classList.add("orders_confirmation-delete-msg")
    }
  }
  const handleDeleteAllOrders = () => {
    deletedOrders.map((order) => {
      remove(`archived-orders/#${order.id}`)
    })
  }

  return (
    <div>
      {
        receipt ? newCart ? <AddToOrder handleAddNewItems={handleAddNewItems} order={order} /> :
          <Receipt handleAddNewItems={handleAddNewItems} onSetReceipt={onSetReceipt} order={order} />
          :
          <>
            <div className="order_header flex">
              <Link to="/cashier.system" className='order_bakc-btn'><IoMdAdd /></Link>
              {
                tab === "closed" &&
                <BsArchive onClick={onArchiveAllMsg} className="orders_archive-ico" />
              }

              {
                tab === "deleted" &&
                <>
                  <div onClick={onCloseMsgDelete} id='delteMsg' className='orders_confirmation-delete-msg orders_confirmation-delete-msg-bg  '>
                    <div className='center-confirm-msg'>
                      <div className='orders_confirmation-delete-msg__active'>
                        <p style={{ textAlign: "center", fontSize: "15px" }}>This will permenantly delete all {deletedOrders?.length} orders ! </p>
                        <button onClick={handleDeleteAllOrders} className=' msg_confirm_btn-delete'> Delete forever</button>
                        <button onClick={onCloseMsgDelete} className=' msg_confirm_btn-go-back'>No, Go Back</button>
                      </div>
                    </div>


                  </div>
                  <MdDeleteSweep onClick={onMsgDelete} className="orders_delete-all-ico" /></>
              }



              <Header />
              {
                showSearch ?
                  <TbSearchOff onClick={() => setShowSearch(!showSearch)} className='order_search-ico' />
                  :
                  <TbSearch onClick={() => setShowSearch(!showSearch)} className='order_search-ico' />
              }
            </div>
            <div onClick={closeArchiveMsg} id='orders_msg_confirm' className='orders_confirmation-archive-msg orders_confirmation-archive-msg-bg  '>
              <div className='center-confirm-msg'>
                <div onClick={closeArchiveMsg} className='orders_confirmation-archive-msg__active'>
                  <p style={{ textAlign: "center" }}> You sure you want to archive all {closedOrders?.length} closed orders ?</p>
                  <button onClick={handleArchiveAllOrders} className='msg_confirm_btn-accept'>Yes, I am Sure</button>
                  <button onClick={closeArchiveMsg} className='msg_confirm_btn-cancel'>No, Go Back</button>
                </div>
              </div>

            </div>
            <div className='orders_search-input-div'>
              {showSearch && <input onChange={event => setSearchTerm(event.target.value)} className='orders_search-input' placeholder='search...' />}
            </div>
            <OrderNav
              openOrders={openOrders}
              closedOrders={closedOrders}
              deletedOrders={deletedOrders}
              onSetTab={onSetTab} />
            <div className='ordersList-container'>
              <OrderList tab={tab} searchTerm={searchTerm} onSetReceipt={onSetReceipt} orders={
                tab === 'open' ? openOrders : tab === 'closed' ? closedOrders : tab === "deleted" ? deletedOrders : ""
              } />
            </div></>
      }

    </div>
  )
}

export default Orders