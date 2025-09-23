import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getContentByCategory, getContentByUrl, ContentItem } from './api';

describe('API Functions', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('getContentByCategory', () => {
    it('should return content items when API responds successfully', async () => {
      const mockData: ContentItem[] = [
        {
          id: 1,
          category: 'dev',
          name: 'Hero Command Center',
          description: 'An awesome superhero control system',
          url: '/dev/hero-command-center',
          thumbnailImage: '/images/hero-control.jpg'
        }
      ];
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockData)
      } as any;

      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const result = await getContentByCategory('dev');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/content/category?category=dev'
      );
      expect(result).toEqual(mockData);
    });

    it('should handle URL encoding for category parameter', async () => {
      const mockData: ContentItem[] = [];
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockData)
      } as any;

      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      await getContentByCategory('super hero powers');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/content/category?category=super%20hero%20powers'
      );
    });

    it('should throw an error when API response is not ok', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: vi.fn().mockResolvedValue({ error: 'Heroes are busy saving the world' })
      } as any;

      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      await expect(getContentByCategory('dev')).rejects.toThrow('Heroes are busy saving the world');
    });

    it('should throw an error when fetch fails', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      await expect(getContentByCategory('dev')).rejects.toThrow('Network error');
    });
  });

  describe('getContentByUrl', () => {
    it('should return content item when API responds successfully', async () => {
      const mockData: ContentItem = {
        id: 1,
        category: 'dev',
        name: 'Power Tracker Pro',
        description: 'Track superhero abilities and stats',
        url: '/dev/power-tracker-pro',
        thumbnailImage: '/images/power-tracker.jpg'
      };
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockData)
      } as any;

      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const result = await getContentByUrl('/dev/power-tracker-pro');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/content/item?url=%2Fdev%2Fpower-tracker-pro'
      );
      expect(result).toEqual(mockData);
    });

    it('should return null when API responds with 404', async () => {
      const mockResponse = {
        ok: false,
        status: 404
      } as any;

      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const result = await getContentByUrl('/dev/secret-villain-project');


      expect(result).toBeNull();
    });

    it('should handle URL encoding for url parameter', async () => {
      const mockData: ContentItem = {
        id: 1,
        category: 'dev',
        name: 'Super Hero Academy',
        description: 'Training center for new heroes',
        url: '/dev/super hero academy',
        thumbnailImage: '/images/academy.jpg'
      };
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockData)
      } as any;

      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      await getContentByUrl('/dev/super hero academy');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/content/item?url=%2Fdev%2Fsuper%20hero%20academy'
      );
    });

    it('should throw an error when API response is not ok (non-404)', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: vi.fn().mockResolvedValue({ error: 'Villain attack on servers' })
      } as any;

      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      await expect(getContentByUrl('/dev/hero-base')).rejects.toThrow('Villain attack on servers');
    });

    it('should throw an error when fetch fails', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      await expect(getContentByUrl('/dev/hero-network')).rejects.toThrow('Network error');
    });
  });
});