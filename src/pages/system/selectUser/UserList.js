import { db } from '../../../firebase/Config'
import { deleteDoc, doc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useDb } from '../../../contexts/Database'
import User from './User'
import './userList.css'

const UserList = ({ onSetSelectedUser, onSetChoose, onShowPrepare }) => {
    const { users } = useDb()
    const [searchQ, setSearchQ] = useState("")
    const [user, setUser] = useState()

    users?.sort((a, b) => {
        let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });

    const deleteUser = async () => {
        await deleteDoc(doc(db, `Users/${user?.name}`));
        document.getElementById("msg-confirm-delete-user").classList.remove("msg-confirm-delete-user__vis")

    }
    const cancelDeleteUser = () => {
        document.getElementById("msg-confirm-delete-user").classList.remove("msg-confirm-delete-user__vis")

    }

    const onSetUser = (person) => {
        setUser(person)
    }


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
                        <User onSetUser={onSetUser} onShowPrepare={onShowPrepare} index={index} onSetChoose={onSetChoose} onSetSelectedUser={onSetSelectedUser} user={user} key={index} />
                    ))}

                <div id="msg-confirm-delete-user" className=' msg-confirm-delete-user__hidden'>
                    <p> Are You sure you want to remove this user ?</p>
                    <button onClick={deleteUser} className='msg-dlt-use-delete'>Delete</button>
                    <button onClick={cancelDeleteUser} className='msg-dlt-use-cancel'>Cancel</button>

                </div>

            </div></>
    )
}

export default UserList