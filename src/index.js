import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/router';
import './styles/style.css';
import './styles/rwdgrid.min.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router />, document.getElementById('wrapper'));

registerServiceWorker();
