import React from 'react';
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
import Header from "./header";

export class RouterWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.scrollTop = this.scrollTop.bind(this);
    }

    scrollTop() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <Router onUpdate={this.scrollTop}>
                <div>
                    <Header />

                    <Switch>
                        <Route exact path="/dev" render={(props) => <CategoryList {...props} navToggle={this.closeNav} />} />
                        <Route exact path="/design" render={(props) => <CategoryList {...props} navToggle={this.closeNav} />} />
                        <Route exact path="/photo" render={(props) => <CategoryList {...props} navToggle={this.closeNav} />} />
                        <Route exact path="/about" component={AboutPage} />

                        <Route path="/:category/:slug" component={DetailItem} />

                        <Route exact path="/">
                            <Redirect to="/dev" />
                        </Route>

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
