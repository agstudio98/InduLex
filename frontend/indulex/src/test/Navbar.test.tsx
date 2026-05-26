import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../components/Navbar';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'es', changeLanguage: vi.fn() }
  })
}));

/**
 * Unit tests for the Navbar component
 */
describe('Navbar Component Unit Tests', () => {
  
  const toggleMode = vi.fn();

  /**
   * Helper function to render Navbar with necessary providers
   */
  const renderNavbar = (isNightMode = false) => {
    return render(
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar toggleMode={toggleMode} isNightMode={isNightMode} />
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    );
  };

  /**
   * Should render the brand logo
   */
  it('renders the brand logo InduLex', () => {
    renderNavbar();
    expect(screen.getByText('InduLex')).toBeInTheDocument();
  });

  /**
   * Should render main navigation links
   */
  it('renders main navigation links', () => {
    renderNavbar();
    expect(screen.getByText('NAVBAR.CATALOG')).toBeInTheDocument();
    expect(screen.getByText('SUPPORT.TITLE')).toBeInTheDocument();
  });

  /**
   * Should call toggleMode when theme button is clicked
   */
  it('calls toggleMode when clicking the theme toggle button', () => {
    renderNavbar();
    const themeButton = screen.getAllByRole('button').pop(); // The last button is usually the theme toggle based on current JSX
    if (themeButton) {
      fireEvent.click(themeButton);
      expect(toggleMode).toHaveBeenCalled();
    }
  });
});
