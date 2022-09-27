import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { useDb } from '../../contexts/Database'
import './addnewitem.css'
import { db, storage } from '../../firebase/Config'
import { RiArrowDownSLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'



const AddNewItems = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState()
    const [category, setCategory] = useState('focus')
    const [image, setImage] = useState(null)
    const [uploaded, setUploaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [photoURL, setPhotoURL] = useState(null)
    const [error, setError] = useState(false)
    const [done, setDone] = useState(false)
    const [photoexist, setPhotoexist] = useState(false)

    const handleUploadingImage = async (e) => {
        let selectedFile = (e.target.files[0])
        if (selectedFile) {
            setLoading(true)
            setImage(selectedFile);
            setPhotoURL(URL.createObjectURL(selectedFile))
            setPhotoexist(true)
            const storageRef = ref(storage, `items-imgs/${selectedFile.name}`)
            await uploadBytes(storageRef, selectedFile).then((snapshot) => {
                setUploaded(true)
            });
            setLoading((false))

        } else {
            setError(1)
            setTimeout(() => {
                setError(false)

            }, 1000);
        }
    }
    const handleOnAddProducts = async (e) => {
        e.preventDefault()
        if (uploaded === true && category.length > 1) {
            setLoading(true)
            const url = await getDownloadURL(ref(storage, `items-imgs/${image.name}`))
            await setDoc(doc(db, category, name), {
                name,
                price,
                qty: 1,
                url
            })
                .catch((error) => {
                    setError(3)
                    setTimeout(() => {
                        setError(false)

                    }, 1000);
                })
            document.getElementById("addNewItemsForm").reset();
            setLoading(false)
            setUploaded(false)
            setDone(true)
            setTimeout(() => {
                setDone(false)

            }, 1000);
            setPhotoexist(false)
        } else {
            setError(2)
            setTimeout(() => {
                setError(false)

            }, 1000);
        }
    }
    return (
        <div className='add-new-items'>
            <div className='add-new_link-group'>
                <Link className='add-new-item-link' to="/">Home</Link>
                <Link className='add-new-item-link' to="/Cashier.system">Cashier</Link>
            </div>

            <h1 className='add-new-item-header'>Add New Items</h1>

            <form
                onSubmit={handleOnAddProducts}
                id="addNewItemsForm"
            >
                <div className='add-new-select-container'>
                    <label>Category </label>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className='category-select-addnew' >
                        <option value="focus" className={category === "focus" ? "option-acive-add-item" : ""} >focus</option>
                        <option value="fresh" className={category === "fresh" ? "option-acive-add-item" : ""}>fresh</option>
                        <option value="fill" className={category === "fill" ? "option-acive-add-item" : ""}>fill</option>
                    </select>

                </div>
                <label>Name</label>
                <input
                    required={true}
                    className='add-new-item-input'
                    placeholder='item name'
                    type="text"
                    onChange={(e) => setName(e.target.value)} />
                <label>Price</label>
                <input
                    required={true}

                    className='add-new-item-input'
                    type="number"
                    placeholder='item price'
                    onChange={(e) => setPrice(e.target.value)} />

                <label>Image.PNG</label>
                <div className='add-img-btn-area'>
                    <input
                        required={true}
                        className='add-new-item-input-img '
                        type="file"
                        onChange={(e) => handleUploadingImage(e)} />
                    <button type='button' className='add-new-item-input-img__btn '>{photoexist ? ' Edit File' : "Choose png File"}</button>
                    {photoexist && <img className='item-img-add-new' alt='' src={photoURL} />}
                </div>
                <p className={error ? 'error-msg-add-new' : done ? "done-msg-add-new" : ""}>{error === 1 ? "Could Not Upload Photo" : error === 2 ? "Please Add An Image First" : error === 3 ? "SomeThing Went Wrong, Try Again" : done ? "All Is Good" : ""} </p>
                <button className={loading ? 'loadingsubmit-btn' : 'submit-btn'} disabled={loading} type='submit' >{loading ? "Loadign..." : "Add"}</button>
            </form>

        </div>
    )
}

export default AddNewItems