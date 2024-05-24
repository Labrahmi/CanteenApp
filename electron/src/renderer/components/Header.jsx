import { Link } from 'react-router-dom';

const Header = (parms) => {

  let defaultClasses = "group-hover:w-6 w-0 h-6 transition-all duration-100";

  if (parms) {
    if (parms.data) {
      if (parms.data.disabledBack) {
        defaultClasses = "w-0 h-6 transition-all duration-100";
      }
    }
  }

  return (
    <header className="flex justify-between items-center select-none sticky top-0 py-0 z-50">
        <Link className="group font-thin cursor-pointer p-4 rounded-xl transition-all ease-linear flex gap-2" to={"/"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={defaultClasses}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>
            <span className="font-semibold uppercase text-pink-900">London Academy</span> | Canteen Management System
        </Link>
    </header>
  );
};

export default Header;
