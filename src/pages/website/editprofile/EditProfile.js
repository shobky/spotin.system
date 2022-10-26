import { updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useRef, useState } from 'react'
import { BsXLg } from 'react-icons/bs'
import { GoCheck } from 'react-icons/go'
import {  TbEditCircle } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { auth, db, storage } from '../../../firebase/Config'
import Nav from '../components/nav/Nav'
import Profileblank from '../../../assets/avatars/Profile-PNG-File.png'

import './editprofile.css'

const EditProfile = () => {
    const { user } = useAuth()
    const [photoFile, setPhotoFile] = useState(null)
    const [photoLink, setphotoLink] = useState()

    const nameRef = useRef()
    const currentPasswordRef = useRef()
    const numberRef = useRef()
    const navigate = useNavigate()

    console.log(auth.currentUser)

    const onSubmitForm = async (e) => {
        e.preventDefault()


        await updateDoc(doc(db, "Users", user.email), {
            name: nameRef.current.value ?? auth.currentUser.displayName,
            // url: user.photoURL
            number: numberRef.current.value ?? null
        })
        if (photoFile) {
            const storageRef = ref(storage, `user-photos/${photoFile.name}`)
            await uploadBytes(storageRef, photoFile).then((snapshot) => {
            });
        }
        const url = photoFile?.name ? await getDownloadURL(ref(storage, `user-photos/${photoFile?.name ?? ""}`)) : ""
        await updateProfile(auth.currentUser, {
            displayName: nameRef.current.value ?? auth.currentUser.displayName,
            photoURL: photoFile?.name ? url : auth.currentUser.photoURL
        })
        navigate('/profile')
        const form = document.getElementById('form-edit-prfile')
        form.reset()

        console.log('done')

    }
    const onChangePhoto = (file) => {
        if (file) {
            setPhotoFile(file)
            setphotoLink(URL.createObjectURL(file))
        } else {
            console.log("error adding photo, try again")
        }
    }

    return (
        <div>
            <div className='edit-profile_top-left'>
                <Link to="/profile"> <BsXLg className="profile_x-icon" /> </Link>
                <h1 className='edit-profile-head'>Edit profile</h1>
            </div>
            <Nav />


            <div className='edit-profile_photo-div'>
                <img className='edit-profile_img' alt='' src={photoLink ?? user.photoURL ?? Profileblank} />
                <TbEditCircle className='edit-profile_change-photo' />
                <input onChange={(e) => onChangePhoto(e.target.files[0])} className='file-input-edit-prifle' type="file" />
            </div>
            <form id='form-edit-prfile' onSubmit={onSubmitForm} className='edit-profile_form'>
                <input ref={nameRef} className='edit-profile_form_input' placeholder='Name' />
                <input ref={numberRef} className='edit-profile_form_input' placeholder='Phone Number' />
                <input ref={currentPasswordRef} required={true} className='edit-profile_form_input' placeholder='Current Password' />


                <button type='submit' className='edit-profoile_form-subm-btn'><GoCheck /></button>
            </form>
        </div>
    )
}

export default EditProfile