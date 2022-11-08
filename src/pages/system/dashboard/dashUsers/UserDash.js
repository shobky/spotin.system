import React from 'react'
import { GrCircleInformation } from 'react-icons/gr'
import noPhoto from '../../../../assets/avatars/Profile-PNG-File.png'
import { auth } from '../../../../firebase/Config'

const UserDash = ({ user, community, onChooseUser }) => {
    console.log(auth.currentUser)
    return (
        <div className='dashboard_user-container'>
            <div className='dashboard_user-flex'>
                <img src={user.photoURL ?? noPhoto} alt="" />
                <div className='dashboard_user-info'>
                    <p className='dashboard_user-name'>{user.name ?? 'no name'} </p>
                    <p>#{user.uid ?? 'no id'} </p>
                    <p>{user.email ?? 'no email'} </p>
                    <p>{user.number ?? 'no number'} </p>
                   
                </div>


            </div>
            <div>
                {
                    community === 'true' ?
                        <button onClick={() => onChooseUser(user)} className='dashboard_user-community-btn'><GrCircleInformation /></button>
                        : ''
                }
            </div>
        </div>
    )
}

export default UserDash