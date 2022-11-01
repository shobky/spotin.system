import React, { useRef, useState } from 'react'
import './commform.css'
import { useAuth } from '../../../contexts/AuthContext'

import { BiArrowBack } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/Config'
const CommunityForm = () => {
    const { user } = useAuth()
    const numberRef = useRef()
    const ageRef = useRef()
    const genderRef = useRef()
    const titleRef = useRef()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [welcommsg, setwelcommsg] = useState(false)

    const onSubmitForm = async (e) => {
        e.preventDefault()
        setLoading(true)

        await updateDoc(doc(db, `Users/${user.email}`), {
            number: numberRef.current.value,
            age: ageRef.current.value,
            gender: genderRef.current.value,
            title: titleRef.current.value,
            commForm: 'filled'
        }).catch(err => setLoading(false))
        setLoading(true)
        setwelcommsg(true)
        setTimeout(() => {
            navigate('/')
        }, 4000);

    }
    return (
        <div className='comm-form'>

            <header>
                {/* <img alt='' src={logo} className='comm-form_logo' /> */}
                <p className='comm-form-title'>Spotin Community</p>
            </header>
            <p className='comm-form_head'>Hi {user.displayName}, tell us more about yourself.. </p>
            <form autoComplete='on' onSubmit={(e) => onSubmitForm(e)}>
                <input readOnly={true} required={true} placeholder='Name' value={user.displayName ?? ""} type="text" className='comm-form_input' />
                <input readOnly={true} required={true} placeholder='Email' value={user.email ?? ""} type="email" className='comm-form_input' />
                <input ref={numberRef} required={true} placeholder='Phone Number' type="number" name=" number" className='comm-form_input' />
                <input ref={ageRef} required={true} placeholder='Age' type="number" className='comm-form_input' />
                <input ref={genderRef} required={true} placeholder='Gender' type="text" className='comm-form_input' />
                <input ref={titleRef} required={false} placeholder='Title / Collage' type="text" className='comm-form_input' />

                {
                    loading ?
                        <button disabled={true} type='submit' className='comm_submit-form-btn__loading'>loading...</button>
                        : <button type='submit' className='comm_submit-form-btn'>Submit</button>
                }

                <Link className='comm-form-back-ico' to="/"> <BiArrowBack /></Link>
            </form>
            {
                welcommsg ? <div onDoubleClick={() => navigate('/')} className='welcomemsg-container'>
                    <p>Welcome Onboard</p> </div> : ""
            }
        </div>
    )
}

export default CommunityForm