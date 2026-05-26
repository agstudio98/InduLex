import { render, screen } from '@testing-library/react';
import { Footer } from '../components/Footer';
import { describe, it, expect, vi } from 'vitest';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'FOOTER.DESC': 'Mock Description',
        'FOOTER.NEW_COLLECTION': 'New Collection',
        'FOOTER.SIZE_GUIDE': 'Size Guide',
        'FOOTER.SUSTAINABILITY': 'Sustainability',
        'FOOTER.CREDITS': 'Developed by Mock'
      };
      return translations[key] || key;
    }
  })
}));

/**
 * Unit tests for the Footer component
 */
describe('Footer Component Unit Tests', () => {
  
  /**
   * Should render the brand name
   */
  it('renders the brand name InduLex', () => {
    render(<Footer />);
    expect(screen.getByText('InduLex')).toBeInTheDocument();
  });

  /**
   * Should render translation-based description
   */
  it('renders the translated description', () => {
    render(<Footer />);
    expect(screen.getByText('Mock Description')).toBeInTheDocument();
  });

  /**
   * Should render links
   */
  it('renders footer navigation links', () => {
    render(<Footer />);
    expect(screen.getByText('New Collection')).toBeInTheDocument();
    expect(screen.getByText('Size Guide')).toBeInTheDocument();
    expect(screen.getByText('Sustainability')).toBeInTheDocument();
  });

  /**
   * Should render social media links
   */
  it('renders social media links', () => {
    render(<Footer />);
    expect(screen.getByText('Instagram')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByText('Facebook')).toBeInTheDocument();
  });
});
