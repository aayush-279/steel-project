import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative h-[870px] flex items-start overflow-hidden bg-primary-container">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-60 grayscale" alt="massive industrial steel framework construction" src="/assets/20210122_105113.jpg" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/90 to-transparent"></div>
        </div>
        <div className="container mx-auto px-margin relative z-10">
          <div className="max-w-3xl pt-32">
            {/* Core Values Vertical Column */}
            <div className="flex flex-col gap-4 mb-10">
              <div className="group w-fit px-6 py-3 border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:border-secondary/40 cursor-default">
                <span className="font-label-sm text-white/60 tracking-widest uppercase transition-colors group-hover:text-secondary">Quality Certified</span>
              </div>
              <div className="group w-fit px-6 py-3 border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-secondary/40 cursor-default">
                <span className="font-label-sm text-white/60 tracking-widest uppercase transition-colors group-hover:text-secondary">Structural Integrity</span>
              </div>
              <div className="group w-fit px-6 py-3 border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-secondary/40 cursor-default">
                <span className="font-label-sm text-white/60 tracking-widest uppercase transition-colors group-hover:text-secondary">Precision Manufacturing</span>
              </div>
            </div>
            <h1 className="font-headline-xl text-white mb-8 leading-tight">Engineered for Strength,<br />Built for Excellence</h1>
            <p className="font-body-lg text-on-primary-container mb-12 max-w-xl opacity-80">
              Delivering high-precision steel fabrication and engineering solutions for India's most critical infrastructure projects.
            </p>
            <div className="flex flex-col gap-6">
              <Link to="/works" className="group flex items-center gap-6 w-fit bg-secondary text-white pl-10 pr-6 py-5 font-work-sans text-lg font-black uppercase tracking-[0.3em] hover:bg-opacity-90 transition-all shadow-2xl relative overflow-hidden">
                <span className="relative z-10">Discover Precision</span>
                <span className="material-symbols-outlined text-3xl group-hover:translate-x-3 transition-transform">arrow_forward</span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
              </Link>
              <div className="flex items-center gap-4 text-white/60 font-black text-[10px] uppercase tracking-[0.4em] ml-2">
                <span className="w-8 h-[1px] bg-secondary"></span>
                CORE INDUSTRIAL SOLUTIONS
              </div>
            </div>
          </div>
        </div>
        {/* Technical Callout */}
        <div className="absolute bottom-16 right-margin hidden lg:block border-l-4 border-secondary pl-8 bg-primary-container/40 backdrop-blur-md py-4 pr-12">
          <div className="font-headline-md text-white text-4xl mb-1">2002</div>
          <div className="font-label-sm text-secondary font-black uppercase tracking-[0.3em] text-xs">ESTABLISHED EXCELLENCE</div>
        </div>
      </header>

      {/* Tenders Ticker */}
      <div className="bg-primary-container border-y border-white/10 py-3 overflow-hidden">
        <div className="flex items-center gap-12 whitespace-nowrap animate-marquee">
          <span className="flex items-center gap-2 text-white font-label-sm uppercase tracking-tighter">
            <span className="material-symbols-outlined text-secondary text-sm">notifications_active</span>
            Latest Tenders:
          </span>
          <span className="text-tertiary-fixed font-body-md text-sm border-r border-white/20 pr-12">Supply of TMT Bars for Ahmedabad Metro Phase II - [Ref: PSE-2024-089]</span>
          <span className="text-tertiary-fixed font-body-md text-sm border-r border-white/20 pr-12">Structural Fabrication for Reliance Jamnagar Expansion - [Ref: PSE-2024-112]</span>
          <span className="text-tertiary-fixed font-body-md text-sm border-r border-white/20 pr-12">Industrial Shed Construction for GIDC Vatva - [Ref: PSE-2024-077]</span>
        </div>
      </div>

      {/* About Legacy Section */}
      <section className="py-section-gap structural-grid">
        <div className="container mx-auto px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-secondary"></div>
              <img className="relative z-10 w-full h-[500px] object-cover grayscale" alt="black and white close-up of a precision engineer" src="/assets/20210122_105113.jpg" />
              <div className="absolute -bottom-10 -right-10 bg-white p-10 border border-outline-variant shadow-lg z-20">
                <div className="font-headline-xl text-secondary">20+</div>
                <div className="font-label-sm text-on-surface-variant uppercase">Years of Expertise</div>
              </div>
            </div>
            <div>
              <h2 className="font-headline-lg text-primary mb-6">About Us</h2>
              <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
                Established as a Sole Proprietorship firm in the year 2002, we “Patel Engineering Co,” are a leading Manufacturer of a wide range of Roofing Shed, Factory Shed, Prefabricated Factory Shed, Household Hardware Manufacturer, etc. Situated in Ahmedabad (Gujarat, India), we have constructed a wide and well functional infrastructural unit that plays an important role in the growth of our company. We offer these products at reasonable rates and deliver these within the promised time-frame. Under the headship of our mentor “Mr. Pankaj Patel”, we have gained a huge clientele across the nation.
              </p>
              <div className="grid grid-cols-2 gap-y-10 gap-x-8">
                <div className="flex flex-col gap-1">
                  <div className="text-secondary font-label-sm uppercase tracking-widest opacity-70">Nature of Business</div>
                  <div className="font-headline-sm text-primary text-xl">Manufacturer</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-secondary font-label-sm uppercase tracking-widest opacity-70">Legal Status</div>
                  <div className="font-headline-sm text-primary text-xl">Proprietorship</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-secondary font-label-sm uppercase tracking-widest opacity-70">Annual Turnover</div>
                  <div className="font-headline-sm text-primary text-xl">40 L - 5 Cr</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-secondary font-label-sm uppercase tracking-widest opacity-70">Employees</div>
                  <div className="font-headline-sm text-primary text-xl">Upto 10 People</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-secondary font-label-sm uppercase tracking-widest opacity-70">GST Registered</div>
                  <div className="font-headline-sm text-primary text-xl">Jul'17</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-secondary font-label-sm uppercase tracking-widest opacity-70">GST Number</div>
                  <a 
                    href="https://services.gst.gov.in/services/searchtp" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-headline-sm text-primary text-base font-mono hover:text-secondary transition-colors cursor-pointer"
                  >
                    24**********1Z4
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Specialized Solutions */}
      <section className="py-section-gap bg-surface-container-low">
        <div className="container mx-auto px-margin">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <span className="font-label-sm text-secondary uppercase tracking-[0.2em] block mb-2">Our Capabilities</span>
              <h2 className="font-headline-lg text-primary">Specialized Solutions</h2>
            </div>
            <div className="h-1 w-24 bg-secondary mb-2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Shed Construction */}
            <div className="md:col-span-2 relative group overflow-hidden bg-white border border-outline-variant">
              <img className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" alt="massive industrial shed construction" src="/assets/IMG_20210601_121143.jpg" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="font-headline-md text-white mb-2">Industrial Shed Construction</h3>
                <p className="text-white/80 font-body-md max-w-lg mb-6">Expert design and installation of factory sheds and warehouses, engineered for longevity and structural safety.</p>
                <Link className="inline-flex items-center gap-2 text-secondary font-bold uppercase text-sm group-hover:gap-4 transition-all" to="/works">
                  View Our Projects <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>
            {/* Fabrication */}
            <div className="bg-white border border-outline-variant p-8 flex flex-col justify-between group hover:border-secondary transition-colors">
              <div>
                <span className="material-symbols-outlined text-4xl text-secondary mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>precision_manufacturing</span>
                <h3 className="font-headline-md text-primary mb-4">Structural Fabrication</h3>
                <p className="font-body-md text-on-surface-variant">High-precision welding, cutting, and assembly of heavy-duty steel frameworks and industrial components.</p>
              </div>
            </div>
            {/* Roofing */}
            <div className="bg-primary-container p-8 flex flex-col justify-between group">
              <div>
                <span className="material-symbols-outlined text-4xl text-secondary mb-6">roofing</span>
                <h3 className="font-headline-md text-white mb-4 text-secondary">Roofing Solutions</h3>
                <p className="font-body-md text-on-primary-container">Durable roofing sheds and prefabricated factory sheds customized to your specific industrial requirements.</p>
              </div>
            </div>
            {/* Factory Frameworks */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-2 h-full gap-gutter">
                <div className="relative overflow-hidden">
                  <img className="w-full h-full object-cover grayscale" alt="factory steel framework" src="/assets/20210127_173542.jpg" />
                </div>
                <div className="bg-white border border-outline-variant p-8">
                  <h3 className="font-headline-md text-primary mb-4">Factory Frameworks</h3>
                  <p className="font-body-md text-on-surface-variant mb-4">Specialized structural sections for massive industrial complexes and plant layouts.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 font-label-sm text-on-surface-variant"><span className="w-1.5 h-1.5 bg-secondary"></span> Heavy Beam Support</li>
                    <li className="flex items-center gap-2 font-label-sm text-on-surface-variant"><span className="w-1.5 h-1.5 bg-secondary"></span> Modular Factory Sections</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Engineering Excellence */}
      <section className="py-section-gap bg-white overflow-hidden border-t border-outline-variant">
        <div className="container mx-auto px-margin">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-headline-lg text-primary uppercase tracking-tighter">Our Structural Excellence</h2>
            <div className="h-0.5 flex-grow mx-12 bg-outline-variant hidden md:block"></div>
            <Link to="/works" className="font-label-sm text-secondary hover:underline transition-all">VIEW ALL WORKS</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Real Project 1 */}
            <div className="border border-outline-variant group bg-surface-container-lowest">
              <div className="h-64 overflow-hidden">
                <img className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="industrial roofing project" src="/assets/20210122_105113.jpg" />
              </div>
              <div className="p-6">
                <div className="text-secondary font-label-sm uppercase mb-2">Industrial Roofing</div>
                <h4 className="font-headline-md text-primary mb-4">Heavy-Duty Framework</h4>
                <p className="font-body-md text-on-surface-variant mb-6">Custom truss fabrication and installation for large-scale factory sheds.</p>
              </div>
            </div>
            {/* Real Project 2 */}
            <div className="border border-outline-variant group bg-surface-container-lowest">
              <div className="h-64 overflow-hidden">
                <img className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="steel structure installation" src="/assets/20201105_111445.jpg" />
              </div>
              <div className="p-6">
                <div className="text-secondary font-label-sm uppercase mb-2">Factory Construction</div>
                <h4 className="font-headline-md text-primary mb-4">Precision Engineering</h4>
                <p className="font-body-md text-on-surface-variant mb-6">Structural assembly of factory frameworks with high-precision steel sections.</p>
              </div>
            </div>
            {/* Real Project 3 */}
            <div className="border border-outline-variant group bg-surface-container-lowest">
              <div className="h-64 overflow-hidden">
                <img className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="industrial shed interior" src="/assets/IMG_20210619_075012.jpg" />
              </div>
              <div className="p-6">
                <div className="text-secondary font-label-sm uppercase mb-2">Prefabricated Solutions</div>
                <h4 className="font-headline-md text-primary mb-4">Functional Workspaces</h4>
                <p className="font-body-md text-on-surface-variant mb-6">Designing functional industrial units that optimize plant layout and operations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Excellence & Core Strengths */}
      <section className="bg-primary-container relative py-24 overflow-hidden border-t-8 border-secondary">
        {/* Technical Background Elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 structural-grid opacity-30"></div>
          <div className="absolute -right-1/4 -top-1/4 w-1/2 h-full bg-secondary/5 blur-[120px] rounded-full"></div>
          <div className="absolute -left-1/4 -bottom-1/4 w-1/2 h-full bg-blue-900/20 blur-[120px] rounded-full"></div>
        </div>

        <div className="container mx-auto px-margin relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

            <div className="flex flex-col gap-6 group">
              <div className="h-1.5 w-12 bg-secondary transition-all group-hover:w-full duration-700 ease-out"></div>
              <div className="flex flex-col gap-4">
                <span className="material-symbols-outlined text-secondary text-5xl mb-2 group-hover:scale-110 transition-transform">architecture</span>
                <h3 className="font-headline-md text-white text-2xl uppercase tracking-tight">Structural Innovation</h3>
                <p className="font-label-sm text-on-primary-container opacity-60 uppercase tracking-[0.2em] leading-relaxed">
                  Pioneering solutions in <br />
                  Steel Framework Design
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 group">
              <div className="h-1.5 w-12 bg-secondary transition-all group-hover:w-full duration-700 ease-out"></div>
              <div className="flex flex-col gap-4">
                <span className="material-symbols-outlined text-secondary text-5xl mb-2 group-hover:scale-110 transition-transform">precision_manufacturing</span>
                <h3 className="font-headline-md text-white text-2xl uppercase tracking-tight">Precision Manufacturing</h3>
                <p className="font-label-sm text-on-primary-container opacity-60 uppercase tracking-[0.2em] leading-relaxed">
                  Advanced Technology for <br />
                  Flawless Execution
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 group">
              <div className="h-1.5 w-12 bg-secondary transition-all group-hover:w-full duration-700 ease-out"></div>
              <div className="flex flex-col gap-4">
                <span className="material-symbols-outlined text-secondary text-5xl mb-2 group-hover:scale-110 transition-transform">view_in_ar</span>
                <h3 className="font-headline-md text-white text-2xl uppercase tracking-tight">Industrial Scalability</h3>
                <p className="font-label-sm text-on-primary-container opacity-60 uppercase tracking-[0.2em] leading-relaxed">
                  From Local Sheds to <br />
                  Massive Plant Complexes
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 group">
              <div className="h-1.5 w-12 bg-secondary transition-all group-hover:w-full duration-700 ease-out"></div>
              <div className="flex flex-col gap-4">
                <span className="material-symbols-outlined text-secondary text-5xl mb-2 group-hover:scale-110 transition-transform">verified</span>
                <h3 className="font-headline-md text-white text-2xl uppercase tracking-tight">ISO Certified Quality</h3>
                <p className="font-label-sm text-on-primary-container opacity-60 uppercase tracking-[0.2em] leading-relaxed">
                  Global Standards in <br />
                  Management & Delivery
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
