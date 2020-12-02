import React, { Component } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

export default class SignIn extends Component {
  state = {
    email: '',
    password: '',
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            value={this.state.email}
            required
            handleChange={this.handleChange}
            label='Email'
            type='email'
          />
          <FormInput
            type='password'
            name='password'
            value={this.state.password}
            required
            handleChange={this.handleChange}
            label='Password'
          />
          <div className='buttons'>
            <Button type='submit'>Sign in</Button>
            <Button onClick={signInWithGoogle} isGoogleSignIn type='button'>
              Sign in with Google
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
