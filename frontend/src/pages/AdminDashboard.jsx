import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const [activeTab, setActiveTab] = useState('inquiries');

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [navigate, activeTab]);

  const fetchData = async () => {
    const token = localStorage.getItem('adminToken');
    setIsLoading(true);
    setError('');
    
    let endpoint = '';
    if (activeTab === 'inquiries') endpoint = '/api/admin/inquiries';
    else if (activeTab === 'works') endpoint = '/api/admin/projects';
    else if (activeTab === 'products') endpoint = '/api/admin/products';

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }
        setError(`Error ${response.status}: Failed to fetch data`);
      }
    } catch (err) {
      setError('Network error: Is the backend server running?');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    const token = localStorage.getItem('adminToken');
    let endpoint = '';
    if (activeTab === 'inquiries') endpoint = `/api/admin/inquiries/${id}`;
    else if (activeTab === 'works') endpoint = `/api/admin/projects/${id}`;
    else if (activeTab === 'products') endpoint = `/api/admin/products/${id}`;

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setItems(items.filter(item => item.id !== id));
        showToast('✅ DATA IS DELETED');
      } else {
        alert('Delete failed');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    let endpoint = '';
    let method = editingItem ? 'PUT' : 'POST';

    const payload = { ...formData };
    if (activeTab === 'works' || activeTab === 'products') {
      payload.images = JSON.stringify(formData.images || []);
    }

    if (activeTab === 'works') {
      endpoint = editingItem ? `/api/admin/projects/${editingItem.id}` : '/api/admin/projects';
    } else if (activeTab === 'products') {
      endpoint = editingItem ? `/api/admin/products/${editingItem.id}` : '/api/admin/products';
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchData();
        showToast(editingItem ? '✅ EDITED SUCCESSFULLY' : '✅ DATA IS SAVED');
      } else {
        const errData = await response.json();
        alert(`Save failed: ${errData.error || 'Unknown error'}`);
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const openModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      const images = typeof item.images === 'string' ? JSON.parse(item.images || '[]') : (item.images || []);
      setFormData({ ...item, images });
    } else {
      setFormData({
        title: '',
        name: '',
        description: '',
        images: []
      });
    }
    setIsModalOpen(true);
  };

  const handleFileUpload = async (files) => {
    const token = localStorage.getItem('adminToken');
    const uploadData = new FormData();
    files.forEach(file => uploadData.append('images', file));
    
    setIsUploading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/upload`, {

        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: uploadData
      });
      if (res.ok) {
        const { urls } = await res.json();
        setFormData(prev => ({
          ...prev,
          images: [...(prev.images || []), ...urls]
        }));
      } else {
        const errData = await res.json();
        alert(`Upload failed: ${errData.error || 'Server error'}`);
      }
    } catch (err) {
      console.error("Upload Error:", err);
      alert('Upload failed: Network error or server is down');
    } finally {
      setIsUploading(false);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-surface-container-low font-work-sans">
      {/* Toast Notification */}
      {successMessage && (
        <div className="fixed top-6 right-6 z-[200] bg-primary text-white px-8 py-4 shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-xl">check_circle</span>
          <span className="font-bold uppercase tracking-widest text-sm">{successMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-primary text-white py-4 px-6 lg:px-12 flex justify-between items-center shadow-lg sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
          <div>
            <h1 className="font-headline-sm text-headline-sm uppercase tracking-tighter leading-none">Patel Engineering Portal</h1>
            <p className="text-xs opacity-70 font-body-sm uppercase tracking-widest mt-1">Administrator Dashboard</p>
          </div>
        </div>
        <button onClick={handleLogout} className="bg-white/10 hover:bg-secondary text-white px-4 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all border border-white/20">
          Logout <span className="material-symbols-outlined text-sm">logout</span>
        </button>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 lg:px-10 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 shadow-xl border border-outline-variant">
              <h3 className="font-label-lg text-label-lg text-primary uppercase tracking-widest mb-6 border-b border-outline-variant pb-2">Management</h3>
              <nav className="space-y-3">
                {['inquiries', 'works', 'products'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full text-left p-4 text-xs font-bold uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === tab ? 'bg-secondary text-white shadow-lg translate-x-2' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}>
                    <span className="material-symbols-outlined text-sm">{tab === 'inquiries' ? 'mail' : tab === 'works' ? 'construction' : 'inventory_2'}</span> {tab}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-grow">
            <div className="bg-white shadow-2xl border border-outline-variant min-h-[600px]">
              <div className="p-6 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-center bg-surface-container-highest gap-4">
                <div className="flex items-center gap-4">
                  <h2 className="font-headline-sm text-headline-sm text-primary uppercase tracking-widest">{activeTab} Management</h2>
                  <button onClick={fetchData} className="p-2 hover:bg-primary/10 rounded-full transition-colors" title="Refresh List">
                    <span className={`material-symbols-outlined text-primary text-xl ${isLoading ? 'animate-spin' : ''}`}>refresh</span>
                  </button>
                </div>
                {activeTab !== 'inquiries' && (
                  <button onClick={() => openModal()} className="bg-primary text-white px-6 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-opacity-90 shadow-md">
                    <span className="material-symbols-outlined text-sm">add</span> Add New
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                {error && <div className="p-4 bg-red-50 text-red-700 text-xs text-center">{error}</div>}
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant">
                      {activeTab === 'inquiries' ? (
                        <>
                          <th className="p-6 font-label-lg uppercase tracking-[0.2em] text-primary w-40">Date</th>
                          <th className="p-6 font-label-lg uppercase tracking-[0.2em] text-primary w-72">Customer</th>
                          <th className="p-6 font-label-lg uppercase tracking-[0.2em] text-primary w-80">Contact Info</th>
                          <th className="p-6 font-label-lg uppercase tracking-[0.2em] text-primary">Message</th>
                          <th className="p-6 font-label-lg uppercase tracking-[0.2em] text-primary w-32 text-center">Actions</th>
                        </>
                      ) : (
                        <>
                          <th className="p-6 font-label-lg uppercase tracking-[0.2em] text-primary">Title / Name</th>
                          <th className="p-6 font-label-lg uppercase tracking-[0.2em] text-primary w-48 text-center">Media</th>
                          <th className="p-6 font-label-lg uppercase tracking-[0.2em] text-primary w-48 text-center">Actions</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {items.map(item => (
                      <tr key={item.id} className="hover:bg-surface-container-lowest group transition-colors">
                        {activeTab === 'inquiries' ? (
                          <>
                            <td className="p-6">
                              <div className="text-xs font-bold text-primary">{new Date(item.createdAt).toLocaleDateString()}</div>
                              <div className="text-[10px] opacity-60 mt-1">{new Date(item.createdAt).toLocaleTimeString()}</div>
                            </td>
                            <td className="p-6">
                              <div className="font-bold uppercase text-primary">{item.name}</div>
                              <div className="text-[10px] text-secondary font-black uppercase mt-1">{item.companyName || 'Individual'}</div>
                            </td>
                            <td className="p-6">
                              <div className="text-xs font-medium mb-1 truncate">{item.email}</div>
                              <div className="text-xs font-medium">{item.phone || 'N/A'}</div>
                            </td>
                            <td className="p-6 text-sm italic opacity-80">"{item.message}"</td>
                            <td className="p-6 text-center">
                              <button onClick={() => handleDelete(item.id)} className="p-2 text-on-surface-variant hover:text-secondary hover:bg-secondary/10 transition-all border border-outline-variant opacity-0 group-hover:opacity-100">
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="p-6">
                              <div className="font-bold uppercase text-primary text-base">{item.title || item.name}</div>
                              <div className="text-[10px] text-secondary font-black uppercase mt-1">{activeTab === 'works' ? 'Work Entry' : 'Product Entry'}</div>
                            </td>
                            <td className="p-6 text-center">
                              <span className="bg-surface-container px-3 py-1 text-xs font-bold border border-outline-variant">
                                {(typeof item.images === 'string' ? JSON.parse(item.images || '[]') : (item.images || [])).length} Items
                              </span>
                            </td>
                            <td className="p-6 flex justify-center gap-4">
                              <button onClick={() => openModal(item)} className="p-2 bg-primary/5 text-primary hover:bg-primary hover:text-white border border-primary/20 transition-all">
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                              </button>
                              <button onClick={() => handleDelete(item.id)} className="p-2 bg-secondary/5 text-secondary hover:bg-secondary hover:text-white border border-secondary/20 transition-all">
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full shadow-2xl p-8 border border-white">
            <div className="flex justify-between items-center mb-6 border-b border-outline-variant pb-4">
              <h2 className="font-headline-sm text-primary uppercase tracking-widest">Manage {activeTab}</h2>
              <button onClick={() => setIsModalOpen(false)}><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-2">Name / Title</label>
                <input 
                  className="w-full bg-surface-container-low border border-outline-variant py-4 px-5 text-sm outline-none focus:border-primary" 
                  value={activeTab === 'works' ? (formData.title || '') : (formData.name || '')} 
                  onChange={e => setFormData(activeTab === 'works' ? {...formData, title: e.target.value} : {...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-2">Description</label>
                <textarea 
                  className="w-full bg-surface-container-low border border-outline-variant py-4 px-5 text-sm outline-none focus:border-primary" 
                  rows="3"
                  value={formData.description || ''} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-4 border-b border-outline-variant pb-2">Media Uploads</label>
                <div className="space-y-4">
                  <input 
                    type="file" multiple accept="image/*,video/*"
                    onChange={(e) => handleFileUpload(Array.from(e.target.files))}
                    className="text-xs file:mr-4 file:py-2 file:px-6 file:border-0 file:bg-primary file:text-white cursor-pointer hover:file:bg-opacity-90"
                    disabled={isUploading}
                  />
                  {isUploading && <div className="text-secondary font-bold text-xs animate-pulse">📤 Uploading to Cloudinary... Please wait...</div>}
                  <div className="grid grid-cols-4 gap-4 max-h-60 overflow-y-auto p-4 border border-outline-variant bg-surface-container-low">

                    {(formData.images || []).map((url, idx) => (
                      <div key={idx} className="relative aspect-square bg-black overflow-hidden group">
                        {url.toLowerCase().endsWith('.mp4') ? <video src={url} className="w-full h-full object-cover opacity-70" /> : <img src={url} className="w-full h-full object-cover opacity-70" />}
                        <button type="button" onClick={() => setFormData({...formData, images: (formData.images || []).filter((_, i) => i !== idx)})} className="absolute top-1 right-1 bg-secondary text-white p-1 hover:bg-red-700 transition-colors">
                          <span className="material-symbols-outlined text-xs">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-grow bg-secondary text-white py-4 font-bold uppercase tracking-widest text-sm shadow-2xl hover:bg-opacity-90">SAVE</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-10 border border-outline-variant font-bold uppercase tracking-widest text-xs hover:bg-surface-container">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
