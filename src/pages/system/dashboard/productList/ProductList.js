import { collection, doc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Link } from 'react-router-dom'
import { db } from '../../../../firebase/Config'
import ItemInList from './ItemInList'
import './productList.css'
import { BiArrowBack } from 'react-icons/bi'
import { MdFilterAlt } from 'react-icons/md';

const ProductList = () => {
    const itemsq = collection(db, `items`)
    const [items] = useCollectionData(itemsq)

    const [filter, setFilter] = useState('all')
    const [searchQ, setSearchQ] = useState('')


    return (
        <div style={{ background: 'white' }}>
            <header className='item-ls_header'>
                <Link to='/admin-dashboard'><BiArrowBack style={{ fontSize: '25PX', color: "black" }} /></Link>
                <h1 className='items-list_head'>Items List</h1>
                <input onChange={(e) => setSearchQ(e.target.value)} placeholder='search' className='item-ls_seach-input' />
                <div className='item-ls_filter-btns'>
                    <button onClick={() => setFilter("focus")} className={`item-ls_filter-btn ${filter==='focus' ? 'item-ls_filter_active' :""}` }>FOCUS</button>
                    <button onClick={() => setFilter("fresh")} className={`item-ls_filter-btn ${filter==='fresh' ? 'item-ls_filter_active' :""}`}>FRESH</button>
                    <button onClick={() => setFilter("fill")} className={`item-ls_filter-btn ${filter==='fill' ? 'item-ls_filter_active' :""}`}>FILL</button>
                    <p onClick={() => setFilter("all")}><MdFilterAlt style={{fontSize:"30px", color:"black", cursor:"pointer"}} className={`${filter === 'all' ? `item-ls_filter_active` : '' }`} /></p>

                </div>
            </header>
            <div className='items-list_items-container'>
                {
                    items?.filter((fItem) => {
                        if (filter === 'all') {
                            return fItem
                        } else if (fItem.cat === filter) {
                            return fItem
                        } else {

                        }

                    }).filter((fItems) => {
                        if (searchQ === '') {
                            return fItems
                        } else if (fItems.name.toLowerCase().includes(searchQ.toLowerCase())) {
                            return fItems
                        } else {
                        }
                    }).map((item, index) => (
                        <ItemInList key={index} item={item} />
                    ))
                }
            </div>

        </div>
    )
}

export default ProductList