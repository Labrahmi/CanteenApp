import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Footer from "renderer/components/Footer";
import Header from "renderer/components/Header";

const AmountSuccess = (data) => {

  const navigate = useNavigate();

  useEffect(() => {
    //
  }, [])


  return (
    <div className="font-light p-6 flex flex-col justify-between min-h-screen gap-y-4">
      <Header />
      <main className="p-4 flex flex-col justify-center items-center gap-2">
        <Link to={"/home"} className='flex gap-2 justify-center items-center bg-pink-100 p-2 rounded-xl shadow-2xl shadow-zinc-100 cursor-pointer hover:scale-[1.015] transition-all duration-500 ease-in-out'>
          <div className="w-12 h-12 rounded-full bg-pink-400 p-2 flex items-center justify-center">
            <svg aria-hidden="true" className="w-8 h-8 text-pink-300 dark:text-pink-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Success</span>
          </div>
          <div className='text-xl text-pink-800'>Balance Added Successfully, click to go back</div>
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default AmountSuccess;
