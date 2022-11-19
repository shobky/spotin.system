import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { IoRemoveCircleOutline, IoRemoveCircleSharp } from 'react-icons/io5'
import { db } from '../../../../firebase/Config'

const ItemInList = ({ item }) => {
    const handleChange = (e) => {
        updateDoc(doc(db, `items/${item.name}`), {
            cat: e.target.value
        })
    }

    const handleDeleteItem = () => {
        deleteDoc(doc(db, `items/${item.name}`))
    }
    return (
        <div className='items-ls_item'>
            <img className='item_list-item-img' src={item.url} alt="" />
            <div>
                <p> <strong>{item.name}</strong></p>
                <p>{item.price}L.e</p>
            </div>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={item.cat}
                    onChange={(e) => handleChange(e)}
                    autoWidth
                    label="Category"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'focus'}>Focus</MenuItem>
                    <MenuItem value={'fresh'}>Fresh</MenuItem>
                    <MenuItem value={'fill'}>Fill</MenuItem>
                </Select>
            </FormControl>
            <p onDoubleClick={handleDeleteItem}><IoRemoveCircleSharp className='item-ls_item-remove' /></p>
            <p><AiFillEdit className='item-ls_item-edit ' /></p>



        </div>
    )
}

export default ItemInList