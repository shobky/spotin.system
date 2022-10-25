import React from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'
import './history.css'

const History = () => {
    return (
        <div>
            <div className='history_header-container'>
                <IoArrowBackSharp className='history_back-ico' />
                <h1 className='history_header'>History</h1>
            </div>
        </div>
    )
}

export default History