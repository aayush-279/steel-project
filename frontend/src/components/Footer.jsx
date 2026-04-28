import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full py-12 px-8 grid grid-cols-1 md:grid-cols-3 gap-8 bg-blue-950 dark:bg-black border-t-4 border-red-600">
      <div className="md:col-span-1">
        <span className="text-white font-bold text-base block mb-6 uppercase tracking-widest">Patel Engineering Co.</span>
        <p className="font-work-sans text-xs text-gray-400 mb-6 leading-relaxed">
          Setting benchmarks in structural excellence through innovative engineering and precision manufacturing since 2002.
        </p>
        <div className="flex gap-4">
          <a className="text-gray-400 hover:text-white transition-colors" href="mailto:patelenggco1@yahoo.com"><span className="material-symbols-outlined">mail</span></a>
          <a className="text-gray-400 hover:text-white transition-colors" href="tel:+919824009770"><span className="material-symbols-outlined">phone</span></a>
        </div>
      </div>

      <div>
        <h4 className="text-white font-bold text-sm mb-6 uppercase">Company</h4>
        <ul className="space-y-3 font-work-sans text-xs text-gray-400">
          <li><Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-red-500 transition-colors" to="/">Privacy Policy</Link></li>
          <li><Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-red-500 transition-colors" to="/quality-standards">Quality & Standards</Link></li>
          <li><Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-red-500 transition-colors" to="/contact">Contact Support</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold text-sm mb-6 uppercase">Our Location</h4>
        <address className="not-italic font-work-sans text-xs text-gray-400 leading-relaxed">
          Shastri Laghu Udhyognagar, B/1,<br/>
          Maheshwari Mills Rd, Tavdipura,<br/>
          Shahibag, Ahmedabad,<br/>
          Gujarat - 380004.
        </address>
        <p className="mt-4 font-work-sans text-xs text-red-500 font-bold">T: +91 9824009770</p>
      </div>
      <div className="md:col-span-3 border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-work-sans text-xs text-gray-400">© 2026 Patel Engineering Co. Structural Excellence Guaranteed.</span>
        <div className="flex gap-6">
          <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-work-sans text-xs text-gray-400 hover:text-white underline" to="/">Terms of Use</Link>
          <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-work-sans text-xs text-gray-400 hover:text-white underline" to="/">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
