import React from 'react'
import { AiFillInstagram } from 'react-icons/ai'
import { MdCopyright } from 'react-icons/md'
import { RiFacebookCircleFill, RiWhatsappFill } from 'react-icons/ri'
import { SiGmail } from 'react-icons/si'


const Footer = () => {
    return (
        <div className='footer'>
            {/* <section className='footer_sochail-links-section'>
                <a href='https://web.facebook.com/spotin.egy'><RiFacebookCircleFill className="social-link-ico" /></a>
                <a href='https://www.instagram.com/spotin.egy/'><AiFillInstagram className="social-link-ico" /></a>
                <a href='https://wa.me/+201277195303'><RiWhatsappFill className="social-link-ico" /></a>
                <a href="mailto: shobkyy@gmail.com"> <SiGmail className="social-link-ico" /></a>
            </section> */}
            <p className='copy-right-footer'><MdCopyright className='copy-right-ico' />2022 Ahmed Shobky, Spotin EGY. All rights reserved.</p>

        </div>
    )
}

export default Footer