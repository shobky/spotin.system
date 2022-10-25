import React from 'react'
import { IoMdSwap } from 'react-icons/io'
import { Link } from 'react-router-dom'
import Nav from '../components/nav/Nav'

const Evets = () => {
    return (
        <div className='events-container'>
            <Nav page="workshops"/>
                <Link to='/workshops'><IoMdSwap className='event_swap-ico' /></Link>

            <p>There is no upcoming events, come back soon.</p>
        </div>
    )
}

export default Evets