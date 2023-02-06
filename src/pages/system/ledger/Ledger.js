import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { useDb } from '../../../contexts/Database'
import './ledger.css'
import greenaccountant from '../../../assets/imgs/ledger.png'
import { IoIosHome } from 'react-icons/io'
import { Link } from 'react-router-dom'
import man from '../../../assets/avatars/man.png'
import { BsReceipt } from 'react-icons/bs'

const Ledger = () => {
    const { user } = useAuth()
    const { openOrders, closedOrders, deletedOrders } = useDb()

    const [dayTotal, setDayTotal] = useState()
    const [waitTotal, swtWaitTotal] = useState()

    const [tktNum, setTktNum] = useState()

     console.log(closedOrders)

    useEffect(() => {
        const countDayTotal = () => {
            let allPrices = [];
            closedOrders?.map((order) =>
                allPrices.push(order.timeSpent[0] >= 1 ? (order.total + order.tickets.number * 15) : order.total)
            )
            setDayTotal(allPrices.reduce((a, b) => a + b, 0))
        } 
        const countwaitiTotal = () => {
            let waitingTotalprices = [];
            openOrders?.map((order) =>
                waitingTotalprices.push(order.total)
            )
            swtWaitTotal(waitingTotalprices.reduce((a, b) => a + b, 0))
        }
        const countPropleInSpace = () => {
            let allPrices = [];
            openOrders?.map((order) =>
                allPrices.push(order.tickets.number)
            )
            setTktNum(allPrices.reduce((a, b) => a + b, 0))
        }
        countDayTotal()
        countPropleInSpace()
        countwaitiTotal()
    }, [closedOrders, openOrders])

    return (
        <>
            <div className='ledger-first-page-container'>
                {/* <img alt='' src={greenaccountant} className="ledger_ledgerPhoto" /> */}
                <p className='ledger_name'>
                    Spot<span >In</span>
                </p>
                <Link to='/'><IoIosHome className="ledger_home-icon" />
                </Link>
                <Link to='/cashier.system/orders'><BsReceipt className="cashier-system-orders" />
                </Link>
                <div className='ledger'>
                    <p className='ledger_welcome'>Welcome {user?.displayName}, Let's take a look at your ledger. </p>

                    <div className='ledger_user-photos'>
                        {
                            openOrders?.map((order) => (
                                <div style={{ margin: "5px" }}>
                                    <div>
                                        <img alt='' src={order.user.url ? order.user.url : man} className="ledger-user-inspace-photo" />
                                        <p className='ledger-user-inspace-name'>{order?.user.name.substring(0, 7)}...</p>
                                    </div>
                                    <div className='ledger_order-id-div'>
                                        <p className='ledger_order-id'>{order.id}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <br />
                    <br />

                    <p className='ledger_open-orders-num'><strong>{openOrders?.length > 0 ? "#" + openOrders?.length : "No"} </strong>open orders. </p>
                    <p className='ledger_open-orders-num'>, <strong>{closedOrders?.length > 0 ? "#" + closedOrders?.length : "No"} </strong>closed orders. </p>
                    <p className='ledger_open-orders-num'>And <strong>{deletedOrders?.length > 0 ? "#" + deletedOrders?.length : "No"}  </strong> archived orders. </p>

                    <br />
                    <br />



                    <div className='ledger_day-total-div ledger_day-total-div__open'>
                        <p className='ledger_day-total-header'>Total open Orders:</p>
                        <p className='ledger_day-total-num'>Your are waiting for <span>{waitTotal}L.e</span> to enter registry</p>
                    </div>
                    <div className='ledger_day-total-div ledger_day-total-div__closed'>
                        <p className='ledger_day-total-header'>Total Closed Orders:</p>
                        <p className='ledger_day-total-num'>Your should have <span>{dayTotal}L.e</span> in registry</p>
                    </div>

                    <p className='ledger_prople-tkts'>Currently there is {tktNum} people in the workspace</p>
                    {
                        tktNum > 15 ? <p className='ledger_trafic__high'>High Trafic</p> : tktNum > 5 ? <p className='ledger_trafic__low'>Low Trafic</p> : <p className='ledger_trafic__normal'>Normal Trafic</p>
                    }
                </div>
            </div>

            <div className='ledger-1-sec'>
                .....</div></>
    )
}

export default Ledger