import './nav.css'
import { Link } from 'react-router-dom'
import { IoHome } from "react-icons/io5"
import { MdOutlineShoppingCart, MdOutlineRemoveShoppingCart } from 'react-icons/md'
import { useDb } from '../../../contexts/Database'
import ordersIco from '../../../assets/clipboard.png'

const Nav = ({ showPrebare, onShowPrepare }) => {
    const { cart, openOrders } = useDb()

    return (
        <>
            <div className='pos_nav'>
                <div className='pos_home-btn-contain'>
                    <p className='pos_home-link'><IoHome /></p>
                </div>
                <div className='pos_link-group'>
                    <Link to="/pos" className='pos_NavLink'>Put</Link>
                    <Link to="/cashier.system/orders" className='pos_NavLink'>Get</Link>
                    <Link to="/cashier.system/add-new-item" className='pos_NavLink'>Add</Link>
                </div>
            </div>

            <div className='pos_mb-nav'>
                <button className='pos_mb-cart-btn' onClick={onShowPrepare} >
                    {showPrebare ? <div className='nav_cart-ico-container'>
                        <Link to="/cashier.system/orders">
                            {openOrders?.length > 1 ?
                                <span className='nav_order-ico-num-length'>{openOrders?.length}</span>
                                : ""
                            }
                            <img className='nav_order-ico' src={ordersIco} alt="" /></Link>
                        <MdOutlineShoppingCart className='pos_mb-cart-btn-icon pos_mb-cart-btn__show' />
                        {cart?.length > 0 ?
                            <span className='nav-cart-length'>{cart?.length}</span> : ""}

                    </div> :
                        <MdOutlineRemoveShoppingCart className='pos_mb-cart-btn-icon pos_mb-cart-btn__hide' />}
                </button>
            </div></>
    )
}

export default Nav