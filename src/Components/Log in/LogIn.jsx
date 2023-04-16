import React from 'react';
import './LogIn.css'
import { Link } from 'react-router-dom';
const LogIn = () => {
    return (
        <div className='form-container'>
            <h3 className='form-title'>Log in path</h3>
            <form>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input className='input-back' type="email" name='email' required/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input className='input-back' type="password" name='password' required/>
                </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p><small>New to Emaa-john? <Link to='/signUp'>Create new account</Link> </small></p>
        </div>
    );
};

export default LogIn;