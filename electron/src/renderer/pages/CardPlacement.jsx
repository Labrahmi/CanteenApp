import { Link } from 'react-router-dom';
import Footer from 'renderer/components/Footer';
import Header from 'renderer/components/Header';

const CardPlacement = () => {
  return (
    <div className="font-light p-6 flex flex-col justify-between min-h-screen gap-y-4">
      <Header />
        <main className="p-4 flex justify-center items-center">
          <div className="select-none">
              <h1 className="font-semibold text-3xl">Card Placement</h1>
              <div className="flex py-2"></div>
              <h2><span className="font-thin animate-pulse">Please place your card on the <Link to="./success">reader</Link></span></h2>
              <div className="flex justify-start items-center gap-2 my-4">
                  <Link to="/" className="flex gap-2 justify-center items-center text-xl px-4 font-semibold bg-zinc-100 hover:bg-zinc-200 p-2 border border-zinc-900 rounded w-fit">
                      <div>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                            </svg>
                      </div>
                  </Link>
              </div>
          </div>
          <div className="flex px-2"></div>
          <div className="flex flex-col gap-4 min-w-[28rem] p-4">
              <div className="flex gap-x-4 justify-start items-start">
                  <div className="p-16 bg-gray-100 w-[4rem] rounded-xl animate-pulse"></div>
                  <div className="space-y-4">
                      <div className="p-6 bg-gray-100 w-[16rem] rounded-xl animate-pulse"></div>
                      <div className="p-6 bg-gray-100 w-[12rem] rounded-xl animate-pulse"></div>
                  </div>
              </div>
              <div className="p-4 bg-gray-100 w-[16rem] rounded-xl animate-pulse"></div>
              <div className="p-4 bg-gray-100 w-[20rem] rounded-xl animate-pulse"></div>
          </div>
        </main>
      <Footer />
    </div>
  );
};

export default CardPlacement;
