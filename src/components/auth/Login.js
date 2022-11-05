import React, { useRef, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import "./auth.css"
import Loading from '../../assets/loading.gif'
import { useNavigate, Link } from "react-router-dom"
import { TbArrowNarrowLeft } from "react-icons/tb";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { MdKeyboardBackspace, MdRemove } from "react-icons/md";
import { GiPlainCircle, GiCircle } from 'react-icons/gi'
import { IoSend } from "react-icons/io5"



export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()


        setError("")
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                // Signed in 
                navigate('/')

                // ...
            })
            .catch((error) => {
                setError(error.code.slice(5));
                // ..
            });

        setLoading(false)
    }

    const showingthePassword = () => {
        setShowPassword(!showPassword)
    }


    return (
        <div className="auth-container">
            <div className="auth_backk-container">
                <Link to="/"> <MdKeyboardBackspace className="auth_back-arr" /></Link>
            </div>
            <div className="auth_content">
                <p className="auth_header">Log In </p>
                <div className="auth_header-contaeirn">
                    <div className="auth_hello-txt-div">
                        <p className="auth_hello-text">Hello <br /> Again,</p>
                        <p className="auth_hello-sub-text">type email & password to find whats new in the space of the future ! </p>
                    </div>
                    <div className="auth-black-circle-container">
                        <div className="auth-black-circle"></div>
                    </div>
                </div>
                {error &&
                    <p className="auth_err">{error}</p>
                }
                <br/>
                <br/>
                <br/>
                <br/>

                <form autoComplete={true} onSubmit={handleSubmit} className="auth_form">
                    <div className="auth-form-label-div">
                        <label className="auth_label">Email </label>
                        <input autoComplete="email" placeholder="examble@provider.com" className="Log-in_auth_input auth_input" ref={emailRef} required name="email" type="email" />
                    </div>

                    <div className="auth-form-label-div">
                        <label className="auth_label"> Password </label>
                        <div style={{ position: "relative" }}>

                            <input autoComplete="current-password" placeholder="enter your password" id="password_input" className="Log-in_auth_input auth_input" ref={passwordRef} required name="password" type={showPassword ? "text" : "password"} />
                            <button type="button" className="auth_show-password-btn" onClick={showingthePassword}>{showPassword ? <RiEyeLine className="passIco" /> : <RiEyeCloseLine className="passIco" />}</button>
                        </div>
                    </div>
                    <button className={loading ? "submit-btn-loading loginsubmit" : "sumbit-btn-signup loginsubmit"} type="submit"><IoSend /></button>

                </form>
                <div style={{ display: "flex", marginTop: "10px", justifyContent: "center" }}>
                    <Link className="auth_forgot-pass" to='/settings/reset-password'>Forgot Password</Link>
                </div>
                <div className="footer-container">
                    <p className="auth_footer">Don't have an account? </p>
                    <Link to="/signup" className="auth_footer-btn" >sign up</Link>
                </div>
            </div>
            <GiPlainCircle className="auth_circle-fill auth_circle-fill1 " />
            <GiPlainCircle className="auth_circle-fill auth_circle-fill2 " />
            <GiPlainCircle className="auth_circle-fill auth_circle-fill3 " />
            <GiCircle className="auth_circle-border auth_circle-border1" />
            <GiCircle className="auth_circle-border auth_circle-border2" />
        </div>
    )
}