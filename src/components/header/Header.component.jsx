import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';

import CartIcon from '../cart-icon/Cart-icon.component';
import CartDropdown from '../cart-dropdown/Cart-dropdown.component';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import './Header.style.scss'; 

let signout = () => auth.signOut();

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
    <Link className='logo-container' to='/'>
        <Logo className='logo' />
    </Link>
    <div className='options'>
    <Link className='option' to='/shop'>SHOP</Link>
    <Link className='option' to='/shop'>CONTACT</Link>
    {
        currentUser ?
        <div className='option' onClick={signout}>SIGN OUT</div>
        :
        <Link className='option' to='/signin'>SIGN IN</Link>
    }
    <CartIcon />
    
    </div>
    {
        hidden 
        ? null 
        : <CartDropdown />
    }
    
    </div>
);

// input root-state
const mapStateToProps = ({ user: {currentUser}, cart: {hidden} }) => ({
    currentUser,
    hidden
})

// Connect is a higher order function, which will take a function & compoennt
// give extra access to the compoennt
export default connect(mapStateToProps)(Header);