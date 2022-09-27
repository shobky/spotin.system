import React from 'react'
import { useNavigate } from 'react-router'

const Header = () => {
    const navigate = useNavigate()
    const goToHome = () => {
        navigate("/home")
    }
    return (
        <div onClick={goToHome} className='system_header'>
            <h1
                style={{ fontFamily: "montserrat-black" }}
                className='system_header_name'>Spot
                <span
                    style={{
                        fontFamily: "sans-seriref",
                        fontWeight: 'light',
                        fontSize: "28px",
                        marginLeft: "3px"
                    }}
                    className='pos_name-span'>IN
                </span>
            </h1>
            <p className='system_header_sub-name'>Cashier System</p>
        </div>
    )
}

export default Header