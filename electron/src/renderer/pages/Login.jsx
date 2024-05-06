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

  const login = (username, password) => {
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        localStorage.setItem('user', JSON.stringify(data));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="font-light p-6 flex flex-col justify-between min-h-screen gap-y-4">
      <Header data={{ disabledBack: true }} />
      <main className='flex w-full justify-center'>
        <div className="p-4 flex flex-col gap-2">
          <input ref={usernameRef} required type="text" placeholder="Username" className="p-4 border border-zinc-300 rounded-lg outline-none" />
          <input ref={passwordRef} required type="password" placeholder="Password" className="p-4 border border-zinc-300 rounded-lg outline-none" />
          <button ref={submitRef} onClick={(e) => {
            if (usernameRef.current.value.length === 0 || passwordRef.current.value.length === 0) {
              return;
            }
            submitRef.current.classList.add('animate-pulse', 'grayscale', 'cursor-default');
            setTimeout(() => {
              login(usernameRef.current.value, passwordRef.current.value);
              navigate("/home");
            }, 2500);
          }} type="submit" className="p-4 border border-zinc-300 rounded-lg bg-green-500 hover:brightness-95 text-white font-semibold">Login</button>
        </div>
      </main>
      <Footer data={{ disabled: true }} />
    </div>
  );
};

export default Login;
