import React from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import User from '../../selectUser/User'

const CommFormAnswer = ({ user, onGoBackDAshUser }) => {
    return (
        <div>
            <header style={{ display: "flex" }}>
            <p onClick={() => onGoBackDAshUser(false)}><IoArrowBackSharp className='dashusers_back-ico' /></p>
                <p style={{ marginTop: "11px" }}>dashboard\forms\</p>
            </header>
            <div>
                <div className='dahsboard-commform-img-containet'>
                    <img alt='' src={user?.photoURL ?? ""} className="dashboard_commform-answer_user-img-2" />
                </div>
                <h2 className='dashboard_commform-answer_username'>{user.name}</h2>
                <div className='dashboard_commform-ansers-info'>
                    <div>
                        <p className='dashboard_commform-answer_'> <strong>UID: </strong> #{user.uid}</p>
                        <p className='dashboard_commform-answer_'> <strong>Email: </strong> {user.email}</p>
                        <p className='dashboard_commform-answer_'> <strong>Number: </strong> {user.number}</p>
                        <p className='dashboard_commform-answer_'> <strong>Gender: </strong> {user.gender}</p>
                        {/* {
                            halloween === "going" ?
                                <p><strong>Halloween: </strong>

                                    {user?.events.halloween}
                                </p>
                                : ""
                        } */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommFormAnswer