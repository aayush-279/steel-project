import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/ProductsDynamic';
import Works from './pages/WorksDynamic';
import Clients from './pages/Clients';
import Contact from './pages/Contact';
import Quality from './pages/Quality';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Global Scroll to Top Component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smoothly animate the page scroll to the very top whenever the route changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      <div className="App bg-background min-h-screen flex flex-col">
        {!isAdminPage && <Header />}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/works" element={<Works />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quality-standards" element={<Quality />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
        {!isAdminPage && <Footer />}
      </div>
    </>
  );
}

export default App;
