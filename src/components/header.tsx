import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
    const [open, setOpen] = useState(false);

    const closeNav = () => {
        if (open) setOpen(false);
    };

    const mobileNavToggle = () => {
        setOpen(!open);
    };

    return (
        <header className={open ? 'open-nav' : ''}>
            <div className="grid-d-12">
                <div className="top-header">
                    <div id="logo">
                        <h1>
                            <NavLink to="/dev" onClick={closeNav}>
                                Cory Fitzpatrick | Software Tech Lead
                            </NavLink>
                        </h1>
                    </div>
                    <div className="mobile-nav-link" onClick={mobileNavToggle}></div>
                </div>

                <nav>
                    <ul>
                        <li><NavLink to="/dev" onClick={closeNav}>Dev</NavLink></li>
                        <li><NavLink to="/design" onClick={closeNav}>Design</NavLink></li>
                        <li><NavLink to="/photo" onClick={closeNav}>Photo</NavLink></li>
                        <li><NavLink to="/about" onClick={closeNav}>About</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
