import React from 'react'
import { useDb } from '../../../contexts/Database'

const Summary = ({ tickets, total }) => {
    const { cart } = useDb()


    return (
        <div>
           
            <div className=' summary_text-group' >
                <div className='sumary_cart'>
                    {cart?.map((cartItem, index) => (
                        <div key={index} className='flex'>
                            <p className='summary_text'>{cartItem.qty}x </p>
                            <p className='summary_text'>{cartItem.item.name}</p>
                            <p className='summary_text'>{cartItem.item.price * cartItem.qty}</p>
                        </div>
                    ))}
                </div>
                {cart?.length > 0 && <p><strong>Cart total: </strong>{total - tickets.price}L.e</p>}
            </div>
            <div className='summary_tkts-total'>
                {tickets.price > 0 && <p><strong>Ticket total: </strong> {tickets.price}L.e</p>}
            </div>

            <p className='summary_subtotal'><strong>{total} L.e </strong></p>

        </div>
    )
}

export default Summary