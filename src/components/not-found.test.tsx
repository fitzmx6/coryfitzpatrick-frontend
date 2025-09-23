import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import NotFound from './not-found';

describe('NotFound Component', () => {
  beforeEach(() => {
    document.body.className = '';
  });

  afterEach(() => {
    cleanup();
    document.body.classList.remove('not-found-bg');
  });

  it('should render 404 message and Killroy reference', () => {
    render(<NotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Killroy')).toBeInTheDocument();
    expect(screen.getByText("didn't find a page either")).toBeInTheDocument();
  });

  it('should render Killroy image with correct alt text', () => {
    render(<NotFound />);

    const image = screen.getByAltText('Killroy');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '../images/killroy.svg');
  });

  it('should render Wikipedia link for Killroy', () => {
    render(<NotFound />);

    const killroyLink = screen.getByRole('link', { name: 'Killroy' });
    expect(killroyLink).toBeInTheDocument();
    expect(killroyLink).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Kilroy_was_here');
  });

  it('should add not-found-bg class to body on mount', () => {
    expect(document.body.classList.contains('not-found-bg')).toBe(false);

    render(<NotFound />);

    expect(document.body.classList.contains('not-found-bg')).toBe(true);
  });

  it('should remove not-found-bg class from body on unmount', () => {
    const { unmount } = render(<NotFound />);
    expect(document.body.classList.contains('not-found-bg')).toBe(true);

    unmount();

    expect(document.body.classList.contains('not-found-bg')).toBe(false);
  });

  it('should have correct container structure', () => {
    render(<NotFound />);

    const container = document.querySelector('#not-found') as HTMLElement;
    expect(container).toBeInTheDocument();

    const heading404 = screen.getByText('404');
    const killroyLink = screen.getByText('Killroy');
    const image = screen.getByAltText('Killroy');

    expect(container).toContainElement(heading404);
    expect(container).toContainElement(killroyLink);
    expect(container).toContainElement(image);
  });

  it('should handle multiple mounts and unmounts correctly', () => {
    const { unmount: unmount1 } = render(<NotFound />);
    expect(document.body.classList.contains('not-found-bg')).toBe(true);

    unmount1();
    expect(document.body.classList.contains('not-found-bg')).toBe(false);

    const { unmount: unmount2 } = render(<NotFound />);
    expect(document.body.classList.contains('not-found-bg')).toBe(true);

    unmount2();

    expect(document.body.classList.contains('not-found-bg')).toBe(false);
  });
});