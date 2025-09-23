import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DetailItem from './detail-item';
import * as api from '../js/api';

const DetailItemWithRouter = ({ path = '/dev/test-project' }: { path?: string }) => (
  <MemoryRouter initialEntries={[path]}>
    <DetailItem />
  </MemoryRouter>
);

// Mock the API module
vi.mock('../js/api');

// Mock the NotFound component
vi.mock('./not-found', () => ({
  default: () => <div>Page Not Found</div>
}));

describe('DetailItem Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should show loading state initially', () => {
    vi.mocked(api.getContentByUrl).mockImplementation(() => new Promise(() => {}));

    render(<DetailItemWithRouter />);

    expect(screen.getByText('Loading content...')).toBeInTheDocument();
  });

  it('should display content item when API call succeeds', async () => {
    const mockItem = {
      id: 1,
      category: 'dev',
      name: 'Hero Command Center',
      description: 'This is an awesome superhero project with <strong>powers</strong>',
      url: '/dev/hero-command-center',
      thumbnailImage: '/images/hero.jpg'
    };

    vi.mocked(api.getContentByUrl).mockResolvedValue(mockItem);

    render(<DetailItemWithRouter />);

    await waitFor(() => {
      expect(screen.getByText('Hero Command Center')).toBeInTheDocument();
    });

    expect(screen.getByText('powers')).toBeInTheDocument();
  });

  it('should display content item with video when videoUrl is provided', async () => {
    const mockItem = {
      id: 1,
      category: 'dev',
      name: 'Super Training Videos',
      description: 'Watch heroes train their abilities',
      url: '/dev/super-training',
      videoUrl: 'hero-training',
      thumbnailImage: '/images/training.jpg'
    };

    vi.mocked(api.getContentByUrl).mockResolvedValue(mockItem);

    render(<DetailItemWithRouter />);

    await waitFor(() => {
      expect(screen.getByText('Super Training Videos')).toBeInTheDocument();
    });

    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();

    const webmSource = document.querySelector('source[type*="webm"]');
    const mp4Source = document.querySelector('source[type*="mp4"]');

    expect(webmSource).toHaveAttribute('src', '/video/hero-training.webm');
    expect(mp4Source).toHaveAttribute('src', '/video/hero-training.mp4');
  });

  it('should display content item with images when images are provided', async () => {
    const mockItem = {
      id: 1,
      category: 'dev',
      name: 'Hero Gallery',
      description: 'Amazing superhero photo collection',
      url: '/dev/hero-gallery',
      images: ['/images/hero1.jpg', '/images/hero2.jpg'],
      thumbnailImage: '/images/gallery.jpg'
    };

    vi.mocked(api.getContentByUrl).mockResolvedValue(mockItem);

    render(<DetailItemWithRouter />);

    await waitFor(() => {
      expect(screen.getByText('Hero Gallery')).toBeInTheDocument();
    });

    const images = screen.getAllByAltText('Hero Gallery');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', '/images/hero1.jpg');
    expect(images[1]).toHaveAttribute('src', '/images/hero2.jpg');
  });

  it('should display error message when API call fails', async () => {
    const errorMessage = 'Heroes are busy saving the world';
    vi.mocked(api.getContentByUrl).mockRejectedValue(new Error(errorMessage));

    render(<DetailItemWithRouter />);

    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });
  });

  it('should display NotFound component when API returns null', async () => {
    vi.mocked(api.getContentByUrl).mockResolvedValue(null);

    render(<DetailItemWithRouter />);

    await waitFor(() => {
      expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    });
  });

  it('should call API with correct URL parameter', async () => {
    vi.mocked(api.getContentByUrl).mockResolvedValue(null);

    render(<DetailItemWithRouter path="/design/super-suit-design" />);

    await waitFor(() => {
      expect(api.getContentByUrl).toHaveBeenCalledWith('/design/super-suit-design');
    });
  });

  it('should not render video section when videoUrl is not provided', async () => {
    const mockItem = {
      id: 1,
      category: 'dev',
      name: 'Hero Dashboard',
      description: 'A dashboard without video content',
      url: '/dev/hero-dashboard',
      thumbnailImage: '/images/dashboard.jpg'
    };

    vi.mocked(api.getContentByUrl).mockResolvedValue(mockItem);

    render(<DetailItemWithRouter />);

    await waitFor(() => {
      expect(screen.getByText('Hero Dashboard')).toBeInTheDocument();
    });

    const video = document.querySelector('video');
    expect(video).not.toBeInTheDocument();
  });

  it('should not render images section when images array is empty', async () => {
    const mockItem = {
      id: 1,
      category: 'dev',
      name: 'Secret Project',
      description: 'A classified superhero project',
      url: '/dev/secret-project',
      images: [],
      thumbnailImage: '/images/classified.jpg'
    };

    vi.mocked(api.getContentByUrl).mockResolvedValue(mockItem);

    render(<DetailItemWithRouter />);

    await waitFor(() => {
      expect(screen.getByText('Secret Project')).toBeInTheDocument();
    });

    const imagesDiv = document.querySelector('.images');
    expect(imagesDiv).not.toBeInTheDocument();
  });
});