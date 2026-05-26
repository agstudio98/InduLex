import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Support } from './pages/Support';
import { User } from './pages/User';
import { GestorUser } from './components/GestorUser';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { CheckoutModal } from './components/CheckoutModal';

/**
 * App Component
 * 
 * The root component of the InduLex application.
 * It establishes the global application structure, including:
 * - Theme management (Dark/Night mode)
 * - Global context providers (Toast, Auth, Cart)
 * - Routing configuration using React Router
 * - Layout wrapper with Navbar and Footer
 * 
 * @returns {JSX.Element} The initialized application
 */
function App() {
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    if (isNightMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isNightMode]);

  const toggleMode = () => setIsNightMode(!isNightMode);

  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
            <Navbar toggleMode={toggleMode} isNightMode={isNightMode} />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/support" element={<Support />} />
                <Route path="/user" element={<User />} />
                <Route path="/profile" element={<GestorUser />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
        <CheckoutModal />
      </CartProvider>
    </AuthProvider>
    </ToastProvider>
    );
    }

    export default App;