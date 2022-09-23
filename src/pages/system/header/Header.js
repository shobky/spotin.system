import React from 'react'

const Header = () => {
    return (
        <div className='system_header'>
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