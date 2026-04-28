import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const yy = date.getFullYear().toString().slice(-2);
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    return `${yy}/${mm}/${dd}`;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-GB', { hour12: false });
  };

  const getTabName = () => {
    switch (location.pathname) {
      case '/products': return 'Products';
      case '/works': return 'Works';
      case '/clients': return 'Our Clients';
      case '/contact': return 'Contact';
      default: return '';
    }
  };

  const tabName = getTabName();

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 w-full max-w-none bg-white border-b-2 border-gray-200 shadow-sm">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3 sm:gap-4">
            <img 
              src="/assets/LOGO & CERTIFICATE/Patel Engineering Co. - Logo - Final (PNG).png" 
              alt="Patel Engineering Co. Logo" 
              className="h-10 sm:h-12 w-auto"
            />
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="text-lg font-black text-blue-900 tracking-tighter uppercase hidden sm:block">Patel Engineering Co.</span>
                {tabName && (
                  <span className="xl:hidden sm:ml-3 sm:pl-3 sm:border-l-2 sm:border-gray-300 text-xs sm:text-sm font-bold text-secondary uppercase tracking-widest">{tabName}</span>
                )}
              </div>
              <div className="hidden sm:flex items-center gap-3 text-[10px] font-black text-secondary tracking-[0.2em] mt-[-2px]">
                <span>{formatDate(dateTime)}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="tabular-nums">{formatTime(dateTime)}</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link className={`font-work-sans text-sm font-semibold tracking-wide uppercase transition-colors ${location.pathname === '/' ? 'text-red-600' : 'text-blue-900 hover:text-red-600'}`} to="/">Home</Link>
            <Link className={`font-work-sans text-sm font-semibold tracking-wide uppercase transition-colors ${location.pathname === '/products' ? 'text-red-600' : 'text-blue-900 hover:text-red-600'}`} to="/products">Products</Link>
            <Link className={`font-work-sans text-sm font-semibold tracking-wide uppercase transition-colors ${location.pathname === '/works' ? 'text-red-600' : 'text-blue-900 hover:text-red-600'}`} to="/works">Works</Link>
            <Link className={`font-work-sans text-sm font-semibold tracking-wide uppercase transition-colors ${location.pathname === '/clients' ? 'text-red-600' : 'text-blue-900 hover:text-red-600'}`} to="/clients">Our Clients</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/contact" className="hidden md:block bg-secondary text-white px-6 py-2 font-work-sans text-sm font-bold uppercase tracking-wider hover:bg-red-700 transition-all active:scale-95 duration-75 whitespace-nowrap">
            Request Quote
          </Link>
          <button 
            className="md:hidden flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span 
              className="material-symbols-outlined text-blue-900 cursor-pointer transition-transform duration-300 select-none" 
              style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
            >
              {isOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden absolute top-full left-0 w-full z-40 bg-white border-b border-gray-200 px-6 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-[500px] py-4 opacity-100 visible' : 'max-h-0 py-0 opacity-0 invisible pointer-events-none'
          }`}
        >
          <div className="flex flex-col gap-4">
            <Link onClick={() => setIsOpen(false)} className="font-work-sans text-sm font-semibold tracking-wide uppercase text-blue-900 hover:text-red-600 transition-colors" to="/">Home</Link>
            <Link onClick={() => setIsOpen(false)} className="font-work-sans text-sm font-semibold tracking-wide uppercase text-blue-900 hover:text-red-600 transition-colors" to="/products">Products</Link>
            <Link onClick={() => setIsOpen(false)} className="font-work-sans text-sm font-semibold tracking-wide uppercase text-blue-900 hover:text-red-600 transition-colors" to="/works">Works</Link>
            <Link onClick={() => setIsOpen(false)} className="font-work-sans text-sm font-semibold tracking-wide uppercase text-blue-900 hover:text-red-600 transition-colors" to="/clients">Our Clients</Link>
            <Link onClick={() => setIsOpen(false)} to="/contact" className="bg-secondary text-white px-6 py-2 font-work-sans text-sm font-bold uppercase tracking-wider text-center mt-2">
              Request Quote
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;