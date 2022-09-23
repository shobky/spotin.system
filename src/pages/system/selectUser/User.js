import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { MdDelete } from 'react-icons/md'
import { db } from '../../../firebase/Config'

const User = ({ user, onSetSelectedUser, onSetChoose, onShowPrepare }) => {
    const handleOnSelectUser = () => {
        onSetSelectedUser(user.name, user.uid)
        onSetChoose()
    }
    const deleteUser = () => {
        deleteDoc(doc(db, `Users/${user?.name}`));
    }
    return (
        <div className='user-contaienr' >

            <div className='user_name-id-container' onClick={handleOnSelectUser}>
                <strong><p className='user-name-select-user' >{user?.name}</p></strong>
                <p>#{user?.uid}</p>
            </div>

            <button onClick={deleteUser} className='user-delete-btn'><MdDelete /></button>


        </div>
    )
}

export default User 