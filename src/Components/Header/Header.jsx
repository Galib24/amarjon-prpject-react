import React, { useContext } from 'react';
import './Header.css'
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
const Header = () => {
  const {user,logOut} = useContext(AuthContext);
  console.log(user);
  const handleLogout = ()=>{
    logOut()
    .then(result =>{})
    .catch(error => console.error(error))

  }
    return (
        <nav className='header'>
          <img src={logo} alt="" />
          <div>
          <Link to="/">shop</Link>
          <Link to="/orders">orders</Link>
          <Link to="/inventory">inventory</Link>
          <Link to="/login">Login</Link>
          <Link to="/signUp">Sign Up</Link>
          {user && <span className='text-white'>Welcome {user.email} <button onClick={handleLogout}>Log Out</button> </span> }
          </div>
        </nav>
    );
};

export default Header;