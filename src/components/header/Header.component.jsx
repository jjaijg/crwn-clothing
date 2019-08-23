import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';


import { ReactComponent as Logo } from '../../assets/crown.svg';
import './Header.style.scss'; 

let signout = () => auth.signOut();

const Header = ({ currentUser }) => (
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
    </div>
    </div>
);

// input root-state
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

// Connect is a higher order function, which will take a function & compoennt
// give extra access to the compoennt
export default connect(mapStateToProps)(Header);