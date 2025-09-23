import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './header';

const HeaderWithRouter = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);

describe('Header Component', () => {
  it('should render logo and navigation links', () => {
    render(<HeaderWithRouter />);

    const logo = screen.getByText('Cory Fitzpatrick | Software Tech Lead');
    const devLink = screen.getByText('Dev');
    const designLink = screen.getByText('Design');
    const photoLink = screen.getByText('Photo');
    const aboutLink = screen.getByText('About');

    expect(logo).toBeInTheDocument();
    expect(devLink).toBeInTheDocument();
    expect(designLink).toBeInTheDocument();
    expect(photoLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  });

  it('should not have open-nav class initially', () => {
    render(<HeaderWithRouter />);

    const header = document.querySelector('header') as HTMLElement;

    expect(header).not.toHaveClass('open-nav');
  });

  it('should toggle mobile navigation when mobile nav button is clicked', () => {
    render(<HeaderWithRouter />);
    const mobileNavButton = document.querySelector('.mobile-nav-link') as HTMLElement;
    const header = document.querySelector('header') as HTMLElement;

    fireEvent.click(mobileNavButton);

    expect(header).toHaveClass('open-nav');

    fireEvent.click(mobileNavButton);

    expect(header).not.toHaveClass('open-nav');
  });

  it('should close navigation when a nav link is clicked', () => {
    render(<HeaderWithRouter />);
    const mobileNavButton = document.querySelector('.mobile-nav-link') as HTMLElement;
    const header = document.querySelector('header') as HTMLElement;
    const devLink = screen.getByText('Dev');

    fireEvent.click(mobileNavButton);
    expect(header).toHaveClass('open-nav');

    fireEvent.click(devLink);

    expect(header).not.toHaveClass('open-nav');
  });

  it('should close navigation when logo is clicked', () => {
    render(<HeaderWithRouter />);
    const mobileNavButton = document.querySelector('.mobile-nav-link') as HTMLElement;
    const header = document.querySelector('header') as HTMLElement;
    const logo = screen.getByText('Cory Fitzpatrick | Software Tech Lead');

    fireEvent.click(mobileNavButton);
    expect(header).toHaveClass('open-nav');

    fireEvent.click(logo);

    expect(header).not.toHaveClass('open-nav');
  });

  it('should not close navigation if already closed when nav link is clicked', () => {
    render(<HeaderWithRouter />);
    const devLink = screen.getByText('Dev');
    const header = document.querySelector('header') as HTMLElement;

    expect(header).not.toHaveClass('open-nav');
    fireEvent.click(devLink);

    expect(header).not.toHaveClass('open-nav');
  });

  it('should have correct navigation links', () => {
    render(<HeaderWithRouter />);

    const devLink = screen.getByRole('link', { name: 'Dev' });
    const designLink = screen.getByRole('link', { name: 'Design' });
    const photoLink = screen.getByRole('link', { name: 'Photo' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const logoLink = screen.getByRole('link', { name: 'Cory Fitzpatrick | Software Tech Lead' });

    expect(devLink).toHaveAttribute('href', '/dev');
    expect(designLink).toHaveAttribute('href', '/design');
    expect(photoLink).toHaveAttribute('href', '/photo');
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(logoLink).toHaveAttribute('href', '/dev');
  });
});