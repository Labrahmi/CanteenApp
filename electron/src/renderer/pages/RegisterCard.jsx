import Footer from 'renderer/components/Footer';
import Header from 'renderer/components/Header';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import dish_1 from '../../../assets/dish_1.png'
import dish_2 from '../../../assets/dish_2.png'
import dish_3 from '../../../assets/dish_3.png'
import dish_4 from '../../../assets/dish_4.png'
import dish_5 from '../../../assets/dish_5.png'
import dish_6 from '../../../assets/dish_6.png'
import { app } from 'electron';

const Pos = () => {

  const navigate = useNavigate();

  const dishesParent = useRef(null);
  //
  const userField_1 = useRef(null);
  const userField_2 = useRef(null);
  const userField_3 = useRef(null);
  //
  const [selectedDish, setSelectedDish] = useState(null);
  const [user, setUser] = useState({
    name: "",
    role: "",
    balance: "",
    username: "",
  });

  const dishList = [
    {
      name: 'Hotdog',
      price: 1.00,
      image: dish_1
    },
    {
      name: 'Cupcake',
      price: 30.00,
      image: dish_2
    },
    {
      name: 'Donuts',
      price: 30.00,
      image: dish_3
    },
    {
      name: 'Pizza',
      price: 30.00,
      image: dish_4
    },
    {
      name: 'Scrambled Eggs',
      price: 30.00,
      image: dish_5
    },
    {
      name: 'Fruit salad',
      price: 30.00,
      image: dish_6
    }
  ]
  //
  //  ----------------------------------------------------------------------------------------------------------
  async function fetchUser() {
    let response = await fetch('http://127.0.0.1:3000/api/users/student');
    let user = await response.json();
    setUser(user);
    userField_1.current.classList.remove('animate-pulse');
    userField_2.current.classList.remove('animate-pulse');
    userField_3.current.classList.remove('animate-pulse');
  }
  //  ----------------------------------------------------------------------------------------------------------
  // |
  // |
  // |
  //  ----------------------------------------------------------------------------------------------------------
  const appendMessage = (messge, status) => {
    console.log(messge, status);
    const messageColor = status === 'error' ? 'bg-red-500' : 'bg-green-500';
    const errorElement = document.createElement('p');
    errorElement.classList.add(`${messageColor}`, 'text-lg', 'text-white', 'text-lg', 'p-3', 'px-5', 'rounded-lg', 'font-light', 'text-center', 'cursor-default', 'fixed', 'bottom-4', 'right-4');
    errorElement.innerText = messge + ' ' + '👮‍♂️';
    window.document.body.appendChild(errorElement);
    setTimeout(() => {
      errorElement.remove();
    }, 4000);
  }
  //  ----------------------------------------------------------------------------------------------------------
  // |
  // |
  // |
  const rest_all_the_data = () => {
    setSelectedDish(null);
    setUser({
      name: "",
      role: "",
      balance: "",
      username: "",
    });
    userField_1.current.classList.add('animate-pulse');
    userField_2.current.classList.add('animate-pulse');
    userField_3.current.classList.add('animate-pulse');
    dishesParent.current.childNodes.forEach((child) => {
      child.classList.remove('bg-pink-800', 'text-white');
    });
  }
  //  ----------------------------------------------------------------------------------------------------------
  // |
  // |
  // |
  //  ----------------------------------------------------------------------------------------------------------
  const handleConfirmOrder = async () => {
    if (user.username == null || user.username == '') {
      alert('User not found');
      return;
    }
    const message = selectedDish == null ? 'Please select a dish!' : `Hey ${user.username}. You have selected: ${dishList[selectedDish].name}`;
    if (selectedDish == null) {
      alert(message);
      return;
    }
    if (confirm(message)) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      //
      var urlencoded = new URLSearchParams();
      urlencoded.append("username", `${user.username}`);
      urlencoded.append("amount", `${dishList[selectedDish].price}`);
      urlencoded.append("transactionType", "purchase");
      //
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };
      //
      try {
        let resp = await fetch("http://127.0.0.1:3000/api/transactions", requestOptions);
        let data = await resp.json();
        if (data.error) {
          appendMessage(data.error, 'error');
          rest_all_the_data();
          return;
        }
        // success
        appendMessage('Transaction successful', 'success');
        rest_all_the_data();
      } catch (error) {
        rest_all_the_data();
        console.error('Error:', error);
      }
    }
  };
  //----------------------------------------------------------------------------------------------------------
  // |
  // |
  // |
  //  ----------------------------------------------------------------------------------------------------------
  const handleDishClick = (index, e) => {
    if (selectedDish == index) {
      setSelectedDish(null);
      e.currentTarget.classList.remove('bg-pink-800', 'text-white');
      return;
    }
    setSelectedDish(index);
    dishesParent.current.childNodes.forEach((child) => {
      child.classList.remove('bg-pink-800', 'text-white');
    });
    e.currentTarget.classList.add('bg-pink-800', 'text-white');
  };
  //----------------------------------------------------------------------------------------------------------
  // |
  // |
  // |
  //  ----------------------------------------------------------------------------------------------------------
  // window.addEventListener('keypress', (e) => {
  //   if (e.key === 'Enter') {
  //     alert('Enter key pressed');
  //   }
  // });
  //----------------------------------------------------------------------------------------------------------

  const itemClasses = 'flex border bg-white border-r-0 border-t-0 shadow-2xl shadow-zinc-100 gap-1 justify-start p-2 items-center rounded-xl w-64 transition-all duration-200 ease-in-out cursor-pointer';


  return (
    <div className="font-light p-6 flex flex-col justify-between min-h-screen gap-y-4">
      <Header />
      <main className='flex justify-center gap-4'>
        {/* 0 */}
        <div className='p-4 rounded-xl flex flex-col gap-2 justify-center'>
          <h1 onClick={fetchUser} className='font-semibold'>User Informations</h1>
          <input disabled ref={userField_1} value={user.name} placeholder='Name' type="text" className='p-2 bg-zinc-100 rounded text-sm font-light animate-pulse' />
          <input disabled ref={userField_2} value={user.role} placeholder='Role' type="text" className='p-2 bg-zinc-100 rounded text-sm font-light animate-pulse' />
          <input disabled ref={userField_3} value={user.balance} placeholder='Balance' type="text" className='p-2 bg-zinc-100 rounded text-sm font-light animate-pulse' />
        </div>
        {/* 1 */}
        <div ref={dishesParent} className='grid grid-cols-2 flex-col gap-4'>
          {dishList.map((dish, index) => (
            <div onClick={(e) => {
              handleDishClick(index, e);
            }} key={index} className={itemClasses}>
              <img className='w-20' src={dish.image} alt={dish.name} />
              <div>
                <h1 className='text-lg'>{dish.name}</h1>
                <h2 className='font-thin'>{dish.price} Dh</h2>
              </div>
            </div>
          ))}
        </div>
        {/* 2 */}
        <div className='p-4 rounded-xl flex flex-col gap-2 justify-center'>
          <div onClick={handleConfirmOrder} className="flex gap-2 cursor-pointer justify-center items-center text-xl px-4 font-semibold bg-pink-100 hover:bg-pink-200 p-2 border border-green-900 rounded transition-all ease-in-out">
            <h1 className="font-semibold text-xl">Confirm Order</h1>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </div>
          </div>
        </div>
        {/* 3 */}
      </main>
      <Footer />
    </div>
  );
};

export default Pos;
