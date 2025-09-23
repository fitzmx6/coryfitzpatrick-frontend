import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock environment variables
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_API_URL: 'http://localhost:8080',
  },
  writable: true,
});

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Global mocks
global.fetch = vi.fn();

beforeAll(() => {
  // Mock window.scrollTo
  Object.defineProperty(window, 'scrollTo', {
    value: vi.fn(),
    writable: true,
  });
});

afterAll(() => {
  vi.restoreAllMocks();
});