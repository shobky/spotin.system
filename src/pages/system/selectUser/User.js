import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { FaUserMinus } from 'react-icons/fa'
import { db } from '../../../firebase/Config'

const User = ({ user, onSetSelectedUser, onSetChoose, onShowPrepare }) => {
    const handleOnSelectUser = () => {
        onSetSelectedUser(user.name, user.uid)
        onSetChoose()
        onShowPrepare()
    }
    const deleteUser = () => {
        deleteDoc(doc(db, `Users/${user?.name}`));
    }
    return (
        <div className='user-contaienr' >

            <div className='user_name-id-container' onClick={handleOnSelectUser}>
                <p>#{user?.uid}</p>
                <p className='user-name-select-user' >{user?.name}</p>
            </div>

            <button onClick={deleteUser} className='user-delete-btn'><FaUserMinus /></button>


        </div>
    )
}

export default User 