import { useState, useEffect } from 'react';

const ProductsDynamic = () => {
  const [dynamicProducts, setDynamicProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const ladderImages = [
    '/assets/household/Ladder - Photo.jpg',
    '/assets/household/PECO - Ladder - Catalouge.jpg',
    '/assets/household/Ladder - Catalouge_page-0002.jpg',
    '/assets/household/Ladder - Catalouge_page-0003.jpg',
  ];

  const bedFittingImages = [
    '/assets/household/bed-fitting-1.jpeg',
    '/assets/household/PECO - Bed Fitting - Catalouge.jpg',
    '/assets/household/bed-fitting-3.jpeg',
  ];

  useEffect(() => {
    // Show static content immediately
    setIsLoading(false);

    // Fetch dynamic products in the background
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/products`)

      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        const formattedData = data.map(p => {
          let imagesArray = [];
          try {
            const parsed = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
            imagesArray = Array.isArray(parsed) ? parsed : [];
          } catch (e) {
            imagesArray = [];
          }
          return {
            ...p,
            images: imagesArray
          };
        });
        setDynamicProducts(formattedData);
      })
      .catch(err => {
        console.error("Backend fetch failed:", err);
      });
  }, []);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-primary font-bold uppercase tracking-widest">Syncing Product Line...</div>;

  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="max-w-[1280px] mx-auto px-6 py-12 md:py-20 text-center">
        <h1 className="font-headline-xl text-4xl md:text-5xl font-black text-primary mb-4 tracking-tight uppercase">Our Products</h1>
        <p className="font-body-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
          Explore our range of premium engineering and household hardware items, designed for strength and industrial-grade durability.
        </p>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 space-y-24">
        {/* Static Section 1: MS Ladder */}
        <section>
          <div className="border-l-8 border-secondary pl-6 mb-12">
            <h2 className="font-headline-lg text-3xl font-black text-primary uppercase">1. MS Ladder</h2>
            <p className="text-on-surface-variant mt-2 font-body-md">High-quality Mild Steel ladders for industrial and household use.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
            {ladderImages.map((src, index) => (
              <div key={index} className="bg-white p-2 shadow-md border border-outline-variant hover:shadow-xl transition-shadow flex items-center justify-center aspect-[3/4]">
                <img src={src} alt="MS Ladder" className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
        </section>

        <hr className="border-outline-variant" />

        {/* Static Section 2: Bed Fitting */}
        <section>
          <div className="border-l-8 border-secondary pl-6 mb-12">
            <h2 className="font-headline-lg text-3xl font-black text-primary uppercase">2. Bed Fitting</h2>
            <p className="text-on-surface-variant mt-2 font-body-md">Precision-engineered bed fitting mechanisms and structural support brackets.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {bedFittingImages.map((src, index) => (
              <div key={index} className="bg-white p-2 shadow-md border border-outline-variant hover:shadow-xl transition-shadow flex items-center justify-center aspect-square">
                <img src={src} alt="Bed Fitting" className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
        </section>

        <hr className="border-outline-variant" />

        {/* Dynamic Sections: User Added */}
        {dynamicProducts.map((product, index) => (
          <section key={product.id}>
            <div className="border-l-8 border-secondary pl-6 mb-12">
              <h2 className="font-headline-lg text-3xl font-black text-primary uppercase">{index + 3}. {product.name}</h2>
              <p className="text-on-surface-variant mt-2 font-body-md max-w-2xl">{product.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.images.map((url, imgIdx) => (
                <div key={imgIdx} className="bg-white p-4 shadow-md border border-outline-variant hover:shadow-2xl transition-all duration-300 flex items-center justify-center aspect-[4/5] overflow-hidden group">
                  {url.toLowerCase().endsWith('.mp4') ? (
                    <video src={url} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" muted loop onMouseOver={(e) => e.target.play()} onMouseOut={(e) => e.target.pause()} />
                  ) : (
                    <img src={url} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  )}
                </div>
              ))}
            </div>
            <hr className="mt-24 border-outline-variant" />
          </section>
        ))}
      </div>
    </div>
  );
};

export default ProductsDynamic;
