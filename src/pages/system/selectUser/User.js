import React, { useEffect, useState } from 'react'
import { RiUserSharedFill, RiUserUnfollowFill } from 'react-icons/ri'
import { useNavigate } from 'react-router'


import man from '../../../assets/avatars/man.png'
import { useAuth } from '../../../contexts/AuthContext'
import { useDb } from '../../../contexts/Database'

const User = ({ user, onSetSelectedUser, onSetChoose, onShowPrepare, onSetUser }) => {
    const { openOrders, closedOrders } = useDb()
    const { onSetWantedOrder } = useAuth()
    const [inSpace, setInSpace] = useState(false)
    const [paid, setPaid] = useState(false)

    const [orderId, setOrderId] = useState('')
    const navigate = useNavigate()
    const handleOnSelectUser = () => {
        if (openOrders?.length > 0) {
            openOrders?.map((order) => {
                if (order?.user.uid === user?.uid) {
                    onSetChoose()
                    onShowPrepare()
                    onSetWantedOrder(user?.uid)
                    navigate('/cashier.system/orders')
                }
                else {
                    onSetSelectedUser(user.name, user.uid, user.url ?? "", user.email ?? "")
                    onSetChoose()
                    onShowPrepare()
                }
            })
        } else {
            onSetSelectedUser(user.name, user.uid, user.url ?? "", user.email ?? "")
            onSetChoose()
            onShowPrepare()
        }

    }
    const showMsgConfirm = () => {
        onSetUser(user)
        document.getElementById("msg-confirm-delete-user").classList.add("msg-confirm-delete-user__vis")
    }

    useEffect(() => {
        const userPlace = () => {
            openOrders.map((order) => {
                if (order?.user.uid === user?.uid) {
                    setInSpace(true)
                    setOrderId(order.id)
                }
                closedOrders.map((order) => {
                    if (order?.user.uid === user?.uid) {
                        setPaid(true)
                    }
                })

            })
        }
        userPlace()
    }, [user, openOrders, closedOrders])
    return (
        <div className='user-contaienr' >

            <div className='user_name-id-container' onClick={handleOnSelectUser}>
                <img className={inSpace ? 'select_user_photo user-in-space' : paid ? 'select_user_photo user-paid-order' : 'select_user_photo'} src={user?.url ?? man} alt="" />
                <div className='select_user-info'>
                    <p className='user-name-select-user' >{user?.name}</p>
                    <p className='user-name-select-uid'>#{user?.uid}</p>
                    {
                        orderId && <strong style={{ fontSize: "14px" }}>#{orderId}</strong>
                    }
                </div>

            </div>
            <button onClick={showMsgConfirm} className='user-delete-btn'><RiUserUnfollowFill /></button>
            <button onClick={handleOnSelectUser} className='user-select-btn'><RiUserSharedFill /></button>

        </div>
    )
}

export default User 