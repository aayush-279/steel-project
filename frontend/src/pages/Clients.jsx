const Clients = () => {
  const logos = [
    "ACCEL - Logo.jpg",
    "AMC-logo.jpg",
    "Govardhannathji Engineers LLP - LOGO.jpg",
    "Inox Air Products - Logo.jpg",
    "Malani Construction Co - Logo.jpg",
    "Nila Infrastructure Ltd. - Logo.jpeg",
    "P C Snehal-logo.png",
    "Samruddhi Engineering - logo.jpg",
    "Shailja - Logo.jpg",
    "Silicon engeneering - logo.jpg",
    "Vadilal - Logo.jpg",
    "Vadodara Municipal Corporation - Logo.jpg",
    "Vandematram - logo.jpg",
    "Vishv Umiya Foundation - Logo.jpg",
    "iACE - Logo.jpg",
    "ongc - Logo.jpg"
  ];

  return (
    <div className="bg-background min-h-screen pb-20 overflow-hidden">
      {/* Page Header */}
      <div className="max-w-[1280px] mx-auto px-6 py-12 md:py-20 text-center">
        <h1 className="font-headline-xl text-4xl md:text-5xl font-black text-primary mb-4 tracking-tight uppercase">Our Clients</h1>
        <p className="font-body-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
          We take pride in our strong partnerships with industry leaders, government bodies, and top-tier corporations across the nation.
        </p>
      </div>

      <div className="py-16 bg-transparent overflow-hidden flex flex-col justify-center min-h-[300px]">
        {/* Marquee Wrapper */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
          {/* First set of logos */}
          <div className="flex items-center gap-16 pr-16 md:gap-24 md:pr-24">
            {logos.map((filename, index) => (
              <img
                key={`logo-1-${index}`}
                src={`/assets/clients/${filename}`}
                alt={`Client Logo ${index + 1}`}
                className="h-24 md:h-36 w-auto max-w-[300px] object-contain mix-blend-multiply transition-transform duration-300 hover:scale-110"
              />
            ))}
          </div>
          {/* Duplicate set of logos for perfectly seamless infinite scroll */}
          <div className="flex items-center gap-16 pr-16 md:gap-24 md:pr-24">
            {logos.map((filename, index) => (
              <img
                key={`logo-2-${index}`}
                src={`/assets/LOGO/PARTIES LOGO/${filename}`}
                alt={`Client Logo ${index + 1}`}
                className="h-24 md:h-36 w-auto max-w-[300px] object-contain mix-blend-multiply transition-transform duration-300 hover:scale-110"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Trust Metrics & CTA Section */}
      <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-8 border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
            <span className="material-symbols-outlined text-4xl text-secondary mb-4">verified</span>
            <h3 className="font-headline-md text-xl mb-3 text-primary">Proven Reliability</h3>
            <p className="text-on-surface-variant font-body-sm leading-relaxed">Trusted by government bodies and private giants for timely delivery of critical infrastructure.</p>
          </div>
          
          <div className="bg-white p-8 border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
            <span className="material-symbols-outlined text-4xl text-secondary mb-4">architecture</span>
            <h3 className="font-headline-md text-xl mb-3 text-primary">Precision Engineering</h3>
            <p className="text-on-surface-variant font-body-sm leading-relaxed">State-of-the-art fabrication facilities ensuring flawless structural integrity and zero defects.</p>
          </div>

          <div className="bg-white p-8 border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
            <span className="material-symbols-outlined text-4xl text-secondary mb-4">factory</span>
            <h3 className="font-headline-md text-xl mb-3 text-primary">Massive Scale</h3>
            <p className="text-on-surface-variant font-body-sm leading-relaxed">Equipped with heavy-duty machinery to handle thousands of metric tons of steel capacity annually.</p>
          </div>
        </div>

        {/* CTA Block */}
        <div className="bg-primary text-white p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 opacity-10 bg-[url('/assets/blueprint-pattern.png')] bg-cover mix-blend-overlay"></div>
          <div className="absolute -right-20 -top-20 w-64 h-64 border-[40px] border-secondary/20 rounded-full blur-xl"></div>
          
          <div className="relative z-10 text-center md:text-left">
            <h2 className="font-headline-lg text-3xl md:text-4xl mb-4">Ready to build the future?</h2>
            <p className="font-body-md text-gray-300 max-w-xl">Join the ranks of our elite clientele. Let's discuss the structural requirements for your next mega-project.</p>
          </div>
          
          <div className="relative z-10 shrink-0">
            <a href="/contact" className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 font-work-sans font-bold tracking-widest uppercase hover:bg-red-700 transition-colors">
              Get in Touch <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Clients;
