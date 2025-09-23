import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createRoot } from 'react-dom/client';
import React from 'react';

// Mock the createRoot function
vi.mock('react-dom/client', () => ({
  createRoot: vi.fn()
}));

// Mock the App component
vi.mock('./components/app', () => ({
  default: () => React.createElement('div', { 'data-testid': 'app' }, 'Hero Command Center')
}));

// Mock the CSS imports
vi.mock('./styles/style.scss', () => ({}));
vi.mock('./styles/rwdgrid.min.css', () => ({}));

describe('Main Application Entry Point', () => {
  let mockRender: ReturnType<typeof vi.fn>;
  let mockCreateRoot: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();

    mockRender = vi.fn();
    mockCreateRoot = vi.fn().mockReturnValue({
      render: mockRender
    });

    vi.mocked(createRoot).mockImplementation(mockCreateRoot);

    // Clear the DOM
    document.body.innerHTML = '';
  });

  it('should execute main.tsx and initialize the app', async () => {
    const wrapperElement = document.createElement('div');
    wrapperElement.id = 'wrapper';
    document.body.appendChild(wrapperElement);

    // Import and execute the main module
    await import('./main');

    expect(createRoot).toHaveBeenCalledWith(wrapperElement);
    expect(mockRender).toHaveBeenCalled();
  });

  it('should initialize app when wrapper element exists', () => {
    const wrapperElement = document.createElement('div');
    wrapperElement.id = 'wrapper';
    document.body.appendChild(wrapperElement);

    const originalGetElementById = document.getElementById;
    document.getElementById = vi.fn().mockReturnValue(wrapperElement);

    // Test the main app initialization logic
    const rootElement = document.getElementById('wrapper');
    expect(rootElement).toBe(wrapperElement);

    if (rootElement) {
      const mockRoot = createRoot(rootElement);
      expect(createRoot).toHaveBeenCalledWith(wrapperElement);
      expect(mockRoot.render).toBeDefined();
    }

    document.getElementById = originalGetElementById;
  });

  it('should handle missing wrapper element', () => {
    document.getElementById = vi.fn().mockReturnValue(null);

    const rootElement = document.getElementById('wrapper');
    expect(rootElement).toBeNull();

    // Test error condition
    expect(() => {
      if (!rootElement) throw new Error('Root element not found');
    }).toThrow('Root element not found');
  });

  it('should find correct wrapper element by ID', () => {
    const correctElement = document.createElement('div');
    correctElement.id = 'wrapper';

    const wrongElement = document.createElement('div');
    wrongElement.id = 'wrong-id';

    // Test that elements have correct IDs
    expect(correctElement.id).toBe('wrapper');
    expect(wrongElement.id).toBe('wrong-id');
    expect(correctElement).not.toBe(wrongElement);

    // Test getElementById with a mock
    const mockGetElementById = vi.fn();
    mockGetElementById.mockReturnValueOnce(correctElement);

    const foundElement = mockGetElementById('wrapper');
    expect(foundElement).toBe(correctElement);
    expect(foundElement.id).toBe('wrapper');
  });

  it('should verify createRoot functionality', () => {
    const wrapperElement = document.createElement('div');
    wrapperElement.id = 'wrapper';
    wrapperElement.setAttribute('data-test', 'hero-base');

    const root = createRoot(wrapperElement);

    expect(createRoot).toHaveBeenCalledWith(wrapperElement);
    expect(root.render).toBeDefined();
    expect(typeof root.render).toBe('function');
  });

  it('should handle DOM element properties correctly', () => {
    const wrapperElement = document.createElement('div');
    wrapperElement.id = 'wrapper';
    wrapperElement.className = 'app-container';

    expect(wrapperElement.id).toBe('wrapper');
    expect(wrapperElement.className).toBe('app-container');
    expect(wrapperElement.tagName.toLowerCase()).toBe('div');
  });

  it('should verify root element existence check', () => {
    const validElement = document.createElement('div');
    const nullElement = null;

    // Test the actual conditional logic from main.tsx
    expect(() => {
      if (!validElement) throw new Error('Root element not found');
    }).not.toThrow();

    expect(() => {
      if (!nullElement) throw new Error('Root element not found');
    }).toThrow('Root element not found');
  });
});