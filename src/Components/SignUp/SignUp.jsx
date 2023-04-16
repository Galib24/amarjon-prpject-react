import React from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
const SignUp = () => {
    const handleSignUp = e =>{
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        console.log(email,password,confirm);
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
                    <label htmlFor="password">ConfirmPassword</label>
                    <input className='input-back' type="password" name='confirm' required />
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p><small>Already have an account? <Link to='/login'>Login</Link> </small></p>
        </div>
    );
};

export default SignUp;