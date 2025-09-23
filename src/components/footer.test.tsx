import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Footer Component', () => {
  it('should render the footer element', () => {
    render(<Footer />);

    const footer = document.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  it('should render email link with correct attributes', () => {
    render(<Footer />);

    const emailLink = screen.getByRole('link', { name: /Email: coryartfitz@gmail.com/ });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:coryartfitz@gmail.com');
  });

  it('should render developer name', () => {
    render(<Footer />);

    expect(screen.getByText('Cory Fitzpatrick')).toBeInTheDocument();
  });

  it('should render current year in copyright', () => {
    const currentYear = new Date().getFullYear();

    render(<Footer />);

    expect(screen.getByText(`Copyright © ${currentYear}`)).toBeInTheDocument();
  });

  it('should have correct list structure', () => {
    render(<Footer />);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });

  it('should have correct IDs for list items', () => {
    render(<Footer />);

    const emailItem = document.querySelector('#email');
    const nameItem = document.querySelector('#footer-name');
    const copyrightItem = document.querySelector('#copy');

    expect(emailItem).toBeInTheDocument();
    expect(nameItem).toBeInTheDocument();
    expect(copyrightItem).toBeInTheDocument();
  });

  it('should have correct grid container structure', () => {
    render(<Footer />);

    const gridContainer = document.querySelector('.grid-d-12') as HTMLElement;
    expect(gridContainer).toBeInTheDocument();

    const footer = document.querySelector('footer') as HTMLElement;
    expect(footer).toContainElement(gridContainer);
  });

  it('should render email item with correct content and ID', () => {
    render(<Footer />);

    const emailItem = document.querySelector('#email');
    expect(emailItem).toHaveTextContent('Email: coryartfitz@gmail.com');
  });

  it('should render name item with correct content and ID', () => {
    render(<Footer />);

    const nameItem = document.querySelector('#footer-name');
    expect(nameItem).toHaveTextContent('Cory Fitzpatrick');
  });

  it('should render copyright item with correct content and ID', () => {
    const currentYear = new Date().getFullYear();

    render(<Footer />);

    const copyrightItem = document.querySelector('#copy');
    expect(copyrightItem).toHaveTextContent(`Copyright © ${currentYear}`);
  });

  it('should update copyright year dynamically', () => {
    const originalDate = global.Date;
    global.Date = class extends Date {
      constructor(...args: any[]) {
        if (args.length) {
          super(args[0]);
        } else {
          super('2030-01-01T00:00:00.000Z');
        }
      }

      static now() {
        return new Date('2030-01-01T00:00:00.000Z').getTime();
      }

      getFullYear() {
        return 2030;
      }
    } as any;

    render(<Footer />);

    expect(screen.getByText('Copyright © 2030')).toBeInTheDocument();

    global.Date = originalDate;
  });

  it('should have proper semantic structure', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer.tagName.toLowerCase()).toBe('footer');
  });

  it('should render all content within footer element', () => {
    render(<Footer />);

    const footer = document.querySelector('footer') as HTMLElement;
    const emailLink = screen.getByRole('link');
    const nameText = screen.getByText('Cory Fitzpatrick');
    const copyrightText = screen.getByText(/Copyright ©/);

    expect(footer).toContainElement(emailLink);
    expect(footer).toContainElement(nameText);
    expect(footer).toContainElement(copyrightText);
  });
});