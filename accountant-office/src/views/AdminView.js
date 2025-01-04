import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import './Admin.css';
export default function AdminView({ setIsLogged }) {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const navigateTo = useNavigate();
  const changeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((authCredential) => {
        setIsLogged(true);
        navigateTo('/actualitiesForm');
      })
      /* .then(() => {
        setTimeout(signOut(auth), 86400000);
      }) */
      .then(() => {
        console.log(auth.currentUser);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className='admin-form-container'>
      <form onSubmit={submitHandler}>
        <div className='email-input-container'>
          <label>Email:</label>
          <input name='email' value={data.email} type='email' onChange={changeHandler} />
        </div>
        <div className='password-input-container'>
          <label>Password:</label>
          <input
            name='password'
            value={data.password}
            type='password'
            onChange={changeHandler}
          />
        </div>
        <div className='button-container'>
          <button type='submit'>Sign in!</button>
        </div>
      </form>
    </div>
  );
}
