import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useDb } from '../../../contexts/Database'
import User from './User'
import './userList.css'

const UserList = ({ onSetSelectedUser, onSetChoose, onShowPrepare }) => {
    const { users } = useDb()
    return (
        <div className='user-list-contaienr'>
            <IoMdArrowRoundBack onClick={() => onSetChoose()} className='user-list_back-btn' />
            {users?.map((user, index) => (
                <User onShowPrepare={onShowPrepare} index={index} onSetChoose={onSetChoose} onSetSelectedUser={onSetSelectedUser} user={user} key={index} />
            ))}
        </div>
    )
}

export default UserList