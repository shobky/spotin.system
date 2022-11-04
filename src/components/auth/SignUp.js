import React, { useEffect, useRef, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import "./auth.css"
import { useNavigate, Link } from "react-router-dom"
import { MdKeyboardBackspace, MdRemove } from "react-icons/md";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { FcGoogle } from 'react-icons/fc'
import { GiPlainCircle, GiCircle } from 'react-icons/gi'
import { TbEditCircle } from 'react-icons/tb'
import { IoIosMale, IoIosFemale } from 'react-icons/io'
import man from '../../assets/avatars/man.png'
import woman from '../../assets/avatars/woman.png'

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase/Config";
import logo from '../../assets/logo.png'
import { doc, setDoc, updateDoc, collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Signup() {

    const { signup, user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const numberRef = useRef()
    const ageRef = useRef()
    const [gender, setGender] = useState('none')
    const navigate = useNavigate()

    // const usersQ = collection(db, `Users`)
    // const [users] = useCollectionData(usersQ)
    // const [userindb, setUserinDb] = useState()

    // useEffect(() => {
    //     users?.filter((dbUser) => {
    //         if (dbUser.email === user.email) {
    //             setUserinDb(dbUser)
    //         } else {

    //         }
    //     })
    // }, [users, user])


    const handleSubmit = (e) => {
        e.preventDefault()
        signup()
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        await setDoc(doc(db, `Users/${user.email}`), {
            email: user.email,
            name: user.displayName,
            uid: user.uid,
            url: user.photoURL,
            isSigned: true,
            number: numberRef.current.value,
            age: ageRef.current.value,
            gender: gender,
            commForm: 'filled'
        }).catch(err => setLoading(false))
        setLoading(true)
        setTimeout(() => {
            navigate('/')
        }, 1000);
    }


    return (
        <div className="auth-container">
            <div className="auth_backk-container">
                <Link to="/"> <MdKeyboardBackspace className="auth_back-arr" /><span className="auth_back-arrow-longer"></span> </Link>
            </div>
            <div className="auth_content">
                <p className="auth_header">Sign Up </p>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <img src={logo} alt="" width="125px" style={{ marginTop: "0px" }} />
                </div>
                {
                    user?.email ?

                        <form className="signup_form_info" autoComplete='on' onSubmit={(e) => onSubmitForm(e)}>
                            <label>Phone Number</label>

                            <input ref={numberRef} required={true} placeholder='' type="number" name=" number" className='comm-form_input' />
                            <label>Age</label>
                            <input ref={ageRef} required={true} placeholder='' type="number" className='comm-form_input' />
                            <label>Gender</label>
                            <div className="signup_from-gender-div">
                                <button type="button" className={gender === "male" ? "signup_form-gender-btn_male signup_form-gender-btn_male__active " : "signup_form-gender-btn_male"} onClick={() => setGender('male')}>Male</button>
                                <button type="button" className={gender === "female" ? "signup_form-gender-btn_female signup_form-gender-btn_female__active " : "signup_form-gender-btn_female"} onClick={() => setGender('female')}>Female</button>
                            </div>

                            <button type="submit" className="submit_btn_form-info">continue to my account</button>


                        </form>
                        :
                        <>
                            <form onSubmit={handleSubmit} className="auth_form">
                                <button className="signup_signup-btn" type="submit"><FcGoogle className="signup_goole-ico" /> SIGN UP</button>
                            </form>
                            <div className="footer-container">
                                <p className="auth_footer">Already have an account ? </p>
                                <Link className="auth_footer-btn" to="/login">LOGIN</Link>
                            </div></>
                }

            </div>
            <GiPlainCircle className="auth_circle-fill auth_circle-fill1 " />
            <GiPlainCircle className="auth_circle-fill auth_circle-fill2 " />
            <GiPlainCircle className="auth_circle-fill auth_circle-fill3 " />
            <GiCircle className="auth_circle-border auth_circle-border1" />
            <GiCircle className="auth_circle-border auth_circle-border2" />


        </div>
    )
}
