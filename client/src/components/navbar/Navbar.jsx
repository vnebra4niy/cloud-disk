import React from 'react'
import './navbar.css'
import Logo from '../../assets/img/navbar_logo.svg'

const Navbar = () => {
    return (
        <div className='navbar'>
            <img src={Logo} alt='' className='navbar_logo'></img>
            <div className="navbar_header">CLOUD DISK</div>
            <div className="navbar_login">Sign in</div>
            <div className="navbar_registration">Sign up</div>
        </div>
    )
}

export default Navbar