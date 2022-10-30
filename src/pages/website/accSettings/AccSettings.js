import React, { useRef, useState } from 'react'
import './accsettings.css'
import { IoArrowBackSharp } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { EmailAuthProvider, reauthenticateWithCredential, sendPasswordResetEmail, updateEmail, updatePassword } from 'firebase/auth'
import { auth } from '../../../firebase/Config'

const AccSettings = () => {
    const { user } = useAuth()
    const [newemail, setNewEmail] = useState(user.email)
    // const CurrentPasswordRef = useRef()
    // const NewPasswordRef = useRef()
    // const confirmNewPasswordRef = useRef()
    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')
    // const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    // console.log(user.auth.currentUser.providerData[0].providerId)

    // const reauthenticate = async (currentPassword) => {
    //     console.log('reauthenticating', currentPassword)
    //     let credintial = await auth.EmailAuthProvider.credential(
    //         user.email,
    //         currentPassword
    //     );
    //     return reauthenticateWithCredential(user, credintial).then(() => {
    //         console.log('done')
    //     }).catch(() => {
    //         console.log(' err resautijfkl')
    //     })
    // }

    // const handleChangeCredential = (e) => {
    //     e.preventDefault()
    //     reauthenticate(CurrentPasswordRef.current.value).then(() => {
    //         if (NewPasswordRef.current.value !== confirmNewPasswordRef.current.value) {
    //             return setErr(`passwords don't math`)
    //         }
    //         const promises = []
    //         setErr('')
    //         setLoading(true)
    //         if (newemail !== user.email) {
    //             promises.push(updateEmail(newemail))
    //         }
    //         if (NewPasswordRef.current.value) {
    //             promises.push(updatePassword(NewPasswordRef.current.value))
    //         }

    //         Promise.all(promises).then(() => {
    //             setMsg(`DONE, redirecting...`)
    //             setTimeout(() => {
    //                 navigate('/settings')
    //             }, 2000);
    //         })
    //             .catch(() => {
    //                 setErr(' failed to update account')
    //             })
    //             .finally(() => {
    //                 setLoading(false)
    //             })
    //     })

    // }

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