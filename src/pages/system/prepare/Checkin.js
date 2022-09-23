import React from 'react'
import { AiFillMinusCircle } from 'react-icons/ai'
import { RiAddCircleFill } from 'react-icons/ri'

const Checkin = ({ onSetTickets, tickets, onSetCheked, checked }) => {

    const handleCheckIn = () => {
        onSetCheked()
        onSetTickets(1)
    }

    const handleCancel = () => {
        onSetCheked()
        onSetTickets(0)
    }
    const increaceQty = () => {
        onSetTickets(tickets.number + 1)
    }
    const decreaceQty = () => {
        if (tickets.number >= 2) {
            onSetTickets(tickets.number - 1)
        }
    }

    return (
        <div className='checking-container'>
            {checked ?
                <div className='flex'>
                    <button
                        onClick={handleCancel}
                        className='check-in_btn check-in_btn__cancel'>Cancel</button>
                    <div className='checkin-action-btns flex'>
                        <button className=" checkin_action-btn checkin_qty-increase" onClick={increaceQty}><RiAddCircleFill className="checkin_add-ico" /></button>
                         <p className='checkin-tkt-num'> {tickets.number}</p>
                        <button className=" checkin_action-btn checkin_qty-decrease" onClick={decreaceQty}><AiFillMinusCircle className="checkin-decreese-ico" /></button>
                    </div>
                </div>
                : <button
                    onClick={handleCheckIn}
                    className='check-in_btn check-in_btn__checkin '>Check in</button>}
        </div>
    )
}

export default Checkin