import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CategoryList from './category-list';
import * as api from '../js/api';

const mockNavToggle = vi.fn();

const CategoryListWithRouter = ({ path = '/dev' }: { path?: string }) => (
  <MemoryRouter initialEntries={[path]}>
    <CategoryList navToggle={mockNavToggle} />
  </MemoryRouter>
);

// Mock the API module
vi.mock('../js/api');

describe('CategoryList Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should show loading state initially', () => {
    vi.mocked(api.getContentByCategory).mockImplementation(() => new Promise(() => {}));

    render(<CategoryListWithRouter />);

    expect(screen.getByText('Loading dev content...')).toBeInTheDocument();
  });

  it('should display superhero projects when API call succeeds', async () => {
    const mockItems = [
      {
        id: 1,
        category: 'dev',
        name: 'Hero Dashboard',
        description: 'Cool superhero project',
        url: '/dev/hero-dashboard',
        thumbnailImage: '/images/hero1.jpg'
      },
      {
        id: 2,
        category: 'dev',
        name: 'Power Tracker',
        description: 'Track amazing abilities',
        url: '/dev/power-tracker',
        thumbnailImage: '/images/hero2.jpg'
      }
    ];

    vi.mocked(api.getContentByCategory).mockResolvedValue(mockItems);

    render(<CategoryListWithRouter />);

    await waitFor(() => {
      expect(screen.getByText('Hero Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Power Tracker')).toBeInTheDocument();
    });

    expect(screen.getAllByText('View')).toHaveLength(2);
  });

  it('should display error message when something goes wrong', async () => {
    const errorMessage = 'Oops, something went wrong!';
    vi.mocked(api.getContentByCategory).mockRejectedValue(new Error(errorMessage));

    render(<CategoryListWithRouter />);

    await waitFor(() => {
      expect(screen.getByText(`Error loading content: ${errorMessage}`)).toBeInTheDocument();
    });
  });

  it('should display no content message when heroes are busy', async () => {
    vi.mocked(api.getContentByCategory).mockResolvedValue([]);

    render(<CategoryListWithRouter />);

    await waitFor(() => {
      expect(screen.getByText('No content found for "dev".')).toBeInTheDocument();
    });
  });

  it('should handle broken images with Killroy fallback', async () => {
    const mockItems = [
      {
        id: 1,
        category: 'dev',
        name: 'Super Project',
        description: 'An awesome project',
        url: '/dev/super-project',
        thumbnailImage: '/images/broken.jpg'
      }
    ];

    vi.mocked(api.getContentByCategory).mockResolvedValue(mockItems);

    render(<CategoryListWithRouter />);

    await waitFor(() => {
      expect(screen.getByText('Super Project')).toBeInTheDocument();
    });

    const image = screen.getByAltText('Super Project') as HTMLImageElement;

    const errorEvent = new Event('error');
    Object.defineProperty(errorEvent, 'currentTarget', {
      value: image,
      writable: true
    });

    image.dispatchEvent(errorEvent);

    expect(image.src).toBe('http://localhost:3000/images/killroy.svg');
  });

  it('should call API with correct category parameter', async () => {
    vi.mocked(api.getContentByCategory).mockResolvedValue([]);

    render(<CategoryListWithRouter />);

    await waitFor(() => {
      expect(api.getContentByCategory).toHaveBeenCalledWith('dev');
    });
  });

  it('should create proper links to project details', async () => {
    const mockItems = [
      {
        id: 1,
        category: 'dev',
        name: 'Cool App',
        description: 'A really cool app',
        url: '/dev/cool-app',
        thumbnailImage: '/images/app.jpg'
      }
    ];

    vi.mocked(api.getContentByCategory).mockResolvedValue(mockItems);

    render(<CategoryListWithRouter />);

    await waitFor(() => {
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/dev/cool-app');
    });
  });
});