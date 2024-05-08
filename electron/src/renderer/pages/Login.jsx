import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import Footer from 'renderer/components/Footer';
import Header from 'renderer/components/Header';
import editCard from '../../../assets/editCard.png';
import fundIcon from '../../../assets/fundIcon.png';
import newCard from '../../../assets/newCard.png';

const Login = () => {
  const navigate = useNavigate();
  // useRef
  const usernameRef = useRef();
  const passwordRef = useRef();
  const submitRef = useRef();

  const appendError = (error) => {
    const errorElement = document.createElement('p');
    errorElement.classList.add('bg-red-500', 'text-lg', 'text-white', 'text-lg', 'p-3', 'px-5', 'rounded-lg', 'font-light', 'text-center', 'cursor-default', 'fixed', 'bottom-4', 'right-4');
    errorElement.innerText = error + ' ' + '👮‍♂️';
    submitRef.current.parentElement.appendChild(errorElement);
    setTimeout(() => {
      errorElement.remove();
    }, 4000);
  }

  const loginAPI = (username, password) => {
    if (usernameRef.current.value.length === 0 || passwordRef.current.value.length === 0) {
      return;
    }
    submitRef.current.classList.add('animate-pulse', 'grayscale', 'cursor-default');
    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          submitRef.current.classList.remove('animate-pulse', 'grayscale', 'cursor-default');
          appendError(data.error);
          return;
        }
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        navigate('/home');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="font-light p-6 flex flex-col justify-between min-h-screen gap-y-4 bg-background bg-cover">
      <Header data={{ disabledBack: true }} />
      <main className='flex w-full justify-center'>
        <div className="p-4 flex flex-col gap-2 min-w-[24rem]">
          <input ref={usernameRef} required type="text" placeholder="Username" className="p-4 border border-pink-100 rounded-lg outline-none" />
          <input onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setTimeout(() => {
                loginAPI(usernameRef.current.value, passwordRef.current.value);
              }, 100);
            }
          }} ref={passwordRef} required type="password" placeholder="Password" className="p-4 border border-pink-100 rounded-lg outline-none" />
          <button ref={submitRef} onClick={(e) => {
            setTimeout(() => {
              loginAPI(usernameRef.current.value, passwordRef.current.value);
            }, 100);
          }} type="submit" className="p-2 border border-pink-600 rounded-lg bg-pink-500 hover:brightness-95 text-white font-semibold">Login</button>
        </div>
      </main>
      <Footer data={{ disabled: true }} />
    </div>
  );
};

export default Login;
