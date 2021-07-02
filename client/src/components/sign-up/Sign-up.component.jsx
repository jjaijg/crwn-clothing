import React, { useState } from 'react';
import { connect } from 'react-redux';

import './Sign-up.style.scss';

import CustomButton from '../custom-button/Custom-button.component';
import FormInput from '../form-input/Form-input.component';

// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { signUpStart } from '../../redux/user/user.actions';

const SignUp = ({ signUpStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password don't match!");
      return;
    }

    signUpStart(email, password, displayName);
  };

  return (
    <div className='sign-up'>
      <h2 className='title'> I do not have a account</h2>
      <span> Sign up with email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          label='Display Name'
          value={displayName}
          handleChange={handleChange}
          required
        />
        <FormInput
          type='email'
          name='email'
          label='Email'
          value={email}
          handleChange={handleChange}
          required
        />
        <FormInput
          type='password'
          name='password'
          label='Password'
          value={password}
          handleChange={handleChange}
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          label='Confirm Password'
          value={confirmPassword}
          handleChange={handleChange}
          required
        />
        <CustomButton type='submit'> SIGN UP </CustomButton>
      </form>
    </div>
  );
};

const mapDisptachToProps = (dispatch) => ({
  signUpStart: (email, password, displayName) =>
    dispatch(signUpStart({ email, password, displayName })),
});

export default connect(null, mapDisptachToProps)(SignUp);
