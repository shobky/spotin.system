import { doc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { useDb } from '../../../contexts/Database'
import { db } from '../../../firebase/Config'
import SelectUser from '../selectUser/SelectUser'
import Cart from './cart/Cart'
import Checkin from './Checkin'
import './prepare.css'
import Summary from './Summary'
import CurrentDate from './time/CurrentDate'

const Prepare = ({ onSetChoose, choose, onSetSelectedUser, selectedUser, onShowPrepare, getTotalPrices }) => {

  const { cart, orderId, remove } = useDb()
  const { user } = useAuth()
  const [date, setDate] = useState()
  const [time, setTime] = useState()
  const [checked, setChecked] = useState(false)
  const [tickets, setTickets] = useState({
    number: 0,
    price: 0
  })
  const [total, setTotal] = useState(0)
  const [disabled, setDisabled] = useState(true)


  const onSetTime = (res) => {
    setTime(res)
  }
  const onSetDate = (res) => {
    setDate(res)
  }
  const onSetCheked = () => {
    setChecked(!checked)
  }

  const onSetTickets = (number) => {
    setTickets({
      number: number,
      price: number * 10
    })
  }

  const countTotalPrice = () => {
    let allPrices = [];
    cart?.map((products) =>
      allPrices.push(products.item.price * products.qty)
    )
    setTotal(allPrices.reduce((a, b) => a + b, 0) + tickets.price)
  }

  useEffect(() => {
    countTotalPrice()
  }, [cart, tickets])


  useEffect(() => {
    const disabledBtn = () => {
      if (selectedUser.name && total > 0) {
        setDisabled(false)

      } else {
        setDisabled(true)
      }
    }
    disabledBtn()
  }, [total, selectedUser])


  const onPlaceOrder = async () => {
    await setDoc(doc(db, `open-orders`, `${orderId}#${selectedUser.uid}`), {
      id: orderId,
      status: "open",
      user: { name: selectedUser.name, uid: selectedUser.uid, url: selectedUser.url ?? "" },
      time,
      date,
      total,
      tickets,
      cart,
    })
    cart?.map(async (cartItem) => {
      await remove(`cart#${orderId}-${(user?.uid).slice(-5)}/${cartItem.item.name}`)
    })
    setChecked(false)
    onSetSelectedUser("")
    setTickets({ number: 0, price: 0 })
    onShowPrepare()

  }



  return (
    <div id='prepare' className='prepare-container'>
      <div className='prepare_header'>
        <h2 className='prepare_order-id'>Order <span claasName="prepare_order-id-number">#{orderId}</span></h2>
        <CurrentDate onSetTime={onSetTime} onSetDate={onSetDate} date={date} time={time} />
      </div>
      <SelectUser onShowPrepare={onShowPrepare} selectedUser={selectedUser} onSetSelectedUser={onSetSelectedUser} choose={choose} onSetChoose={onSetChoose} />
      <br />
      <Cart />
      <Checkin checked={checked} onSetCheked={onSetCheked} onSetTickets={onSetTickets} tickets={tickets} />
      <div className='prepare_footer'>
        <Summary total={total} tickets={tickets} />
        <div className='place-btn-div'>
          <button disabled={disabled} onClick={onPlaceOrder} className='prepare_place-order-btn'>Place Order</button>
        </div>
      </div>
    </div>
  )
}

export default Prepare