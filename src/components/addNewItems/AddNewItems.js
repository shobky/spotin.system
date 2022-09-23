import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { useDb } from '../../contexts/Database'
import { db, storage } from '../../firebase/Config'

const AddNewItems = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState()
    const [category, setCategory] = useState('')
    const [image, setImage] = useState(null)
    const { upload } = useDb()
    const [uploaded, setUploaded] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleUploadingImage = (e) => {
        let selectedFile = (e.target.files[0])
        if (selectedFile) {
            setImage(selectedFile);
        } else {
            alert('please add viable image')
        }
    }
    const handleOnAddProducts = (e) => {
        setLoading(true)
        e.preventDefault()
        const storageRef = ref(storage, `items-imgs/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.log(error.message)
            },

            async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref)
                await upload(category, name, {
                    name,
                    qty: 1,
                    price: Number(price),
                    url
                })
                document.getElementById("addNewItemsForm").reset();
                setLoading(false)
                setUploaded(true)
                setTimeout(() => {
                    setUploaded(false)
                }, 1000);
            })
    }
    return (
        <div className='add-new-items'>
            <h1>Add New Items</h1>

            <form
                onSubmit={handleOnAddProducts}
                id="addNewItemsForm"
                style={{ display: "grid", width: "200px", margin: "50px" }}


            >
                <label>Name</label>
                <input
                    className='add-new-item-input'
                    type="text"
                    onChange={(e) => setName(e.target.value)} />
                <label>Price</label>
                <input
                    className='add-new-item-input'
                    type="number"
                    onChange={(e) => setPrice(e.target.value)} />
                <label>category</label>

                <div style={{
                    marginLeft: "15px"
                }}>
                    <option className={category === "focus" ? "option-acive-add-item" : ""} onClick={() => setCategory('focus')}>focus</option>
                    <option className={category === "fresh" ? "option-acive-add-item" : ""} onClick={() => setCategory('fresh')}>fresh</option>
                    <option className={category === "fill" ? "option-acive-add-item" : ""} onClick={() => setCategory('fill')}>fill</option>
                </div>
                <label>Image</label>
                <input
                    className='add-new-item-input'
                    type="file"
                    onChange={(e) => handleUploadingImage(e)} />
                <br />
                <button disabled={loading} type='submit' >{loading ? "Loadign..." : "Add"}</button>
            </form>

            {
                uploaded && <p>Iem Uploaded Succesfully</p>
            }
        </div>
    )
}

export default AddNewItems