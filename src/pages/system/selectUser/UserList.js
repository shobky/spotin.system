import React, { useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useDb } from '../../../contexts/Database'
import User from './User'
import './userList.css'

const UserList = ({ onSetSelectedUser, onSetChoose, onShowPrepare }) => {
    const { users } = useDb()
    const [searchQ, setSearchQ] = useState('')
    return (
        <>
            <div className='searc-input-user-div'>
                <input onChange={(e) => setSearchQ(e.target.value)} type="text" placeholder='search...' className='search-input-users' />
            </div>
            <div className='user-list-contaienr'>
                <IoMdArrowRoundBack onClick={() => onSetChoose()} className='user-list_back-btn' />

                {
                    users?.filter((filterd) => {
                        if (searchQ === "") {
                            return filterd;
                        } else if (filterd?.name.toLowerCase().includes(searchQ.toLowerCase())) {
                            return filterd
                        } else if (filterd?.uid.includes(searchQ)) {
                            return filterd
                        } else {
                        }
                    }).map((user, index) => (
                        <User onShowPrepare={onShowPrepare} index={index} onSetChoose={onSetChoose} onSetSelectedUser={onSetSelectedUser} user={user} key={index} />
                    ))}

            </div></>
    )
}

export default UserList