import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import CategoryList from "./category-list";
import DetailItem from "./detail-item";
import AboutPage from "./about-page";
import Footer from "./footer";
import NotFound from "./not-found";
import Header from "./header";

interface Props {}
interface State {}

export default class RouterWrapper extends React.Component<Props, State> {
    scrollTop = () => {
        window.scrollTo(0, 0);
    };

    render() {
        return (
            <Router>
                <div>
                    <Header />

                    <Switch>
                        <Route exact path="/dev"
                            render={(props) => <CategoryList {...props} navToggle={this.scrollTop} />}
                        />
                        <Route exact path="/design"
                            render={(props) => <CategoryList {...props} navToggle={this.scrollTop} />}
                        />
                        <Route exact path="/photo"
                            render={(props) => <CategoryList {...props} navToggle={this.scrollTop} />}
                        />
                        <Route exact path="/about" component={AboutPage} />

                        <Route path="/:category/:slug" component={DetailItem} />

                        <Route exact path="/" render={() => <Redirect to="/dev" />} />
                        <Route exact path="/web" render={() => <Redirect to="/dev" />} />

                        {/* 404 route */}
                        <Route component={NotFound} />
                    </Switch>

                    <Footer />
                </div>
            </Router>
        );
    }
}
