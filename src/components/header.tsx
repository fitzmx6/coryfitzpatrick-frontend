import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

interface HeaderState {
    open: boolean;
}

interface HeaderProps {}

export default class Header extends Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);
        this.state = { open: false };
        this.mobileNavToggle = this.mobileNavToggle.bind(this);
        this.closeNav = this.closeNav.bind(this);
    }

    closeNav() {
        if (this.state.open) this.setState({ open: false });
    }

    mobileNavToggle() {
        this.setState({ open: !this.state.open });
    }

    render() {
        return (
            <header className={this.state.open ? 'open-nav' : ''}>
                <div className="grid-d-12">
                    <div className="top-header">
                        <div id="logo">
                            <h1>
                                <NavLink to="/dev" onClick={this.closeNav}>
                                    Cory Fitzpatrick | Software Tech Lead
                                </NavLink>
                            </h1>
                        </div>
                        <div className="mobile-nav-link" onClick={this.mobileNavToggle}></div>
                    </div>

                    <nav>
                        <ul>
                            <li><NavLink to="/dev" onClick={this.closeNav}>Dev</NavLink></li>
                            <li><NavLink to="/design" onClick={this.closeNav}>Design</NavLink></li>
                            <li><NavLink to="/photo" onClick={this.closeNav}>Photo</NavLink></li>
                            <li><NavLink to="/about" onClick={this.closeNav}>About</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}
