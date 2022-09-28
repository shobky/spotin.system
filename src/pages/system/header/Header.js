import React from 'react'
import { useNavigate } from 'react-router'

const Header = () => {
    const navigate = useNavigate()
    const goToHome = () => {
        navigate("/")
    }
    return (
        <div style={{ width: "150px"}} onClick={goToHome} className='system_header'>
            <h1
                style={{ fontFamily: "montserrat-black" }}
                className='system_header_name'>Spot
                <span
                    style={{
                        fontFamily: "montserrat-regular",
                        fontWeight: 'light',
                        fontSize: "28px",
                    }}
                    className='pos_name-span'>In
                </span>
            </h1>
            <p className='system_header_sub-name'>Cashier System</p>
        </div>
    )
}

export default Header