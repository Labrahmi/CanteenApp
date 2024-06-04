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
import main_dish from '../../../assets/main_dish.png'
const error_sound = '../../../assets/error_sound.mp3'
const success_sound = '../../../assets/success.mp3'
import { app } from 'electron';

const Pos = () => {
  const navigate = useNavigate();
  const dishesParent = useRef(null);
  const userField_1 = useRef(null);
  const userField_2 = useRef(null);
  const userField_3 = useRef(null);
  const userField_4 = useRef(null);
  const userField_4_id = useRef(null);

  const mainDishElement = useRef(null);
  const [isMainDishSelected, setIsMainDishSelected] = useState(false); // -----------------<<<<<<<<<<<<<<<<

  const [clientCardID, setClientCardID] = useState('');
  const [selectedDish, setSelectedDish] = useState([]);
  const [user, setUser] = useState({
    name: "",
    role: "",
    balance: "",
    username: "",
    subscriptionPlan: {
      planName: '',
      price: 0,
      description: '',
      status: '',
      startDate: '',
      endDate: ''
    }
  });

  const dishList = [
    {
      name: 'Hotdog',
      price: 3.00,
      image: dish_1
    },
    {
      name: 'Cupcake',
      price: 5.00,
      image: dish_2
    },
    {
      name: 'Donuts',
      price: 7.00,
      image: dish_3
    },
    {
      name: 'Pizza',
      price: 10.00,
      image: dish_4
    },
    {
      name: 'Scrambled Eggs',
      price: 15.00,
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
  async function fetchUser(cardID) {
    let response = await fetch('http://10.12.6.8:3000/api/users/cardID/' + cardID);
    let user = await response.json();
    if (user.error) {
      appendMessage(user.error, 'error');
      return;
    }
    setUser(user);
    userField_1.current.classList.remove('animate-pulse');
    userField_2.current.classList.remove('animate-pulse');
    userField_3.current.classList.remove('animate-pulse');
    userField_4.current.classList.remove('animate-pulse');
  }
  //  ----------------------------------------------------------------------------------------------------------
  // |
  // |
  // |
  //  ----------------------------------------------------------------------------------------------------------
  const appendMessage = (messge, status) => {
    const messageColor = status === 'error' ? 'bg-red-500' : 'bg-green-500';
    const errorElement = document.createElement('p');
    errorElement.classList.add(`${messageColor}`, 'text-lg', 'text-white', 'text-lg', 'p-3', 'px-5', 'rounded-xl', 'font-light', 'text-center', 'cursor-default', 'fixed', 'bottom-4', 'right-4');
    errorElement.innerText = messge + ' ' + '👮‍♂️';
    window.document.body.appendChild(errorElement);
    setTimeout(() => {
      errorElement.remove();
    }, 7000);
  }
  //  ----------------------------------------------------------------------------------------------------------
  // |
  // |
  // |
  const rest_all_the_data = () => {
    setSelectedDish([]);
    setUser({
      name: "",
      role: "",
      balance: "",
      username: "",
      subscriptionPlan: {
        planName: '',
        price: 0,
        description: '',
        status: '',
        startDate: '',
        endDate: ''
      }
    });
    setClientCardID('');
    userField_1.current.classList.add('animate-pulse');
    userField_2.current.classList.add('animate-pulse');
    userField_3.current.classList.add('animate-pulse');
    userField_4.current.classList.add('animate-pulse');
    dishesParent.current.childNodes.forEach((child) => {
      child.classList.remove('bg-pink-800', 'text-white');
    });
    setIsMainDishSelected(false);
    mainDishElement.current.classList.remove('bg-pink-800', 'text-white');
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
    // ------------------------[ new stuff ]-----------------------------
    if (selectedDish.length == 0 && !isMainDishSelected) {
      alert('Please select a dish!');
      return;
    }
    var transactionType = "purchase";
    var selectedItems = [];
    var totalAmount = 0;
    var message = "";
    if (selectedDish.length > 0) {
      selectedDish.forEach((index) => {
        totalAmount += dishList[index].price;
        selectedItems.push(dishList[index]);
      });
      message = `Are you sure you want to purchase ${selectedDish.length} dish(es) for ${totalAmount} Dh?`;
    } else if (isMainDishSelected) {
      totalAmount = 60;
      message = `Are you sure you want to purchase the main dish?`;
      transactionType = "subscription";
    }
    // ------------------------[ new stuff ]-----------------------------
    if (confirm(message)) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      //
      var urlencoded = new URLSearchParams();
      urlencoded.append("username", `${user.username}`);
      urlencoded.append("amount", totalAmount);
      urlencoded.append("transactionType", transactionType);
      urlencoded.append("items", JSON.stringify(selectedItems));
      //
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };
      //
      try {
        let resp = await fetch("http://10.12.6.8:3000/api/transactions", requestOptions);
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
  //  ----------------------------------------------------------------------------------------------------------
  // |
  // |
  // |
  //  ----------------------------------------------------------------------------------------------------------
  const handleDishClick = (index, e) => {
    if (selectedDish.includes(index)) {
      setSelectedDish(selectedDish.filter((item) => item !== index));
      e.currentTarget.classList.remove('bg-pink-800', 'text-white');
      return;
    }
    setSelectedDish([...selectedDish, index]);
    e.currentTarget.classList.add('bg-pink-800', 'text-white');
    setIsMainDishSelected(false);
    mainDishElement.current.classList.remove('bg-pink-800', 'text-white');
  };
  //  ----------------------------------------------------------------------------------------------------------
  // |
  // |
  // |
  //  ----------------------------------------------------------------------------------------------------------
  const handleMainDishClick = (e) => {
    if (isMainDishSelected) {
      setIsMainDishSelected(false);
      mainDishElement.current.classList.remove('bg-pink-800', 'text-white');
      return;
    }
    setIsMainDishSelected(true);
    mainDishElement.current.classList.add('bg-pink-800', 'text-white');
    dishesParent.current.childNodes.forEach((child) => {
      child.classList.remove('bg-pink-800', 'text-white');
    });
    setSelectedDish([]);
  };
  //  ----------------------------------------------------------------------------------------------------------
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && clientCardID.length != 10) {
        rest_all_the_data();
        return;
      }
      if (e.key === 'Enter' && clientCardID.length === 10) {
        fetchUser(clientCardID);
        setClientCardID('');
        return;
      }
      if (Number(e.key) >= 0 && Number(e.key) <= 9) {
        let cardID = String(clientCardID) + String(e.key);
        setClientCardID(cardID);
      }
    };
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [clientCardID]);

  const itemClasses = 'flex border bg-white shadow-2xl shadow-zinc-100 gap-1 justify-start p-2 items-center rounded-xl w-64 transition-all duration-200 ease-in-out cursor-pointer select-none';

  return (
    <div className="font-light p-6 flex flex-col justify-between min-h-screen gap-y-4">
      <Header />
      <main className='flex justify-between items-center gap-4'>
        {/* 0 */}
        <div className='p-4 rounded-xl flex flex-col gap-2 justify-center'>
          <h1 className='font-semibold'>User Informations</h1>
          <input disabled ref={userField_1} value={user.name} placeholder='Name' type="text" className='p-2 bg-zinc-50 rounded-xl text-sm font-light animate-pulse border' />
          <input disabled ref={userField_2} value={user.role} placeholder='Role' type="text" className='p-2 bg-zinc-50 rounded-xl text-sm font-light animate-pulse border' />
          <input disabled ref={userField_3} value={user.balance} placeholder='Balance' type="text" className='p-2 bg-zinc-50 rounded-xl text-sm font-light animate-pulse border' />
          <input disabled ref={userField_4} value={user.subscriptionPlan.description} placeholder='subscription Plan' type="text" className='p-2 bg-zinc-50 rounded-xl text-sm font-light animate-pulse border' />
          <button onClick={rest_all_the_data} className='text-zinc-600 my-2 text-sm' >Clear</button>
        </div>
        {/* 1 */}
        <div className='flex gap-4'>
          <div onClick={handleMainDishClick} ref={mainDishElement} className='p-8 gap-2 rounded-xl bg-white select-none border shadow-2xl shadow-zinc-100 w-64 flex flex-col justify-center items-center cursor-pointer transition-all duration-300 ease-in-out'>
            <h1 className='font-medium text-2xl'>Main Lunch</h1>
            <img className='w-36' src={main_dish} alt="main dishe" />
          </div>
          <div className='py-4 flex justify-center items-center text-zinc-700 cursor-default'>or</div>
          <div ref={dishesParent} className='grid grid-cols-2 flex-col gap-4'>
            {dishList.map((dish, index) => (
              <div onClick={(e) => {
                handleDishClick(index, e);
              }} key={index} className={itemClasses}>
                <img className='w-20' src={dish.image} alt={dish.name} />
                <div>
                  <h1 className=''>{dish.name}</h1>
                  <h2 className='text-sm font-thin'>{dish.price} Dh</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 2 */}
        <div className='p-4 rounded-xl flex flex-col gap-2 justify-center'>
          <div onClick={handleConfirmOrder} className="flex gap-2 cursor-pointer justify-center items-center text-xl px-4 font-semibold bg-pink-100 hover:bg-pink-200 p-2 border border-green-900 rounded-xl transition-all ease-in-out">
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
