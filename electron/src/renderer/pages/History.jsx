import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Footer from 'renderer/components/Footer';
import Header from 'renderer/components/Header';


const History = () => {

  const [transactions, setTransactions] = useState([]);
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const getUser = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/users/id/${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/transactions');
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransactions();
  }, []);


  return (
    <div className="font-light p-6 flex flex-col justify-between min-h-screen gap-y-4 bg-white">
      <Header />
      <main className='h-[80vh] w-full overflow-scroll self-start justify-self-start p-4 rounded-xl'>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList className='' onChange={handleChange} aria-label="transactions API tabs example">
                <Tab label="All Transactions" value="1" />
                <Tab label="Transactions by User" value="2" />
                <Tab label="Transactions by Class" value="3" />
              </TabList>
            </Box>
            {/* --------------------------- */}
            <TabPanel className='px-[0!important]' value="1">
              <div className='flex flex-col gap-1'>
                {transactions.map((transaction, index) => {
                  let color = transaction.transaction.transactionType === 'top-up' ? 'bg-blue-50' : 'bg-red-50';
                  let textColor = 'text-zinc-900';
                  let hoverColor = transaction.transaction.transactionType === 'top-up' ? 'hover:bg-blue-200' : 'hover:bg-red-200';
                  let rotate = transaction.transaction.transactionType === 'top-up' ? 'rotate-0' : 'rotate-180';
                  let dateFormatted = new Date(transaction.transaction.createdAt).toUTCString();
                  return (
                    <li key={index} className={`${color} p-4 ${textColor} rounded list-none cursor-pointer transition-all ease-in-out duration-300 flex items-center justify-between border ${hoverColor}`}>
                      <div className='flex divide-x'>
                        <h1 className='px-4 font-semibold'>{ transaction.user.name }</h1>
                        <h1 className='px-4'>Amount: {transaction.transaction.amount}</h1>
                        <h1 className='px-4'>Date: {dateFormatted}</h1>
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
            <TabPanel className='px-[0!important]' value="2">
              Item Two
            </TabPanel>
            <TabPanel className='px-[0!important]' value="3">
              Item Three
            </TabPanel>
          </TabContext>
        </Box>
      </main>
      <Footer />
    </div>
  );
};

export default History;
