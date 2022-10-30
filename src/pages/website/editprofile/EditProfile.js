import { updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useEffect, useRef, useState } from 'react'
import { BsXLg } from 'react-icons/bs'
import { GoCheck } from 'react-icons/go'
import { TbEditCircle } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { auth, db, storage } from '../../../firebase/Config'
import Nav from '../components/nav/Nav'
import Profileblank from '../../../assets/avatars/Profile-PNG-File.png'

import './editprofile.css'
import { number } from 'prop-types'
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri'
import { AiOutlineLoading } from 'react-icons/ai'
import { ImSpinner2 } from 'react-icons/im'

const EditProfile = () => {
    const { user } = useAuth()
    const [photoFile, setPhotoFile] = useState(null)
    const [photoLink, setphotoLink] = useState()
    const [newUsername, setNewUsername] = useState(user.displayName)

    const nameRef = useRef()
    const currentPasswordRef = useRef()
    const numberRef = useRef()
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState("password")
    const [loading, setLoading] = useState(false)


    const showingthePassword = (e) => {
        e.preventDefault()
        if (showPassword === "password") {
            setShowPassword("text")
        } else {
            setShowPassword("password")

        }
    }


    const onSubmitForm = async (e) => {
        e.preventDefault()


        if (currentPasswordRef.current.value === user.auth.currentUser.providerData[0].providerId) {
            setLoading(true)
            if (numberRef.current.value?.length > 0 && nameRef.current.value?.length > 0) {
                await updateDoc(doc(db, "Users", user.email), {
                    name: newUsername,
                    // url: user.photoURL
                    number: numberRef.current.value ?? null
                }).catch(err => setLoading(false) && console.log(err))
            } else if (nameRef.current.value?.length > 0) {
                await updateDoc(doc(db, "Users", user.email), {
                    name: newUsername,
                    // url: user.photoURL
                }).catch(err => setLoading(false) && console.log(err))
            } else {
                await updateDoc(doc(db, "Users", user.email), {
                    number: numberRef.current.value ?? null
                    // url: user.photoURL
                }).catch(err => setLoading(false) && console.log(err))
            }
            if (photoFile) {
                const storageRef = ref(storage, `user-photos/${photoFile.name}`)
                await uploadBytes(storageRef, photoFile).then((snapshot) => {
                });
            }
            const url = photoFile?.name ? await getDownloadURL(ref(storage, `user-photos/${photoFile?.name ?? ""}`)) : ""
            if (nameRef.current.value?.length > 0) {
                await updateProfile(auth.currentUser, {
                    displayName: nameRef.current.value,
                    photoURL: photoFile?.name ? url : auth.currentUser.photoURL
                }).catch(err => setLoading(false) && console.log(err))
            } else {
                await updateProfile(auth.currentUser, {
                    // displayName: nameRef.current.value.length > 1 ?? auth.currentUser.displayName,
                    photoURL: photoFile?.name ? url : auth.currentUser.photoURL
                }).catch(err => setLoading(false) && console.log(err))
            }
            navigate('/profile')
            const form = document.getElementById('form-edit-prfile')
            form.reset()

            console.log('done')
        } else {
            setLoading(true)
            const PssinputId = document.getElementById("editProfilePassId")
            const wrongpassworderr = document.getElementById("wrongpassworderr")

            PssinputId.classList.remove('edit-profile_form_input')

            PssinputId.classList.add('wrong-password-style')
            wrongpassworderr.classList.add('edit-profile-wrong__vis')
            setTimeout(() => {
                setLoading(false)

            }, 500);


        }

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
            <form autoComplete={true} id='form-edit-prfile' onSubmit={onSubmitForm} className='edit-profile_form'>
                {/* <label>name</label> */}
                <input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} ref={nameRef} className='edit-profile_form_input' placeholder='Name' type="text" name="username" />
                {/* <label>phone number</label> */}
                <input ref={numberRef} className='edit-profile_form_input' placeholder='phone number' type="text" name="number" />
                {/* <label>current password</label> */}
                <input id='editProfilePassId' ref={currentPasswordRef} required={true} className='edit-profile_form_input' placeholder='current password' type={showPassword} />
                <div className='edit-prfile_password-div'>
                    <button type="button" className="edit-profile_show-password-btn" onClick={(e) => showingthePassword(e)}>{showPassword === 'password' ? <RiEyeCloseLine className="passIco" /> : <RiEyeLine className="passIco" />}</button>
                </div>

                <p id='wrongpassworderr' className='edit-profile_wrong-err__hid'>Wrong Password</p>

                {
                    loading ?
                        <ImSpinner2 className='edit-profoile_form-subm-btn__laoding' /> :
                        <button type='submit' className='edit-profoile_form-subm-btn'><GoCheck /></button>
                }
            </form>
        </div>
    )
}

export default EditProfile