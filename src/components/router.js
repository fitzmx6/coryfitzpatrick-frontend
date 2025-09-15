import React from 'react';
import portfolioData from '../data/data.json';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect
} from 'react-router-dom';
import CategoryList from './category-list';
import DetailItem from './detail-item';
import AboutPage from './about-page';
import Footer from './footer';
import NotFound from './not-found';

export class RouterWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
        this.mobileNavToggle = this.mobileNavToggle.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.scrollTop = this.scrollTop.bind(this);
    }

    closeNav() {
        if (this.state.open) {
            this.setState({open: false});
        }
    }

    mobileNavToggle() {
        this.setState({open: !this.state.open});
    }

    scrollTop() {
        window.scrollTo(0, 0);
    }

    render() {
        const categories = [portfolioData.dev, portfolioData.design, portfolioData.photo];

        return (
            <Router onUpdate={this.scrollTop}>
                <div>
                    <header className={(this.state.open ? "open-nav" : "")}>
                        <div className="grid-d-12">
                            <div className="top-header">
                                <div id="logo">
                                    <h1><NavLink to={"/dev"} onClick={this.closeNav}>Cory Fitzpatrick | Software Tech Lead</NavLink></h1>
                                </div>

                                <div className="mobile-nav-link" onClick={this.mobileNavToggle}></div>
                            </div>

                            <nav>
                                <ul>
                                    <li><NavLink to={"/dev"} onClick={this.closeNav}>Dev</NavLink></li>
                                    <li><NavLink to={"/design"} onClick={this.closeNav}>Design</NavLink></li>
                                    <li><NavLink to={"/photo"} onClick={this.closeNav}>Photo</NavLink></li>
                                    <li><NavLink to={"/about"} onClick={this.closeNav}>About</NavLink></li>
                                </ul>
                            </nav>
                        </div>
                    </header>

                    <Switch>
                        <Route exact path="/dev" render={(props) => <CategoryList {...props} navToggle={this.closeNav} />} />
                        <Route exact path="/design" render={(props) => <CategoryList {...props} navToggle={this.closeNav} />} />
                        <Route exact path="/photo" render={(props) => <CategoryList {...props} navToggle={this.closeNav} />} />
                        <Route exact path="/about" component={AboutPage}/>

                        {
                            /* 
                                Routes for all detail pages

                                This loops through each of the portfolio categories
                                and then loops through all the projects in a given category
                            */
                            categories.map(category => (
                                category.map(item => (
                                    <Route exact path={item.url} component={DetailItem}/>
                                ))
                            ))
                        }

                        <Route exact path="/">
                            <Redirect to="/dev" />
                        </Route>
                        { /*This is to handle any indexed /web search results*/ }
                        <Route exact path="/web">
                            <Redirect to="/dev" />
                        </Route>

                        <Route path="*" component={NotFound} />
                    </Switch>

                    <Footer />
                </div>
            </Router>
        );
    }
}

export default RouterWrapper;
