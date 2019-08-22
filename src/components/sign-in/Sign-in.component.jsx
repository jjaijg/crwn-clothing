import React, { Component } from 'react';

import './Sign-in.style.scss';

import {signInWithGoogle} from '../../firebase/firebase.utils';
import FormInput from '../form-input/Form-input.component';
import CustomButton from '../custom-button/Custom-button.component';

export default class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState( {
            [name]: value
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ email: '', password: '' })
    }

    render() {
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                <FormInput 
                    name='email' 
                    type='email' 
                    label='Email'
                    value={this.state.email} 
                    handleChange={this.handleChange}
                    required 
                />
                <FormInput 
                    name='password' 
                    type='password' 
                    label='Password'
                    value={this.state.password} 
                    handleChange={this.handleChange}
                    required 
                />
                <div className='buttons'>
                <CustomButton type='submit'>Sign In</CustomButton>
                <CustomButton 
                type="button"
                onClick={signInWithGoogle}
                isGoogleSignIn
                >
                Sign In with Google</CustomButton>
                </div>
                
                </form>
            </div>
        );
    }
}