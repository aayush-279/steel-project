import { Link } from 'react-router-dom';

const Quality = () => {
  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Page Header */}
      <header className="relative py-20 bg-primary-container overflow-hidden">
        <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
          <img className="w-full h-full object-cover" src="/assets/20210122_105113.jpg" alt="background texture" />
        </div>
        <div className="container mx-auto px-margin relative z-10 text-center">
          <span className="font-label-sm text-secondary uppercase tracking-[0.3em] block mb-4">Precision & Safety</span>
          <h1 className="font-headline-xl text-white mb-6 uppercase tracking-tight">Quality Assurance</h1>
          <p className="font-body-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            At Patel Engineering Co., quality is not a checklist—it is the foundation of every structure we build. 
            We adhere to stringent national and international standards to ensure structural integrity and longevity.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-margin mt-16 space-y-24">
        
        {/* Core Standards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white border border-outline-variant hover:border-secondary transition-colors">
            <span className="material-symbols-outlined text-4xl text-secondary mb-6">workspace_premium</span>
            <h3 className="font-headline-md text-primary mb-4 uppercase">Material Grade</h3>
            <p className="font-body-md text-on-surface-variant">
              We exclusively use high-tensile steel from India's most trusted manufacturers (JSW, TATA, SAIL). Every batch is verified for chemical composition and tensile strength.
            </p>
          </div>
          <div className="p-8 bg-white border border-outline-variant hover:border-secondary transition-colors">
            <span className="material-symbols-outlined text-4xl text-secondary mb-6">precision_manufacturing</span>
            <h3 className="font-headline-md text-primary mb-4 uppercase">Fabrication Precision</h3>
            <p className="font-body-md text-on-surface-variant">
              Our fabrication process utilizes advanced CNC cutting and precision welding techniques, ensuring that every joint and beam meets exact engineering specifications.
            </p>
          </div>
          <div className="p-8 bg-white border border-outline-variant hover:border-secondary transition-colors">
            <span className="material-symbols-outlined text-4xl text-secondary mb-6">verified_user</span>
            <h3 className="font-headline-md text-primary mb-4 uppercase">Safety & Testing</h3>
            <p className="font-body-md text-on-surface-variant">
              Comprehensive inspection protocols including ultrasonic testing, dye-penetrant checks, and load-bearing simulations are conducted before any site delivery.
            </p>
          </div>
        </section>

        {/* Certificates Section */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-headline-lg text-primary uppercase">Official Certifications</h2>
            <div className="h-[1px] flex-grow mx-8 bg-outline-variant"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 shadow-md border border-outline-variant hover:shadow-xl transition-shadow w-full group overflow-hidden">
                <img 
                  src="/assets/brand/iso-cert.jpg" 
                  alt="ISO Certificate" 
                  className="w-full h-auto object-contain bg-surface-container-low transition-transform group-hover:scale-105"
                />
              </div>
              <h4 className="mt-6 font-headline-sm text-primary uppercase tracking-widest">ISO 9001:2015 Certificate</h4>
              <p className="text-on-surface-variant font-label-sm mt-2">Quality Management System Standard</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 shadow-md border border-outline-variant hover:shadow-xl transition-shadow w-full group overflow-hidden">
                <img 
                  src="/assets/brand/zed-cert.jpg" 
                  alt="ZED Certificate" 
                  className="w-full h-auto object-contain bg-surface-container-low transition-transform group-hover:scale-105"
                />
              </div>
              <h4 className="mt-6 font-headline-sm text-primary uppercase tracking-widest">ZED Certification</h4>
              <p className="text-on-surface-variant font-label-sm mt-2">Zero Defect Zero Effect Manufacturing</p>
            </div>
          </div>
        </section>

        {/* Process Roadmap */}
        <section className="bg-primary-container p-12 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <h2 className="font-headline-lg mb-12 text-center">Our Quality Control Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-2 border-secondary flex items-center justify-center mx-auto text-secondary font-bold">01</div>
              <h4 className="font-label-md uppercase tracking-widest">Inward Material Check</h4>
            </div>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-2 border-secondary flex items-center justify-center mx-auto text-secondary font-bold">02</div>
              <h4 className="font-label-md uppercase tracking-widest">In-Process Inspection</h4>
            </div>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-2 border-secondary flex items-center justify-center mx-auto text-secondary font-bold">03</div>
              <h4 className="font-label-md uppercase tracking-widest">Final QC Testing</h4>
            </div>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-2 border-secondary flex items-center justify-center mx-auto text-secondary font-bold">04</div>
              <h4 className="font-label-md uppercase tracking-widest">Safe Logistics</h4>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <h2 className="font-headline-md text-primary mb-6">Need technical specifications for your project?</h2>
          <Link to="/contact" className="inline-flex items-center gap-3 px-10 py-4 bg-secondary text-white font-bold uppercase tracking-widest hover:bg-secondary/90 transition-all">
            Consult Our Engineers <span className="material-symbols-outlined">engineering</span>
          </Link>
        </section>

      </div>
    </div>
  );
};

export default Quality;
