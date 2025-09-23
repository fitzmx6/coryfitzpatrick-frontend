import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutPage from './about-page';

describe('AboutPage Component', () => {
  it('should render the About heading', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
  });

  it('should render Cory Fitzpatrick biography content', () => {
    render(<AboutPage />);

    expect(screen.getByText(/Cory Fitzpatrick is a seasoned Software Tech Lead/)).toBeInTheDocument();
    expect(screen.getByText(/VELYS Digital/)).toBeInTheDocument();
    expect(screen.getByText(/healthcare-connected applications/)).toBeInTheDocument();
  });

  it('should render technology stack links with correct attributes', () => {
    render(<AboutPage />);

    const createReactAppLink = screen.getByRole('link', { name: 'Create React App' });
    expect(createReactAppLink).toHaveAttribute('href', 'https://github.com/facebook/create-react-app');
    expect(createReactAppLink).toHaveAttribute('target', '_blank');
    expect(createReactAppLink).toHaveAttribute('rel', 'noopener noreferrer');

    const reactDomLink = screen.getByRole('link', { name: 'ReactDOM' });
    expect(reactDomLink).toHaveAttribute('href', 'https://reactjs.org/docs/react-dom.html');

    const reactRouterLink = screen.getByRole('link', { name: 'React Router' });
    expect(reactRouterLink).toHaveAttribute('href', 'https://reacttraining.com/react-router/web/guides/philosophy');

    const css3Link = screen.getByRole('link', { name: 'CSS3' });
    expect(css3Link).toHaveAttribute('href', 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3');

    const html5Link = screen.getByRole('link', { name: 'HTML5' });
    expect(html5Link).toHaveAttribute('href', 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5');

    const rwdgridLink = screen.getByRole('link', { name: 'RWDGRID' });
    expect(rwdgridLink).toHaveAttribute('href', 'http://www.rwdgrid.com/');
  });

  it('should render GitHub repository link', () => {
    render(<AboutPage />);

    const githubLink = screen.getByRole('link', { name: 'Check Out This Sites Code on Github' });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/fitzmx6/reactportfolio');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render LinkedIn profile link', () => {
    render(<AboutPage />);

    const linkedinLink = screen.getByRole('link', { name: /Cory.*LinkedIn Profile/ });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/coryfitzpatrick');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should have correct container structure and classes', () => {
    render(<AboutPage />);

    const container = document.querySelector('#sub-content.about') as HTMLElement;
    expect(container).toBeInTheDocument();

    const gridContainer = document.querySelector('.grid-d-12') as HTMLElement;
    expect(gridContainer).toBeInTheDocument();
    expect(container).toContainElement(gridContainer);
  });

  it('should render all biography paragraphs', () => {
    render(<AboutPage />);

    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs).toHaveLength(4); // 4 total paragraphs
  });

  it('should mention key professional highlights', () => {
    render(<AboutPage />);

    expect(screen.getByText(/Feature Team Two/)).toBeInTheDocument();
    expect(screen.getByText(/Sustaining Team/)).toBeInTheDocument();
    expect(screen.getByText(/MVPs under tight deadlines/)).toBeInTheDocument();
    expect(screen.getByText(/technical debt/)).toBeInTheDocument();
    expect(screen.getByText(/mentorship/)).toBeInTheDocument();
  });

  it('should mention deployment information', () => {
    render(<AboutPage />);

    expect(screen.getByText(/deployed by and hosted on Heroku/)).toBeInTheDocument();
  });
});