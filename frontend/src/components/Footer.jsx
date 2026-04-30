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
          B/1, Shastri Laghu Udhyognagar,<br />
          Maheshwari Mills Rd, Tavdipura,<br />
          Shahibag, Ahmedabad,<br />
          Gujarat - 380004.
        </address>
        <div className="mt-4 flex items-center gap-3 text-red-500 font-bold">
          <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>call</span>
          <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px' }} className="fill-current">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.408 2.445 1.103 3.407l-.722 2.637 2.712-.712c.947.59 2.061.935 3.257.935 3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.587-5.767-5.767-5.767zm3.39 8.161c-.054.153-.316.291-.53.309-.214.017-.423.012-.663-.048-.24-.059-.533-.133-.865-.273-1.407-.591-2.316-2.023-2.386-2.116-.07-.093-.569-.757-.569-1.442 0-.685.357-1.022.484-1.157.127-.135.281-.169.375-.169.094 0 .188.001.269.005.087.004.204-.033.32.246.116.28.397.967.432 1.036.035.07.058.152.012.246-.047.093-.07.151-.14.232-.07.081-.147.181-.209.243-.062.063-.127.132-.055.257.072.124.321.53.689.858.474.423.873.555 1.014.62.141.065.224.055.309-.043.084-.098.358-.418.454-.561.096-.143.192-.12.325-.07.132.05 1.39.654 1.484.701.094.047.156.07.191.13.035.06.035.347-.019.5z"/>
          </svg>
          <span className="text-lg">: +91 9824009770</span>
        </div>
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
