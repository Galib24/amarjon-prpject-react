import React, { useContext } from 'react';
import './Header.css'
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
const Header = () => {
  const {user} = useContext(AuthContext)
    return (
        <nav className='header'>
          <img src={logo} alt="" />
          <div>
          <Link to="/">shop</Link>
          <Link to="/orders">orders</Link>
          <Link to="/inventory">inventory</Link>
          <Link to="/login">Login</Link>
          <Link to="/signUp">Sign Up</Link>
          {user && <span>Welcome {user.email}</span> }
          </div>
        </nav>
    );
};

export default Header;