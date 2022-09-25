import React, { useRef, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import "./auth.css"
import { useNavigate, Link } from "react-router-dom"
import { MdKeyboardBackspace, MdRemove } from "react-icons/md";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { IoSend } from 'react-icons/io5'
import { GiPlainCircle, GiCircle } from 'react-icons/gi'
import { TbEditCircle } from 'react-icons/tb'
import { IoIosMale, IoIosFemale } from 'react-icons/io'
import man from '../../assets/avatars/man.png'
import woman from '../../assets/avatars/woman.png'

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/Config";

export default function Signup() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    // const passwordConfirmRef = useRef()
    const { signup, } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState("password")
    const [gender, setGender] = useState('unkown')
    const [image, setImage] = useState(man)
    const [photoURL, setPhotoURL] = useState(null)

    const [edit, setEdit] = useState(true)
    const [uploaded, setUploaded] = useState(false)
    const [file, setFile] = useState(null)
    const navigate = useNavigate();



    const showingthePassword = (e) => {
        e.preventDefault()
        if (showPassword === "password") {
            setShowPassword("text")
        } else {
            setShowPassword("password")

        }
    }

    const handleSelectMale = () => {
        if (gender === 'male') {
            document.getElementById("auth_male-ico").classList.remove('auth-select-male')
            setGender('unkown')
        } else {
            document.getElementById("auth_female-ico").classList.remove('auth-select-female')
            document.getElementById("auth_male-ico").classList.add('auth-select-male')
            setGender('male')
            if (image === man || woman) {
                setImage(man)
            }
        }

    }
    const handleSelectFemale = () => {
        if (gender === 'female') {
            document.getElementById("auth_female-ico").classList.remove('auth-select-female')
            setGender('unkown')
        } else {

            document.getElementById("auth_male-ico").classList.remove('auth-select-male')
            document.getElementById("auth_female-ico").classList.add('auth-select-female')
            setGender('female')
            setImage(woman)
        }
    }

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0]
        if (file != null) {
            setPhotoURL(URL.createObjectURL(file))
            setEdit(false)
            setFile(file)
            const storageRef = ref(storage, `user-photos/${file.name}`)
            await uploadBytes(storageRef, file).then((snapshot) => {
                setUploaded(true)
            });
        }
    }
    const handlePhotoDiscard = () => {
        setPhotoURL(null)
        setEdit(true)


    }
    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        if (file?.name) {
            const url = await getDownloadURL(ref(storage, `user-photos/${file.name}`))
            setError("")
            await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value, url)
                .then((userCredential) => {
                    // Signed in 
                    navigate('/')
                    // ...
                })
                .catch((error) => {
                    setError(error.code.slice(5));
                    setLoading(false)

                    // ..
                });
        } else {
            setError("")
            await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value)
                .then((userCredential) => {
                    // Signed in 
                    navigate('/')
                    // ...
                })
                .catch((error) => {
                    setError(error.code.slice(5));
                    setLoading(false)

                    // ..
                });
        }



        setLoading(false)
    }
    return (
        <div className="auth-container">
            <div className="auth_backk-container">
                <Link to="/"> <MdKeyboardBackspace className="auth_back-arr" /><span className="auth_back-arrow-longer"></span> </Link>
            </div>
            <div className="auth_content">
                <p className="auth_header">Sign Up </p>
                <div style={{ display: "flex", justifyContent: "center" }}>

                </div>
                <div className="auth_header-contaeirn">
                    <div className="auth_hello-txt-div">
                        <p className="auth_hello-text">Hello <br /> There,</p>
                        <p className="auth_hello-sub-text">We are almost finished, just fill some information for us:</p>
                    </div>
                    <div className="auth-black-circle-container">
                        <div className="auth-black-circle"></div>
                        <img className="auth-user-image" src={photoURL ?? image} alt="avatar" />
                        <div className="auth_user-photo_actions">

                            {
                                edit ?
                                    <>
                                        <TbEditCircle className="auth_user-change-photo-ico" />
                                        <input onChange={(e) => handlePhotoChange(e)} id="auth_input_photo" className="auth_user-photo-input" type="file" /></>
                                    :
                                    <MdRemove onClick={handlePhotoDiscard} className="auth_user-discard-photo-ico" />

                            }
                        </div>
                    </div>
                </div>
                {error &&
                    <p className="auth_err-signUp">{error}</p>
                }
                <form onSubmit={handleSubmit} className="auth_form">
                    <div className="auth-form-label-div"><label className="auth_label">Name </label>
                        <input autocomplete="name" placeholder="Ahmed Shobky" className="sign-up_auth_input auth_input " ref={nameRef} required name="name" type="text" /></div>

                    <div className="auth-form-label-div"><label className="auth_label">Email </label>
                        <input placeholder="examble@provider.com" className="sign-up_auth_input auth_input" ref={emailRef} required name="email" type="email" /></div>
                    <label autocomplete="current-password" className="auth_label"> Password </label>
                    <div className="auth-form-label-div" style={{ position: "relative" }}>
                        <input placeholder="Type your passowrd" className="sign-up_auth_input auth_input" ref={passwordRef} required name="new-password" type={showPassword} />
                        <button type="button" className="auth_show-password-btn" onClick={(e) => showingthePassword(e)}>{showPassword === 'password' ? <RiEyeCloseLine className="passIco" /> : <RiEyeLine className="passIco" />}</button>
                    </div>
                    <div className="auth-form-label-div auth-fomr-gender">
                        <IoIosMale id="auth_male-ico" onClick={handleSelectMale} className="auth_gender-ico" />
                        Or
                        <IoIosFemale id="auth_female-ico" onClick={handleSelectFemale} className="auth_gender-ico" /> ?
                    </div>
                    <button className={loading ? "submit-btn-loading" : "sumbit-btn-signup"} type="submit"><IoSend /></button>
                </form>
                <p className="auth_footer">Already have an account ? <span ><Link className="auth_footer-btn" to="/login">log in</Link></span></p>
            </div>
            <GiPlainCircle className="auth_circle-fill auth_circle-fill1 " />
            <GiPlainCircle className="auth_circle-fill auth_circle-fill2 " />
            <GiPlainCircle className="auth_circle-fill auth_circle-fill3 " />
            <GiCircle className="auth_circle-border auth_circle-border1" />
            <GiCircle className="auth_circle-border auth_circle-border2" />


        </div>
    )
}
