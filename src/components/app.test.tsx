import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Store initial path for tests
let testInitialPath = '/dev';

// Mock react-router-dom to use MemoryRouter instead of BrowserRouter
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal() as typeof import('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => {
      const { MemoryRouter } = actual;
      return React.createElement(MemoryRouter, {
        initialEntries: [testInitialPath]
      }, children);
    },
  };
});

// Mock all the child components
vi.mock('./header', () => ({
  default: () => <div data-testid="header">Header Component</div>
}));

vi.mock('./footer', () => ({
  default: () => <div data-testid="footer">Footer Component</div>
}));

vi.mock('./category-list', () => ({
  default: ({ navToggle }: { navToggle: () => void }) => (
    <div data-testid="category-list" onClick={navToggle}>
      Category List Component
    </div>
  )
}));

vi.mock('./detail-item', () => ({
  default: () => <div data-testid="detail-item">Detail Item Component</div>
}));

vi.mock('./about-page', () => ({
  default: () => <div data-testid="about-page">About Page Component</div>
}));

vi.mock('./not-found', () => ({
  default: () => <div data-testid="not-found">Not Found Component</div>
}));

// Import the actual App component after mocking
import App from './app';

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

describe('App Component', () => {
  it('should render the actual App component', () => {
    render(<App />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('category-list')).toBeInTheDocument();
  });

  it('should handle scrollTop function correctly', () => {
    render(<App />);

    const categoryList = screen.getByTestId('category-list');
    categoryList.click();

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});

describe('Routing Behavior', () => {
  it('should render CategoryList component for /dev route', () => {
    testInitialPath = '/dev';
    render(<App />);

    expect(screen.getByTestId('category-list')).toBeInTheDocument();
  });

  it('should render CategoryList component for /design route', () => {
    testInitialPath = '/design';
    render(<App />);

    expect(screen.getByTestId('category-list')).toBeInTheDocument();
  });

  it('should render CategoryList component for /photo route', () => {
    testInitialPath = '/photo';
    render(<App />);

    expect(screen.getByTestId('category-list')).toBeInTheDocument();
  });

  it('should render AboutPage component for /about route', () => {
    testInitialPath = '/about';
    render(<App />);

    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });

  it('should render DetailItem component for category/slug routes', () => {
    testInitialPath = '/dev/hero-dashboard';
    render(<App />);

    expect(screen.getByTestId('detail-item')).toBeInTheDocument();
  });

  it('should redirect from root path to /dev', () => {
    testInitialPath = '/';
    render(<App />);

    expect(screen.getByTestId('category-list')).toBeInTheDocument();
  });

  it('should redirect from /web to /dev', () => {
    testInitialPath = '/web';
    render(<App />);

    expect(screen.getByTestId('category-list')).toBeInTheDocument();
  });

  it('should render NotFound component for unknown routes', () => {
    testInitialPath = '/secret-villain-lair';
    render(<App />);

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });

  it('should pass scrollTop function to CategoryList components', () => {
    testInitialPath = '/dev';
    render(<App />);

    const categoryList = screen.getByTestId('category-list');

    categoryList.click();

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('should render header and footer on all routes', () => {
    testInitialPath = '/dev';
    render(<App />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});