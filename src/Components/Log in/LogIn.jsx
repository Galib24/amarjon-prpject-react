import React, { useContext } from 'react';
import './LogIn.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
const LogIn = () => {
    const {signIn} = useContext(AuthContext)
const navigate = useNavigate();
const location = useLocation();
console.log(location);


const from = location.state?.from?.pathname || '/';

    const handleLogin = e =>{
        e.preventDefault();
        
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);

        signIn(email,password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            form.reset();
            navigate(from, {replace: true});
        })
        .catch( error =>{
            console.log(error);
        })
    }




    return (
        <div className='form-container'>
            <h3 className='form-title'>Log in path</h3>
            <form onSubmit={handleLogin}>
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