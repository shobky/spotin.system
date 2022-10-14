import React from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { useDb } from '../../../contexts/Database'

const Product = ({ product, onAddToCart }) => {
    const { upload, orderId } = useDb()
    const { user } = useAuth()

    const handleAddToCart = () => {
        onAddToCart(product)
    }

    const onAddWithSize = async (price) => {
        const path = `cart#${orderId}-${(user?.uid).slice(-5)}`
        await upload(path, product.name, {
            item: {
                name: product.name,
                price
            },
            qty: 1,
        })
    }

    return (
        <div>
            <div className='pos_product-container' onClick={handleAddToCart}>
                <img className='pos_product-img' src={product.url} alt="" />
                <div className='pos_product-destails'>
                    <p className='pos_product-name'>{product.name}</p>
                </div>
            </div>
            {
                product.cat === "fill" ?
                    <div className='pos_product-size'>
                        <p onClick={() => onAddWithSize(product.small_price.small_price)}>S</p>
                        <p onClick={() => onAddWithSize(product.med_price.med_price)}>M</p>
                        <p onClick={() => onAddWithSize(product.large_price.large_price)}>L</p>
                    </div> : " "


            }
        </div>
    )
}

export default Product