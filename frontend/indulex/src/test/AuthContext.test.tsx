import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { describe, it, expect, beforeEach } from 'vitest';

/**
 * Test component to consume the AuthContext
 */
const TestComponent = () => {
  const { user, isLoggedIn, login, logout } = useAuth();
  return (
    <div>
      <div data-testid="status">{isLoggedIn ? 'logged-in' : 'logged-out'}</div>
      <div data-testid="user">{user?.nombre || 'no-user'}</div>
      <button onClick={() => login({ _id: '1', nombre: 'Test User', email: 'test@test.com' })}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

/**
 * Unit tests for the AuthContext
 */
describe('AuthContext Unit Tests', () => {
  
  beforeEach(() => {
    localStorage.clear();
  });

  /**
   * Should have initial logged-out state
   */
  it('should have initial logged-out state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByTestId('status')).toHaveTextContent('logged-out');
    expect(screen.getByTestId('user')).toHaveTextContent('no-user');
  });

  /**
   * Should login successfully
   */
  it('should update state after login', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    await act(async () => {
      screen.getByText('Login').click();
    });

    expect(screen.getByTestId('status')).toHaveTextContent('logged-in');
    expect(screen.getByTestId('user')).toHaveTextContent('Test User');
    expect(localStorage.getItem('indulex_user')).toContain('Test User');
  });

  /**
   * Should logout successfully
   */
  it('should update state after logout', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    await act(async () => {
      screen.getByText('Login').click();
    });
    
    await act(async () => {
      screen.getByText('Logout').click();
    });

    expect(screen.getByTestId('status')).toHaveTextContent('logged-out');
    expect(localStorage.getItem('indulex_user')).toBeNull();
  });
});
