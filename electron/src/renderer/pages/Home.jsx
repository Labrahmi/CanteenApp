import { Link, useNavigate } from 'react-router-dom';
import Footer from 'renderer/components/Footer';
import Header from 'renderer/components/Header';
import editCard from '../../../assets/editCard.png';
import fundIcon from '../../../assets/fundIcon.png';
import newCard from '../../../assets/newCard.png';
import canteen_back from '../../../assets/canteen_back.png'

const Home = () => {
  const navigate = useNavigate();
  // console.log(localStorage.getItem('token'));
  return (
    <div className="font-light p-6 flex flex-col justify-between min-h-screen gap-y-4 bg-background bg-cover">
      <Header data={{ disabledBack: true }} />
      <main>
        <div
            className="p-4 grid lg:grid-cols-3 grid-cols-1 lg:gap-16 gap-8">
            <Link
                onClick={() => {
                  setTimeout(() => {
                    navigate("/add-funds");
                  }, 500);
                }}
                to={'#'}
                className="group bg-white shadow-2xl shadow-zinc-300 cursor-pointer rounded-lg p-8  text-center min-h-[16rem] hover:scale-[1.01] relative overflow-hidden flex justify-center items-center transition-all ease-in-out duration-500">
                <div className="font-thin text-pink-950 text-3xl absolute z-20 bg-pink-100 p-2 px-4 rounded-xl uppercase">Add Balance To Card</div>
                <img src={fundIcon} alt="add funds" className="absolute top-4 right-4 w-52 h-52 opacity-50 group-hover:opacity-100 duration-500" />
            </Link>
            <Link
                onClick={() => {
                  setTimeout(() => {
                    navigate("/pos");
                  }, 500);
                }}
                to={'#'}
                className="group bg-white shadow-2xl shadow-zinc-300 cursor-pointer rounded-lg p-8  text-center min-h-[16rem] hover:scale-[1.01] relative overflow-hidden flex justify-center items-center transition-all ease-in-out duration-500">
                <div className="font-thin text-pink-950 text-3xl absolute z-20 bg-pink-100 p-2 px-4 rounded-xl uppercase">Point Of Sale</div>
                <img src={newCard} alt="add funds" className="absolute top-4 right-4 w-52 h-52 opacity-50 group-hover:opacity-100 duration-500" />
            </Link>
            <Link
                onClick={() => {
                  setTimeout(() => {
                    navigate("/edit-card");
                  }, 500);
                }}
                to={'#'}
                className="group bg-white shadow-2xl shadow-zinc-300 cursor-pointer rounded-lg p-8  text-center min-h-[16rem] hover:scale-[1.01] relative overflow-hidden flex justify-center items-center transition-all ease-in-out duration-500">
                <div className="font-thin text-pink-950 text-3xl absolute z-20 bg-pink-100 p-2 px-4 rounded-xl uppercase">Admin Panel</div>
                <img src={editCard} alt="add funds" className="absolute top-4 right-4 w-52 h-52 opacity-50 group-hover:opacity-100 duration-500" />
            </Link>
        </div>
      </main>
      <Footer data={{disabled: true}} />
    </div>
  );
};

export default Home;
