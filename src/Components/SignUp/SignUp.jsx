import React, { useContext, useState } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
const SignUp = () => {

const [error,setError] = useState('');
const {createUser} = useContext(AuthContext)
    const handleSignUp = e =>{
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        console.log(email,password,confirm);

        // reset input 
        setError('');

        // confirm setup
        if(password !== confirm){
            setError('Your password did not match')
        return
        }
        else if(password.length < 6){
            setError('password must be 6 characters or long')
            return
        }

        createUser(email,password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
        })
        .catch(error =>{
            console.log(error);
            setError(error.message)
        })

    }
    return (
        <div className='form-container'>
            <h3 className='form-title'>Sign Up!</h3>
            <form onSubmit={handleSignUp}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input className='input-back' type="email" name='email' required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input className='input-back' type="password" name='password' required />
                </div>
                <div className="form-control">
                    <label htmlFor="Confirm">Confirm Password</label>
                    <input className='input-back' type="password" name='confirm' required />
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p><small>Already have an account? <Link to='/login'>Login</Link> </small></p>
       <p className='text-error'>{error}</p>
        </div>
    );
};

export default SignUp;