import React, { useState } from 'react'
import { useDb } from '../../../contexts/Database'
import { uuidv4 } from '@firebase/util'
//icons 
import { HiOutlineUserAdd } from 'react-icons/hi'
import { TbEditCircle, TbListSearch, TbArrowBack } from 'react-icons/tb'

const SelectUser = ({ onSetChoose, choose, onSetSelectedUser, selectedUser, onShowPrepare }) => {

    const [username, setUsername] = useState('')
    const uid = uuidv4().slice(-5)
    const handleAddUser = (e) => {
        setUsername(e.target.value)
    } 
    const onSubmitUser = async () => {
        onSetSelectedUser(username, uid)
        setUsername("")
        document.getElementById('id').reset()

    }

    const openUserList = () => {
        onSetChoose()
        onShowPrepare()
    }
    return (
        <div>
            {
                selectedUser.name ?
                    <div className=' selected_user-list-name flex'>
                        <p >{selectedUser.name}</p>
                        <TbEditCircle className='select-user_edit-ico' onClick={() => onSetSelectedUser("", "")} />
                        <TbListSearch style={{ marginLeft: "10px", fontSize: "22px", marginTop: "-2px", cursor: "pointer" }} onClick={openUserList} />
                    </div>
                    :
                    <div>
                        <input
                            id='input'
                            onChange={(e) => handleAddUser(e)}
                            placeholder='New Customer'
                            type='text' maxLength="20"
                            className='select-user_input' />

                        {username.length > 0 ? <HiOutlineUserAdd className='select-user_add-ico' onClick={onSubmitUser} /> : choose ?
                            <TbArrowBack className='select-user_back-ico' onClick={() => onSetChoose()} style={{ transform: "scale(-1) rotatex(180deg)" }} />
                            : <TbListSearch onClick={openUserList} className='select-user_list-ico' />}
                    </div>
            }
        </div>
    )
}

export default SelectUser