import React from 'react';
import portfolioData from '../data/data.json';
import { NavLink } from 'react-router-dom';

// Category List View Component
export default class CategoryList extends React.Component {
    render() {
        let url = this.props.location.pathname;
        let category = url.replace(/[^\w\s]/gi, '');
        let items = portfolioData[category] || portfolioData.web;

        return (
            <div id="content">
                {items.map(item => (
                    <div key={item.name} className="grid-d-4 grid-t-6 grid-panel">
                        <NavLink to={item.url} onClick={this.props.navToggle}>
                            <figure>
                                <img src={item.thumbPath} title={item.imageTitle} alt={item.name} />

                                <figcaption>
                                    <h2>{item.name}</h2>
                                    <div className="view">View</div>
                                </figcaption>
                            </figure>
                        </NavLink>
                    </div>
                ))}
            </div>
        );
    }
}
