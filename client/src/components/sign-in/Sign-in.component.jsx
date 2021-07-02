import React, { useState } from 'react';
import { connect } from 'react-redux';

import './Sign-in.style.scss';

import FormInput from '../form-input/Form-input.component';
import CustomButton from '../custom-button/Custom-button.component';
import {
  googleSignInStart,
  emailSignInStart,
} from '../../redux/user/user.actions';

const SignIn = ({ googleSignInStart, emailSignInStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const { email, password } = userCredentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    emailSignInStart(email, password);
  };

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          label='Email'
          value={email}
          handleChange={handleChange}
          required
        />
        <FormInput
          name='password'
          type='password'
          label='Password'
          value={password}
          handleChange={handleChange}
          required
        />
        <div className='buttons'>
          <CustomButton type='submit'>Sign In</CustomButton>
          <CustomButton
            type='button'
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            Sign In with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
