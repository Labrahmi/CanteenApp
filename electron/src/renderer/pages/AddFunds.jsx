import { Link } from 'react-router-dom';
import Footer from 'renderer/components/Footer';
import Header from 'renderer/components/Header';
import _2769500_ai from '../../../assets/2769500-ai.png';


const AddFunds = () => {
  return (
    <div className="font-light p-6 flex flex-col justify-between min-h-screen gap-y-4">
      <Header />
        <main className="p-4 flex justify-center items-center">
          <div className="select-none">
              <h1 className="font-semibold text-3xl">Welcome Dear Staff 👋</h1>
              <div className="flex py-2"></div>
              <h2 className="text-2xl flex justify-center items-center gap-2">
                  <span className="font-thin">Please press</span>
                  <Link to={"/card-placement"} className="flex gap-2 hover:gap-3 justify-center items-center text-xl px-4 font-semibold bg-green-100 hover:bg-green-200 p-2 border border-green-900 rounded transition-all ease-in-out">
                      <h1 className="font-semibold text-xl">Add Balance</h1>
                      <div>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                      </div>
                  </Link>
                  <span className="font-thin"> to start</span>
              </h2>
          </div>
          <img className="w-[28rem] " src={_2769500_ai} alt="welcome screen"/>
        </main>
      <Footer />
    </div>
  );
};

export default AddFunds;
