import { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '', companyName: '', phone: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/contact`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setShowSuccess(true);
        setForm({ name: '', email: '', message: '', companyName: '', phone: '' });
        setTimeout(() => setShowSuccess(false), 5000); // Hide after 5 seconds
      } else {
        alert('Error sending message. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Network error. Please make sure the server is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Header Hero */}
      <header className="relative py-20 bg-primary-container overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img alt="Close-up of industrial steel beams" className="w-full h-full object-cover" src="/assets/IMG_20210601_121158.jpg"/>
        </div>
        <div className="relative max-w-[1280px] mx-auto px-6">
          <h1 className="font-headline-xl text-headline-xl text-white mb-4">Connect with Structural Excellence</h1>
          <p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl">From complex bridge structures to precision-engineered TMT bars, our team is ready to support your next heavy engineering milestone.</p>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-6 py-20">
        {/* Main Contact Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 lg:p-12 border border-outline-variant rounded-none">
            <h2 className="font-headline-lg text-headline-lg mb-8 text-primary border-l-4 border-secondary pl-4 uppercase">Inquiry Form</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-2">Full Name</label>
                  <input className="w-full bg-surface-container-low border-outline-variant focus:border-primary focus:ring-0 transition-colors py-3" placeholder="John Doe" type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required/>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-2">Company Name</label>
                  <input className="w-full bg-surface-container-low border-outline-variant focus:border-primary focus:ring-0 transition-colors py-3" placeholder="Infrastructure Ltd." type="text" value={form.companyName} onChange={(e) => setForm({...form, companyName: e.target.value})}/>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-2">Email Address</label>
                  <input className="w-full bg-surface-container-low border-outline-variant focus:border-primary focus:ring-0 transition-colors py-3" placeholder="john@company.com" type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required/>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-2">Phone Number</label>
                  <input className="w-full bg-surface-container-low border-outline-variant focus:border-primary focus:ring-0 transition-colors py-3" placeholder="+91 98765 43210" type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}/>
                </div>
              </div>

              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-2">Message</label>
                <textarea className="w-full bg-surface-container-low border-outline-variant focus:border-primary focus:ring-0 transition-colors py-3" placeholder="Please describe your project requirements in detail..." rows="5" value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} required></textarea>
              </div>
              <button 
                className={`w-full text-on-secondary py-4 font-work-sans font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-secondary hover:bg-red-700'}`} 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Inquiry'} 
                {!isSubmitting && <span className="material-symbols-outlined">send</span>}
              </button>
            </form>
          </div>
        </div>

        {/* Success Popup Toast */}
        <div className={`fixed bottom-10 right-10 z-50 transform transition-all duration-500 ease-out ${showSuccess ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'}`}>
          <div className="bg-green-600 text-white px-8 py-4 shadow-2xl flex items-center gap-4 border-l-8 border-green-800">
            <span className="material-symbols-outlined text-3xl">check_circle</span>
            <div>
              <h4 className="font-bold font-work-sans tracking-widest uppercase">Success</h4>
              <p className="font-body-sm">FORM IS SUBMITTED SUCCESSFULLY.</p>
            </div>
            <button onClick={() => setShowSuccess(false)} className="ml-4 hover:text-green-200">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>
        {/* Map Section */}
        <section className="mt-20">
          <div className="bg-surface-container h-[450px] relative border-4 border-white shadow-xl overflow-hidden">
            <iframe 
              src="https://maps.google.com/maps?q=Ahmedabad&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy" 
            ></iframe>
            <div className="absolute bottom-6 right-6 bg-white p-4 flex gap-4 items-center border border-outline-variant">
              <span className="text-xs font-bold uppercase tracking-wider">Open in Maps:</span>
              <a href="https://maps.app.goo.gl/c75UsaVrY7p3Vw6z6" target="_blank" rel="noreferrer" className="text-secondary text-sm font-bold flex items-center gap-1">Google Maps <span className="material-symbols-outlined text-xs">open_in_new</span></a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;