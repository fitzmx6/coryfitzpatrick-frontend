import React from 'react';

export default class Footer extends React.Component {
	render() {
        return (
		    <footer>
			    <div className="grid-d-12">
			        <ul>
			            <li id="email"><a href="mailto:coryartfitz@gmail.com">Email: coryartfitz@gmail.com</a></li>
			            <li id="footer-name">Cory Fitzpatrick</li>
			            <li id="copy">Copyright © {new Date().getFullYear()}</li>
			        </ul>
			    </div>
			</footer>
        );
    }
}
