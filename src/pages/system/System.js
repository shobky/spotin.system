import React, {useState } from 'react'
import './system.css'
import Header from './header/Header'
import Nav from './nav/Nav'
import { useDb } from '../../contexts/Database'
import UserList from './selectUser/UserList'
import { useAuth } from '../../contexts/AuthContext'
import Produts from './products/Produts'
import Prepare from './prepare/Prepare'

const System = () => {

  const { upload, orderId } = useDb()
  const { user } = useAuth()
  const [choose, setChoose] = useState(false)
  const [selectedUser, setSelectedUser] = useState([])
  const [showPrebare, setShowPrepare] = useState(true)

  const onShowPrepare = () => {
    setShowPrepare(!showPrebare)
    if (showPrebare) {
      document.getElementById('prepare').classList.add("mb_prepare__show")

    } else {
      document.getElementById('prepare').classList.remove("mb_prepare__show")
    }
  }
  const onAddToCart = async (item) => {
    const path = `cart#${orderId}-${(user?.uid).slice(-5)}`
    await upload(path, item.name, {
      item,
      qty: 1
    })
  }

  const onSetSelectedUser = (name, uid) => {
    setSelectedUser({ name, uid })
  }

  const onSetChoose = () => {
    setChoose(!choose)
  }
  return (
    <>
      <Nav onShowPrepare={onShowPrepare} showPrebare={showPrebare} />
      <div className='system'>
        <div>
          <Header />
          <div className='system_products-container'>
            {
              choose ?
                <UserList onShowPrepare={onShowPrepare} onSetSelectedUser={onSetSelectedUser} onSetChoose={onSetChoose} />
                :
                <Produts onAddToCart={onAddToCart} />

            }
          </div>
        </div>
        <Prepare onShowPrepare={onShowPrepare} onSetChoose={onSetChoose} selectedUser={selectedUser} onSetSelectedUser={onSetSelectedUser} choose={choose} />
      </div>
    </>
  )
}

export default System