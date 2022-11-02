import React from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import User from '../../selectUser/User'

const CommFormAnswer = ({ user, halloween }) => {
    return (
        <div>
            <header style={{ display: "flex" }}>
                <Link to="/admin-dashboard"><IoArrowBackSharp className='dashusers_back-ico' /></Link>
                <p style={{ marginTop: "11px" }}>dashboard\forms\</p>
            </header>
            <div>
                <img alt='' src={user?.url ?? ""} className="dashboard_commform-answer_user-img" />
                <h2 className='dashboard_commform-answer_username'>{user.name}</h2>
                <div className='dashboard_commform-ansers-info'>
                    <div>
                        <p className='dashboard_commform-answer_'> <strong>UID: </strong> #{user.uid}</p>
                        <p className='dashboard_commform-answer_'> <strong>Email: </strong> {user.email}</p>
                        <p className='dashboard_commform-answer_'> <strong>Number: </strong> {user.number}</p>
                        <p className='dashboard_commform-answer_'> <strong>Gender: </strong> {user.gender}</p>
                        <p className='dashboard_commform-answer_'> <strong>Age: </strong> {user.age}</p>
                        <p className='dashboard_commform-answer_'> <strong>Title/Collage: </strong> {user.title}</p>
                        {
                            halloween === "going" ?
                                <p><strong>Halloween: </strong>

                                    {user?.events.halloween}
                                </p>
                                : ""
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommFormAnswer