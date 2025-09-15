import React from 'react';

// About Page Component
export default class NotFound extends React.Component {
	componentDidMount() {
		document.body.className = 'not-found-bg';
	}

	componentWillUnmount() {
	    document.body.classList.remove('not-found-bg');
	  }

    render() {
        return (
        	<div id="not-found">
        		<h3><a href="https://en.wikipedia.org/wiki/Kilroy_was_here">Killroy</a> didn't find a page either</h3>
        		<h2>404</h2>

        		<img src="../images/killroy.svg" alt="Killroy" />
	        </div>
        );
    }
}
