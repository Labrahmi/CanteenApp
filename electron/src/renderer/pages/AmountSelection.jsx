import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Footer from "renderer/components/Footer";
import Header from "renderer/components/Header";

const AmountSelection = (data) => {

  const navigate = useNavigate();

  let [user, setUser] = useState({
    _id: "0",
    name: "null",
    username: "null",
    password: "null",
    cardId: "null",
    balance: "null",
    role: "null"
  });

  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const choice_1_ref = useRef(null);
  const choice_2_ref = useRef(null);
  const choice_3_ref = useRef(null);
  const submitButtonRef = useRef(null);
  const amountInputRef = useRef(null);

  const choices_ref = [choice_1_ref, choice_2_ref, choice_3_ref];

  let defaultClasses = "bg-zinc-50 p-3 rounded-lg border flex justify-center items-center gap-x-2 font-thin my-2 transition-all ease-in-out duration-200 cursor-default";
  let defaultOptionsClasses = "bg-zinc-50 p-3 rounded-lg border flex justify-center items-center gap-x-2 transition-all ease-in-out duration-200";

  //
  let [amount, setAmount] = useState(0);
  let [inputValue, setInputValue] = useState("");
  let [customClasses, setCustomClasses] = useState(defaultClasses);
  let [selectedOption, setSelectedOption] = useState(null);
  //

  const username = params.get('username');

  useEffect(() => {
    //
    async function fetchUser() {
      let response = await fetch(`http://127.0.0.1:3000/api/users/${username}`);
      let user = await response.json();
      setUser(user);
    }
    fetchUser();
    //
  }, []);

  //
  const styleChanger = (c) => {

    if (c == 1) {
      setAmount(150);
    }
    //
    if (c == 2) {
      setAmount(300);
    }
    //
    if (c == 3) {
      setAmount(1200);
    }

    choice_1_ref.current.classList.remove('invert');
    choice_2_ref.current.classList.remove('invert');
    choice_3_ref.current.classList.remove('invert');
    choices_ref[c - 1].current.classList.add('invert');
    submitButtonRef.current.classList.add('invert', 'font-semibold');
  }

  const appendError = (error) => {
    const errorElement = document.createElement('p');
    errorElement.classList.add('bg-red-500', 'text-lg', 'text-white', 'text-lg', 'p-3', 'px-5', 'rounded-lg', 'font-light', 'text-center', 'cursor-default', 'fixed', 'bottom-4', 'right-4');
    errorElement.innerText = error + ' ' + '👮‍♂️';
    window.document.body.appendChild(errorElement);
    setTimeout(() => {
      errorElement.remove();
    }, 4000);
  }

  const addBalanceToCard = async () => {
    let status = await fetch(`http://127.0.0.1:3000/api/users/${username}/addBalance?amount=${amount}`, {
      method: "POST"
    });
    if (status.status == 200) {
      navigate("./success");
    } else {
      console.log(status);
      appendError("an error occurred");
    }
  }

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
                    <h1 className="font-semibold text-xl">{user.name}</h1>
                    <h2>Role: <span className="font-semibold">{user.role}</span></h2>
                    <h2>Card ID: <span className="font-semibold">{user.cardId}</span></h2>
                    <h2>Balance: <span className="font-semibold">{user.balance} <span className="text-lg">DH</span></span></h2>
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
                  ref={amountInputRef}
                  onChange={(e) => {
                    choices_ref.forEach(element => {
                      element.current.classList.remove('invert');
                    });
                    setInputValue(amountInputRef.current.value);
                    setAmount(amountInputRef.current.value);
                    if (amountInputRef.current.value > 0) {
                      submitButtonRef.current.classList.add('invert', 'font-semibold', 'cursor-pointer');
                    } else {
                      submitButtonRef.current.classList.remove('invert', 'font-semibold', 'cursor-pointer');
                    }
                  }}
                  value={inputValue}
                  placeholder="Custom Amount (103 DH)"
                  className="flex w-full justify-center items-center gap-x-2 focus:outline-none bg-transparent"
                  type="number"
                  min={0}
                />
              </div>
              <button ref={choice_1_ref} onClick={(e) => {
                setSelectedOption(1);
                styleChanger(1);
              }} className={defaultOptionsClasses}>
                <div className="font-thin">
                  Enough for <span className="font-normal">5 meals</span>
                </div>
                <div className="font-medium bg-zinc-100 border p-2 rounded-lg">
                  150.00 <span className="font-normal">DH</span>{" "}
                </div>
              </button>
              <button ref={choice_2_ref} onClick={(e) => {
                setSelectedOption(2);
                styleChanger(2);
              }} className={defaultOptionsClasses}>
                <div className="font-thin">
                  <span className="font-normal">1-week</span> allowance
                </div>
                <div className="font-medium bg-zinc-100 border p-2 rounded-lg">
                  300.00 <span className="font-normal">DH</span>{" "}
                </div>
              </button>
              <button ref={choice_3_ref} onClick={(e) => {
                setSelectedOption(3);
                styleChanger(3);
              }} className={defaultOptionsClasses}>
                <div className="font-thin">
                  <span className="font-normal">1 month</span> allowance
                </div>
                <div className="font-medium bg-zinc-100 border p-2 rounded-lg">
                  1200.00 <span className="font-normal">DH</span>{" "}
                </div>
              </button>
              <div className='w-full flex gap-2'>
                <button onClick={(e) => {
                  choices_ref.forEach(element => {
                    element.current.classList.remove("invert");
                    setInputValue("");
                    submitButtonRef.current.classList.remove('invert', 'font-semibold', 'cursor-pointer');
                    setAmount(0);
                  });
                }} className={"bg-zinc-50 p-3 rounded-lg border flex justify-center items-center gap-x-2 font-thin my-2 transition-all ease-in-out duration-200"}>clear</button>
                <button onClick={(e) => {
                  if (amount != 0) {
                    let message = "Are you sure you want to add " + amount + " DH to the card?";
                    if (confirm(message)) {
                      e.currentTarget.classList.add('animate-pulse', 'cursor-default');
                      e.currentTarget.disabled = true;
                      addBalanceToCard();
                    }
                  }
                }} ref={submitButtonRef} className={"bg-zinc-50 p-3 rounded-lg border flex justify-center items-center gap-x-2 my-2 transition-all ease-in-out duration-200 w-full"}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AmountSelection;
