import React, { useState } from 'react'
import './accsettings.css'
import { IoArrowBackSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../../firebase/Config'

const AccSettings = () => {
    const { user } = useAuth()
    const [newemail, setNewEmail] = useState(user.email)
    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')

    const [loading, setLoading] = useState(false)
  

    const handleChangeCredential = (e) => {
        e.preventDefault()
        setLoading(true)
        sendPasswordResetEmail(auth, newemail, {
            url: "http://localhost:3000/login"
        }).then(() => {
            setMsg(` sent, check your spam folder. `)
            setLoading(false)

        }).catch((error) => {
            setErr(` failed to send, please try again.`)
            setLoading(false)
        })
    }
    return (
        <div>
            <Link to="/settings"><IoArrowBackSharp className='dashusers_back-ico' /></Link>
            <h1 className='acc-settig-header'>Reset Password</h1>

            {
                user ?
                    <form onSubmit={handleChangeCredential} className='accSettings-form'>
                        {
                            err ?
                                <p className='acc-settings-err'>{err}</p>
                                : msg ?
                                    <p className='acc-settings-msg'>{msg}</p> : ""
                        }
                        <div className='accsettings-form-section'>
                            <label>Your Email: </label>
                            <input
                                onChange={(e) => setNewEmail(e.target.value)}
                                value={newemail} type='email' className='acc-settings_input' placeholder='new email' />

                        </div>
                        {/* <div className='accsettings-form-section'>
                            <label>Reset Password: </label>
                            <input ref={NewPasswordRef} type='password' autoComplete='new-password' className='acc-settings_input' placeholder='new password' />

                        </div>
                        <div className='accsettings-form-section'>
                            <label>Check new Password: </label>
                            <input ref={confirmNewPasswordRef} type='password' autoComplete='new-password' className='acc-settings_input' placeholder='new password again' />
                        </div>

                        <div className='accsettings-form-section'>
                            <label>Current Password</label>
                            <input ref={CurrentPasswordRef} name='current-password' type='password' className='acc-settings_input' placeholder='password' />
                        </div> */}

                        {
                            loading ? 
                        <button type='button' disabled={true} className='accSettings-lsgo-btn__loadign'>sending..</button>
                            
                            :
                        <button type='submit' className='accSettings-lsgo-btn'>SEND</button>

                        }

                    </form> : ""
            }


        </div>
    )
}

export default AccSettings