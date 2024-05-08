import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Footer from "renderer/components/Footer";
import Header from "renderer/components/Header";

const AmountSelection = (data) => {

  const { state } = useLocation();

  let defaultClasses = "bg-zinc-50 p-3 rounded-lg border flex justify-center items-center gap-x-2 font-thin my-2 transition-all ease-in-out duration-200 cursor-default";
  let defaultOptionsClasses = "bg-zinc-50 p-3 rounded-lg border flex justify-center items-center gap-x-2 transition-all ease-in-out duration-200";

  let [amount, setAmount] = useState(0);
  let [inputValue, setInputValue] = useState("");
  let [customClasses, setCustomClasses] = useState(defaultClasses);

  let [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      console.log(state);
    }, 1000);
  }, [])

  return (
    <div className="font-light p-6 flex flex-col justify-between min-h-screen gap-y-4">
      <Header />
      <main className="p-4 flex justify-center items-center">
        <div className="flex gap-x-8 justify-center items-center">
          <div className="p-8 rounded-xl">
            <div>
              <div className="flex flex-col">
                <div className="flex items-center gap-4 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className="w-32 h-32 py-2 bg-gray-100 rounded-2xl">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  <div className="">
                    <h1 className="font-semibold text-xl">USER NAME<span className="font-light"> / SN63</span></h1>
                    <h2>Role: <span className="font-semibold">Student</span></h2>
                    <h2>Card ID: <span className="font-semibold">123456789</span></h2>
                    <h2>Balance: <span className="font-semibold">500.00 <span className="text-lg">DH</span></span></h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* --------------- */}
          <div className="p-8 rounded-xl">
            <h1 className="text-xl font-semibold">Preset Options</h1>
            <div className="flex flex-col gap-y-4 mt-4">
              <div className="flex justify-between p-6 items-center gap-y-4 gap-4 border bg-zinc-50 rounded-lg overflow-hidden">
                <input
                  onChange={(e) => {
                    var intValue = 0;
                    setInputValue(e.target.value);
                    if (e.target.value > 0) {
                      setCustomClasses("bg-zinc-50 p-3 rounded-lg border flex justify-center items-center gap-x-2 font-thin my-2 transition-all ease-in-out duration-200 bg-pink-500 text-white font-bold");
                    } else {
                      setCustomClasses(defaultClasses);
                    }
                  }}
                  value={inputValue}
                  placeholder="Custom Amount (103 DH)"
                  className="flex w-full justify-center items-center gap-x-2 focus:outline-none bg-transparent"
                  type="number"
                  min={0}
                />
              </div>
              <button onClick={(e) => {
                setSelectedOption(1);
              }} className={defaultOptionsClasses}>
                <div className="font-thin">
                  Enough for <span className="font-normal">5 meals</span>
                </div>
                <div className="font-medium bg-zinc-100 border p-2 rounded-lg">
                  225.00 <span className="font-normal">DH</span>{" "}
                </div>
              </button>
              <button onClick={(e) => {
                setSelectedOption(2);
              }} className={defaultOptionsClasses}>
                <div className="font-thin">
                  <span className="font-normal">1-week</span> allowance
                </div>
                <div className="font-medium bg-zinc-100 border p-2 rounded-lg">
                  675.00 <span className="font-normal">DH</span>{" "}
                </div>
              </button>
              <button onClick={(e) => {
                setSelectedOption(3);
              }} className={defaultOptionsClasses}>
                <div className="font-thin">
                  <span className="font-normal">1 month</span> allowance
                </div>
                <div className="font-medium bg-zinc-100 border p-2 rounded-lg">
                  2700.00 <span className="font-normal">DH</span>{" "}
                </div>
              </button>
              <button className={customClasses}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AmountSelection;
