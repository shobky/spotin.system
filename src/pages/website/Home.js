import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Home = () => {
    const { user, logout } = useAuth()
    console.log(user)
    console.log(process.env.REACT_APP_OWNER_ID);//printing it to console

    return (
        <div>
            <Link to="/signup">Signup</Link>
            <br />
            <Link to="/login">Login</Link>
            <br/>
            <Link to="/cashier.system">Cashier</Link>

            {
                user ?
                    <>
                        <p>name: <strong>{user.displayName}</strong></p>
                        <p>email: {user.email}</p>
                        <p>uid: <i> {user.uid}</i></p>
                        <button onClick={() => logout()}>Logout</button>
                    </>
                    : <p>Not A User</p>
            }


        </div>
    )
}

export default Home