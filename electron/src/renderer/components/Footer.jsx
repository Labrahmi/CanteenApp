import { Link } from 'react-router-dom';

const Footer = (parms) => {
  if (parms) {
    if (parms.data) {
      if (parms.data.disabled) {
        return (
          <footer>
          </footer>
        );
      }
    }
  }

  return (
    <footer>
        <Link to={"/home"} className="flex gap-2 justify-center items-center text-xl px-4 font-semibold bg-zinc-100 hover:bg-zinc-200 p-2 border border-zinc-900 rounded w-fit">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                  </svg>
            </div>
        </Link>
    </footer>
  );
};

export default Footer;
