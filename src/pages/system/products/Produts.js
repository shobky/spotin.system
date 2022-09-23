import React, { useState } from 'react'
import { useDb } from '../../../contexts/Database'
import Produt from './Produt'
import './products.css'


const Produts = ({ onAddToCart }) => {
    const { products, freshProducts, fillProducts } = useDb()
    const [nav, setNav] = useState('focus')
    return (
        <>
            <div className='products-nav'>
                <li className={nav === "focus" ? 'products-list-active' : ""}  onClick={() => setNav('focus')}>Focus</li>
                <li className={nav === "fresh" ? 'products-list-active' : ""} onClick={() => setNav('fresh')}>Fresh</li>
                <li className={nav === "fill" ? 'products-list-active' : ""} onClick={() => setNav('fill')}>Fill</li>

            </div>
            <div className='products-container'>
                {
                    nav === 'focus' ?
                        products?.map((product, index) => (
                            <Produt
                                key={index}
                                product={product}
                                onAddToCart={onAddToCart} />
                        ))
                        : nav === "fresh" ?
                            freshProducts?.map((product, index) => (
                                <Produt
                                    key={index}
                                    product={product}
                                    onAddToCart={onAddToCart} />
                            ))
                            : nav === "fill" ?
                                fillProducts?.map((product, index) => (
                                    <Produt
                                        key={index}
                                        product={product}
                                        onAddToCart={onAddToCart} />
                                )) : ""
                }
            </div>
        </>
    )
}

export default Produts