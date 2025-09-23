import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app';
import './styles/style.scss';
import './styles/rwdgrid.min.css';

const rootElement = document.getElementById('wrapper');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(<App />);
