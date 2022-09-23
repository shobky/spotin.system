import { useDb } from "../../../../contexts/Database"
import CartItem from "./CartItem"
import './cart.css'

const Cart = () => {
    const { cart } = useDb()
    return (
        <div className="cart-container">
            {
                cart?.map((cartItem, index) => (
                    <CartItem
                        key={index}
                        cartItem={cartItem} />
                ))
            }
        </div>
    )
}

export default Cart