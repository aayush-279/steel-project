import { useState, useEffect, useCallback } from 'react';
import { projectsData as staticProjects } from '../projectData';

const WorksDynamic = () => {
  const [projects, setProjects] = useState([]);
  const [lightbox, setLightbox] = useState({ isOpen: false, projectId: null, imageIndex: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Always load static projects first so they are visible immediately
    const formattedStatic = staticProjects.map((p, idx) => ({
      id: `static-${idx}`,
      title: p.folder,
      images: p.images.map(img => `/assets/WORK/PATEL STEEL/${p.folder}/${img}`),
      isDynamic: false
    }));
    setProjects(formattedStatic);
    
    setIsLoading(false);

    // 2. Fetch dynamic projects from backend in the background
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/projects`)

      .then(res => res.json())
      .then(dynamicData => {
        if (!Array.isArray(dynamicData)) return;
        
        const formattedDynamic = dynamicData.map(p => {
          let imagesArray = [];
          try {
            const parsed = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
            imagesArray = Array.isArray(parsed) ? parsed : [];
          } catch (e) {
            imagesArray = [];
          }

          return {
            id: p.id,
            title: p.title, 
            images: imagesArray,
            isDynamic: true
          };
        });

        setProjects([...formattedStatic, ...formattedDynamic]);
      })
      .catch(err => {
        console.error("Backend fetch failed:", err);
      });
  }, []);

  const openLightbox = (projectId, imageIndex) => {
    setLightbox({ isOpen: true, projectId, imageIndex });
    document.body.style.overflow = 'hidden'; 
  };

  const closeLightbox = useCallback(() => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
    document.body.style.overflow = 'auto';
  }, []);

  const navigateLightbox = useCallback((direction) => {
    setLightbox(prev => {
      if (!prev.isOpen) return prev;
      const project = projects.find(p => p.id === prev.projectId);
      if (!project) return prev;
      const projectImages = project.images;
      let newImageIndex = prev.imageIndex + direction;
      if (newImageIndex < 0) newImageIndex = projectImages.length - 1; 
      else if (newImageIndex >= projectImages.length) newImageIndex = 0; 
      return { ...prev, imageIndex: newImageIndex };
    });
  }, [projects]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-primary font-bold uppercase tracking-widest">Syncing Works Portfolio...</div>;

  return (
    <div className="bg-background min-h-screen pb-20 relative">
      <div className="max-w-[1280px] mx-auto px-6 py-12 md:py-20 text-center">
        <h1 className="font-headline-xl text-4xl md:text-5xl font-black text-primary mb-4 tracking-tight uppercase">Our Works</h1>
        <p className="font-body-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
          A visual showcase of our structural excellence, engineered precision, and robust construction across massive infrastructure projects.
        </p>
      </div>

      <div className="mx-auto space-y-16">
        {projects.map((project, pIndex) => (
          <div key={project.id} className="flex flex-col gap-6 py-8 structural-grid border-y border-outline-variant/10">
            {/* Section Header */}
            <div className="container mx-auto px-6 flex items-center gap-4">
              <span className="text-secondary font-black text-2xl opacity-50">{String(pIndex + 1).padStart(2, '0')}</span>
              <h2 className="font-headline-md text-xl md:text-2xl font-bold text-primary tracking-tight uppercase">{project.title}</h2>
            </div>

            {/* Marquee Effect for Media */}
            <div className="overflow-hidden py-4 flex items-center">
              <div 
                className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center"
                style={{ animationDuration: `${Math.max(project.images.length * 6, 15)}s` }}
              >
                {/* First set of media */}
                <div className="flex items-center gap-6 pr-6">
                  {project.images.map((url, iIndex) => (
                    <div
                      key={`set1-${iIndex}`}
                      onDoubleClick={() => openLightbox(project.id, iIndex)}
                      title="Double Click to expand"
                      className="bg-white border border-outline-variant/30 overflow-hidden shadow-sm hover:shadow-xl hover:border-secondary transition-all duration-300 group cursor-zoom-in h-64 md:h-80 aspect-[4/3] relative shrink-0"
                    >
                      {url.toLowerCase().endsWith('.mp4') ? (
                        <video src={url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" muted loop onMouseOver={(e) => e.target.play()} onMouseOut={(e) => e.target.pause()} />
                      ) : (
                        <img src={url} alt="Project Media" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      )}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-3xl">add_circle</span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Duplicate set for seamless scrolling */}
                <div className="flex items-center gap-6 pr-6">
                  {project.images.map((url, iIndex) => (
                    <div
                      key={`set2-${iIndex}`}
                      onDoubleClick={() => openLightbox(project.id, iIndex)}
                      title="Double Click to expand"
                      className="bg-white border border-outline-variant/30 overflow-hidden shadow-sm hover:shadow-xl hover:border-secondary transition-all duration-300 group cursor-zoom-in h-64 md:h-80 aspect-[4/3] relative shrink-0"
                    >
                      {url.toLowerCase().endsWith('.mp4') ? (
                        <video src={url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" muted loop onMouseOver={(e) => e.target.play()} onMouseOut={(e) => e.target.pause()} />
                      ) : (
                        <img src={url} alt="Project Media" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      )}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-3xl">add_circle</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {lightbox.isOpen && (() => {
        const currentProject = projects.find(p => p.id === lightbox.projectId);
        if (!currentProject) return null;
        
        return (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm">
            <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2">
              <span className="material-symbols-outlined text-4xl">close</span>
            </button>
            <div className="absolute top-8 left-8 text-white/80 font-work-sans font-semibold tracking-wider text-sm z-50">
              {lightbox.imageIndex + 1} / {currentProject.images.length}
            </div>
            <button onClick={() => navigateLightbox(-1)} className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:scale-110 transition-all z-50 p-4">
              <span className="material-symbols-outlined text-5xl">chevron_left</span>
            </button>
            <button onClick={() => navigateLightbox(1)} className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:scale-110 transition-all z-50 p-4">
              <span className="material-symbols-outlined text-5xl">chevron_right</span>
            </button>
            <div className="relative w-full h-full max-w-6xl max-h-screen p-4 md:p-16 flex items-center justify-center" onClick={closeLightbox}>
               {currentProject.images[lightbox.imageIndex].toLowerCase().endsWith('.mp4') ? (
                 <video src={currentProject.images[lightbox.imageIndex]} controls autoPlay className="max-w-full max-h-full" onClick={(e) => e.stopPropagation()} />
               ) : (
                 <img src={currentProject.images[lightbox.imageIndex]} alt="Expanded View" className="max-w-full max-h-full object-contain" onClick={(e) => e.stopPropagation()} />
               )}
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default WorksDynamic;
