import React, { useRef, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import "./auth.css"
import { useNavigate, Link } from "react-router-dom"
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { MdKeyboardBackspace } from "react-icons/md";
import { GiPlainCircle, GiCircle } from 'react-icons/gi'
import { IoSend } from "react-icons/io5"
import { FcGoogle } from "react-icons/fc";
import Signup from "./SignUp";



export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { signup, user } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    // async function handleSubmit(e) {
    //     e.preventDefault()


    //     setError("")
    //     setLoading(true)
    //     await login(emailRef.current.value, passwordRef.current.value)
    //         .then((userCredential) => {
    //             // Signed in 
    //             navigate('/')

    //             // ...
    //         })
    //         .catch((error) => {
    //             setError(error.code.slice(5));
    //             // ..
    //         });

    //     setLoading(false)
    // }

    // const showingthePassword = () => {
    //     setShowPassword(!showPassword)
    // }

    const loginuser = (e) => {
        e.preventDefault()
        const login = "login"
        signup(login)
    }


    return (
        <div className="auth-container">
            {
                loading ?
                    <div className="auth_loading-screen-filter">
                    </div> : ""
            }
            <div className="auth_backk-container">
                <Link to="/"> <MdKeyboardBackspace className="auth_back-arr" /></Link>
            </div>
            <div className="auth_content">
                <p className="auth_header">Log In </p>
                <div className="auth_header-contaeirn">
                    <div className="auth_hello-txt-div">
                        <p className="auth_hello-text">Hello <br /> Again,</p>
                        <p className="auth_hello-sub-text">login with your google account and find whats new in the space of the future ! </p>
                    </div>
                    <div className="auth-black-circle-container">
                        <div className="auth-black-circle"></div>
                    </div>
                </div>
                {error &&
                    <p className="auth_err">{error}</p>
                }
                <form onSubmit={loginuser} style={{ display: "flex", marginTop: "10px", justifyContent: "center" }}>
                    <button className="login_signup-btn" type="submit"><FcGoogle className="signup_goole-ico" type="submit" /> LOGIN</button>
                </form>

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