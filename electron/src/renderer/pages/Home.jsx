import { Link, useNavigate } from 'react-router-dom';
import Footer from 'renderer/components/Footer';
import Header from 'renderer/components/Header';
import editCard from '../../../assets/editCard.png';
import fundIcon from '../../../assets/fundIcon.png';
import newCard from '../../../assets/newCard.png';


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="font-light p-6 flex flex-col justify-between min-h-screen gap-y-4">
      <Header data={{ disabledBack: true }} />
      <main>
        <div
            className="p-4 grid grid-cols-3 gap-x-16">
            <Link
                onClick={() => {
                  setTimeout(() => {
                    navigate("/add-funds");
                  }, 1000);
                }}
                to={'#'}
                className="group bg-white cursor-pointer rounded-lg p-8 border border-zinc-300 text-center min-h-[16rem] hover:scale-105 focus:bg-zinc-800 focus:text-zinc-100 relative overflow-hidden flex justify-center items-center transition-all ease-in-out duration-200">
                <div className="font-thin text-green-950 text-3xl drop-shadow-xl">Add Balance To
                    Card</div>
                <img src={fundIcon} alt="add funds" className="absolute top-4 right-4 w-52 h-52 opacity-10 grayscale" />
            </Link>
            <Link
                onClick={() => {
                  setTimeout(() => {
                    navigate("/register-card");
                  }, 1000);
                }}
                to={'#'}
                className="group bg-white cursor-pointer rounded-lg p-8 border border-zinc-300 text-center min-h-[16rem] hover:scale-105 focus:bg-zinc-800 focus:text-zinc-100 relative overflow-hidden flex justify-center items-center transition-all ease-in-out duration-200">
                <div className="font-thin text-green-950 text-3xl drop-shadow-xl">Register New
                    Card</div>
                <img src={newCard} alt="add funds" className="absolute top-4 right-4 w-52 h-52 opacity-10 grayscale" />
            </Link>
            <Link
                onClick={() => {
                  setTimeout(() => {
                    navigate("/edit-card");
                  }, 1000);
                }}
                to={'#'}
                className="group bg-white cursor-pointer rounded-lg p-8 border border-zinc-300 text-center min-h-[16rem] hover:scale-105 focus:bg-zinc-800 focus:text-zinc-100 relative overflow-hidden flex justify-center items-center transition-all ease-in-out duration-200">
                <div className="font-thin text-green-950 text-3xl drop-shadow-xl">Edit Card
                    Informations</div>
                <img src={editCard} alt="add funds" className="absolute top-4 right-4 w-52 h-52 opacity-10 grayscale" />
            </Link>
        </div>
      </main>
      <Footer data={{disabled: true}} />
    </div>
  );
};

export default Home;
