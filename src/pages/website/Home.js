import { collection } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useDb } from '../../contexts/Database'
import { db, storage } from '../../firebase/Config'
import User from '../system/selectUser/User'

const Home = () => {
    const { user, logout } = useAuth()

    console.log(process.env.REACT_APP_OWNER_ID);//printing it to console

    return (
        <div>
            <Link to="/signup">Signup</Link>
            <br />
            <Link to="/login">Login</Link>
            <br />
            <Link to="/cashier.system">Cashier</Link>

            {
                user ?
                    <>
                        <p>name: <strong>{user.displayName}</strong></p>
                        <p>email: {user.email}</p>
                        <p>uid: <i> {user.uid}</i></p>
                        <img style={{width:"150px"}} alt="" src={user.photoURL} />
                        <button onClick={() => logout()}>Logout</button>
                    </>
                    : <p>Not A User</p>
            }


        </div>
    )
}

export default Home