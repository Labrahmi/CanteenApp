import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Footer from 'renderer/components/Footer';
import Header from 'renderer/components/Header';


const History = () => {

  const [searchedUsers, setSearchedUsers] = useState([]);
  const [userFullnameValue, setUserFullnameValue] = useState('');
  const [userCardIdValue, setUserCardIdValue] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [value, setValue] = useState('1');
  /// ----------------<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const [newUserToAdd, setNewUserToAdd] = useState({
    name: '',
    username: '',
    password: '',
    cardId: '',
    role: 'student',
  });
  /// ----------------<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const [insights, setInsights] = useState([
    { title: 'Total Top-ups', amount: 39275.00, },
    { title: 'Total Purchases', amount: 2736.00, },
    { title: 'Active Users', amount: 172, },
  ]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fullNameRef = useRef();
  const cardIdRef = useRef();

  const inputRef = [useRef(), useRef(), useRef(), useRef(), useRef()];

  const getUser = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/users/id/${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardIdChange = async (e) => {
    setUserCardIdValue(e.target.value);
    fullNameRef.current.value = '';
    setUserFullnameValue('');
    if (e.target.value !== '') {
      try {
        const response = await fetch(`http://127.0.0.1:3000/api/users/search?query=${e.target.value}`);
        const data = await response.json();
        setSearchedUsers(data);
      } catch (error) {
        console.error(error);
        setSearchedUsers([]);
      }
    } else {
      setSearchedUsers([]);
    }
  };

  const handleFullNameChange = async (e) => {
    setUserFullnameValue(e.target.value);
    cardIdRef.current.value = '';
    setUserCardIdValue('');
    if (e.target.value !== '') {
      try {
        const response = await fetch(`http://127.0.0.1:3000/api/users/search?query=${e.target.value}`);
        const data = await response.json();
        setSearchedUsers(data);
      } catch (error) {
        console.error(error);
        setSearchedUsers([]);
      }
    } else {
      setSearchedUsers([]);
    }
  }

  useEffect(() => {


    document.body.addEventListener('click', () => {
      // cardIdRef.current.focus();
    });

    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/transactions');
        const data = await response.json();
        setTransactions(data);
        var totalTopUps = 0;
        var totalPurchases = 0;
        var uniqueUsers = [];
        data.forEach(element => {
          if (element.transaction.transactionType === 'top-up') {
            totalTopUps += element.transaction.amount;
          } else {
            totalPurchases += element.transaction.amount;
          }
          if (!uniqueUsers.includes(element.user._id)) {
            uniqueUsers.push(element.user._id);
          }
        });
        setInsights([
          { title: 'Total Top-ups', amount: totalTopUps, },
          { title: 'Total Purchases', amount: totalPurchases, },
          { title: 'Active Users', amount: uniqueUsers.length, },
        ]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransactions();
  }, []);

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

  const handleAddUser = async (e) => {
    e.preventDefault();
    setTimeout(async () => {
      // ----------------------------------------------------
      if (confirm('Are you sure you want to add this user?')) {
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const username = formData.get('username');
        const password = formData.get('password');
        const cardId = formData.get('cardId');
        const role = formData.get('role');
        const endpoint = 'http://127.0.0.1:3000/api/auth/register';
        // ----------------------------------------------------
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            username,
            password,
            cardId,
            role,
            balance: 0,
          }),
        });
        // ----------------------------------------------------
        const data = await response.json();
        if (data.token) {
          appendMessage('User added successfully', 'success');
          for (let i = 0; i < inputRef.length; i++) {
            inputRef[i].current.value = '';
          }
          inputRef[3].current.value = 'student';
          inputRef[0].current.focus();
        } else {
          const error = data.error;
          appendMessage(error, 'error');
        }
      }
    }, 300);
  };


  return (
    <div className="font-light p-6 flex flex-col justify-between min-h-screen gap-2 bg-white">
      <Header />
      <main className='h-[80vh] w-full overflow-scroll self-start justify-self-start p-4 rounded-xl'>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList className='' onChange={handleChange} aria-label="transactions API tabs example">
                <Tab label="All Transactions" value="1" />
                <Tab label="Transactions by User" value="2" />
                <Tab label="Manage Users" value="3" />
              </TabList>
            </Box>
            {/* --------------------------- */}
            <TabPanel className='px-[0!important]' value="1">
              <div className='my-8 space-y-4'>
                <h1 className='text-2xl font-thin select-none'>⌘ Last Month Transactions</h1>
                <div className='grid grid-cols-3 gap-8'>
                  <div className='group text-cyan-50 bg-gradient-to-tr from-cyan-600 to-cyan-100 border border-cyan-400 shadow-zinc-200 shadow-2xl p-8 rounded-xl flex justify-between items-end cursor-pointer hover:brightness-95 transition-all duration-200 ease-in-out'>
                    <div className='space-y-2'>
                      <h1 className='font-thin text-lg'>Total Top-ups</h1>
                      <h1 className='text-4xl font-semibold'>{insights[0].amount}.00dh</h1>
                    </div>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 group-hover:scale-105 transition-all duration-200 ease-in-out">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                  </div>
                  <div className='group text-rose-50 bg-gradient-to-tr from-rose-600 to-rose-100 border border-rose-400 shadow-zinc-200 shadow-2xl p-8 rounded-xl flex justify-between items-end cursor-pointer hover:brightness-95 transition-all duration-200 ease-in-out'>
                    <div className='space-y-2'>
                      <h1 className='font-thin text-lg'>Total Purchases</h1>
                      <h1 className='text-4xl font-semibold'>{insights[1].amount}.00dh</h1>
                    </div>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 group-hover:scale-105 transition-all duration-200 ease-in-out">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                      </svg>
                    </div>
                  </div>
                  <div className='group text-slate-50 bg-gradient-to-tr from-slate-600 to-slate-100 border border-slate-400 shadow-zinc-200 shadow-2xl p-8 rounded-xl flex justify-between items-end cursor-pointer hover:brightness-95 transition-all duration-200 ease-in-out'>
                    <div className='space-y-2'>
                      <h1 className='font-thin text-lg'>Active Users</h1>
                      <h1 className='text-4xl font-semibold'>{insights[2].amount}</h1>
                    </div>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 group-hover:scale-105 transition-all duration-200 ease-in-out">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex py-4'></div>
              <div className='flex flex-col gap-2'>
                {transactions.map((transaction, index) => {
                  let color = "";
                  let rotate = "";
                  let textColor = "text-zinc-900";
                  let hoverColor = "hover:saturate-125";
                  //
                  if (transaction.transaction.transactionType === 'top-up') {
                    color = 'bg-blue-50';
                    rotate = 'rotate-0';
                  } else if (transaction.transaction.transactionType === 'purchase') {
                    color = 'bg-red-50';
                    rotate = 'rotate-180';
                  } else {
                    color = 'bg-yellow-50';
                    rotate = 'rotate-90';
                  }
                  //
                  let dateFormatted = new Date(transaction.transaction.createdAt);
                  dateFormatted = `${dateFormatted.getDate()}/${dateFormatted.getMonth()}/${dateFormatted.getFullYear()} ${dateFormatted.getHours()}:${dateFormatted.getMinutes()}`;
                  //
                  var itemsString = '';
                  transaction.transaction.items.forEach((item, index) => {
                    itemsString += `${item.name} `;
                    if (index < transaction.transaction.items.length - 1) {
                      itemsString += ', ';
                    }
                  });
                  return (
                    <li key={index} className={`${color} p-4 ${textColor} rounded-xl font-thin list-none cursor-default transition-all ease-in-out duration-300 flex items-center justify-between border ${hoverColor}`}>
                      <div className='flex items-center divide-x'>
                        <h1 className='px-4 w-[12rem] overflow-hidden'>{transaction.user.name}</h1>
                        <h1 className='px-4 w-[8rem] overflow-hidden'>{transaction.transaction.amount}.00dh</h1>
                        <h1 className='px-4 w-[10rem] overflow-hidden'>{dateFormatted}</h1>
                        <h1 className='px-4 overflow-hidden text-zinc-700'>{itemsString}</h1>
                      </div>
                      <div className='flex justify-center gap-2'>
                        <h1 className='font-thin'> {transaction.transaction.transactionType} </h1>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 ${rotate}`}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                        </svg>
                      </div>
                    </li>
                  )
                })}
              </div>
            </TabPanel>
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <TabPanel className='px-[0!important]' value="2">
              <div className='my-8 space-y-4'>
                <h1 className='text-2xl font-thin select-none'>⌘ Search For A User</h1>
              </div>
              <div className='flex py-4'></div>
              <div className='flex flex-col items-center'>
                <div className='flex flex-col gap-2 w-full'>
                  <div className='border rounded-xl w-full overflow-hidden flex justify-center items-center'>
                    <input maxLength={10} onChange={handleCardIdChange} value={userCardIdValue} ref={cardIdRef} className='p-3 px-4 outline-none w-full' placeholder='Card ID' type="text" />
                    <div onClick={() => { cardIdRef.current.value = ''; setUserCardIdValue(''); setSearchedUsers([]) }} className='px-2 rounded-full cursor-pointer'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-zinc-400 hover:text-zinc-700 transition-all duration-200 ease-in-out">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                  <div className='border rounded-xl w-full overflow-hidden flex justify-center items-center'>
                    <input onChange={handleFullNameChange} value={userFullnameValue} ref={fullNameRef} className='p-3 px-4 outline-none w-full' placeholder='Full Name' type="text" />
                    <div onClick={() => { fullNameRef.current.value = ''; setUserFullnameValue(''); setSearchedUsers([]) }} className='px-2 rounded-full cursor-pointer'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-zinc-400 hover:text-zinc-700 transition-all duration-200 ease-in-out">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                  <div className='flex py-2'></div>
                  {/* */}
                  {Array.isArray(searchedUsers) && searchedUsers.map((user, index) => {
                    return (
                      <div key={index}>
                        <div className='border rounded-xl hover:bg-rose-50 cursor-pointer outline-none w-full transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap font-normal select-none'>
                          <Accordion className=''>
                            <AccordionSummary
                              expandIcon={<ArrowDownwardIcon />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Typography>
                                <h1 className='font-semibold'>
                                  {user.user.name}
                                </h1>
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className='w-full'>
                                <div className='text-green-800 bg-gradient-to-tr from-green-50 to-white border p-4 rounded-xl flex gap-2 justify-between items-center cursor-pointer hover:brightness-[0.99] transition-all duration-200'>
                                  <div className='text-green-800 bg-white border p-4 rounded-xl flex gap-2 justify-between items-center cursor-pointer transition-all duration-200'>
                                    <h1 className=''>Balance</h1>
                                    <h2 className='font-semibold text-xl'>{user.user.balance}.00dh</h2>
                                  </div>
                                  <div className='text-right text-sm'>
                                    <h1 className=''>{user.user.role}</h1>
                                    <h1 className=''>{user.user.cardId}</h1>
                                    <h1 className=''>{user.user.subscriptionPlan.description}</h1>
                                  </div>
                                </div>
                                <div className='flex py-2'></div>
                                <h2 className='text-zinc-500 font-thin m-1'>⌘ History</h2>
                                <div className='flex flex-col gap-2'>
                                  {Array.isArray(user.transactions) && user.transactions.map((transaction, index) => {
                                    const createdAt = new Date(transaction.createdAt);
                                    const createdAtString = `${createdAt.getDate()}/${createdAt.getMonth()}/${createdAt.getFullYear()} ${createdAt.getHours()}:${createdAt.getMinutes()}`
                                    var rotate;
                                    var color;
                                    if (transaction.transactionType === 'top-up') {
                                      rotate = 'rotate-0';
                                      color = 'bg-blue-50';
                                    }
                                    if (transaction.transactionType === 'purchase') {
                                      rotate = 'rotate-180';
                                      color = 'bg-red-50';
                                    }
                                    if (transaction.transactionType === 'subscription') {
                                      rotate = 'rotate-90';
                                      color = 'bg-yellow-50';
                                    }
                                    var itemsString = '';
                                    transaction.items.forEach((item, index) => {
                                      itemsString += `${item.name} `;
                                      if (index < transaction.items.length - 1) {
                                        itemsString += ', ';
                                      }
                                    });
                                    return (
                                      <li key={index} className={`p-4 ${color} text-sm rounded-xl font-thin list-none cursor-default transition-all ease-in-out duration-300 flex items-center justify-between border`}>
                                        <div className='flex'>
                                          <h1 className='overflow-hidden'> {transaction.amount}.00dh</h1>
                                          <h1 className='overflow-hidden px-4'>{createdAtString}</h1>
                                          <h1 className='overflow-hidden px-4'>{itemsString}</h1>
                                        </div>
                                        <div className='flex justify-center items-center gap-2'>
                                          <h1 className='font-thin text-xs'> {transaction.transactionType} </h1>
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 text-zinc-500 scale-75 ${rotate}`}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                          </svg>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </div>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </div>
                    )
                  })}
                  {/*  */}
                </div>
              </div>
            </TabPanel>
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <TabPanel className='px-[0!important]' value="3">
              <div className='my-8 space-y-4'>
                <h1 className='text-2xl font-thin select-none'>⌘ Add a new user</h1>
              </div>
              <div className='flex py-4'></div>
              <div className='max-w-lg m-auto'>
                {/* handleAddUser */}
                <form onSubmit={(e) => handleAddUser(e)} className='flex flex-col justify-center items-center gap-2' action="http://127.0.0.1:3000/api/auth/register" method="post">
                  <div className='border rounded-xl w-full overflow-hidden flex justify-center items-center'>
                    <input ref={inputRef[0]} required minLength={4} maxLength={16} name='name' className='p-3 px-4 outline-none w-full' type="text" placeholder='Full Name' />
                  </div>
                  <div className='border rounded-xl w-full overflow-hidden flex justify-center items-center'>
                    <input ref={inputRef[1]} required minLength={4} maxLength={16} name='username' className='p-3 px-4 outline-none w-full' type="text" placeholder='Username' />
                  </div>
                  <div className='border rounded-xl w-full overflow-hidden flex justify-center items-center'>
                    <input ref={inputRef[2]} required minLength={4} maxLength={16} name='password' className='p-3 px-4 outline-none w-full' type="text" placeholder='Password' />
                  </div>
                  <div className='border rounded-xl w-full overflow-hidden flex justify-center items-center pr-3'>
                    <select ref={inputRef[3]} name='role' defaultValue={"student"} className='p-3 px-2 outline-none w-full cursor-pointer'>
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Admin</option>
                      <option value="staff">Staff</option>
                      <option value="parent">Parent</option>
                    </select>
                  </div>
                  <div className='border rounded-xl w-full overflow-hidden flex justify-center items-center'>
                    <input ref={inputRef[4]} required minLength={10} maxLength={10} name='cardId' className='p-3 px-4 outline-none w-full' type="text" placeholder='Card ID' />
                  </div>
                  <div className='border rounded-xl w-fit overflow-hidden flex justify-center items-center self-end bg-zinc-100 hover:bg-zinc-200 transition-all duration-200 ease-in-out'>
                    <input  className='p-3 px-4 outline-none w-fit cursor-pointer' type="submit" />
                  </div>
                </form>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </main>
      <Footer />
    </div >
  );
};

export default History;
