import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import Footer from 'renderer/components/Footer';
import Header from 'renderer/components/Header';

const cardPlacementSuccess = () => {

  let navigate = useNavigate();

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
  const cardID = params.get('cardID');

  if (cardID === null) {
    navigate('/home');
  }

  // router.get('/username/:username', cacheNoStore, /* authMiddleware, */ controller.listUserByUsername);
  // router.get('/cardId/:cardId', cacheNoStore, /* authMiddleware, */ controller.listUserByCardId);

  useEffect(() => {
    async function fetchUser() {
      let response = await fetch('http://127.0.0.1:3000/api/users/cardId/' + cardID);
      let user = await response.json();
      console.log(user);
      setUser(user);
      if (user.error) {
        console.log('Error:', user.error);
        navigate('/home');
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="font-light p-6 flex flex-col justify-between min-h-screen gap-y-4">
      <Header />
      <main className="p-4 flex flex-col justify-center items-center gap-4">
        <div className="flex gap-4 justify-center items-center">
          <div className="select-none">
            <h1 className="font-semibold text-3xl">Card Placement</h1>
            <div className="flex py-2"></div>
            <h2>
              <span className="font-thin text-zinc-500">Card placed successfully</span>
            </h2>
          </div>
          <div className="flex px-2"></div>
          <div className="flex flex-col gap-4 min-w-[28rem] px-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-4 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="w-32 h-32 py-2 bg-gray-100 rounded-2xl">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <div className="">
                  <h1 className="font-semibold text-xl">{user.name} <span className="font-light uppercase"> / {user._id.substring(0, 4)}</span></h1>
                  <h2>Role: <span className="font-semibold">{user.role}</span></h2>
                  <h2>Card ID: <span className="font-semibold">{user.cardId}</span></h2>
                </div>
              </div>
              <div className="rounded-xl p-4 px-8 w-fit text-xl">
                balance: <span className="font-semibold">{user.balance} <span className="text-lg">DH</span></span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to={"/home"} className="flex gap-2 justify-center items-center text-xl px-4 font-semibold bg-zinc-100 hover:bg-zinc-200 p-2 border border-zinc-900 rounded">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
              </svg>
            </div>
          </Link>
          <Link to={`./amount-selection?username=${user.username}`} className="flex gap-2 hover:gap-3 justify-center items-center text-xl px-4 font-semibold bg-pink-100 hover:bg-pink-200 p-2 border border-green-900 rounded transition-all ease-in-out">
            <h1 className="font-semibold text-xl">Proceed to Amount Selection</h1>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </div>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default cardPlacementSuccess;
