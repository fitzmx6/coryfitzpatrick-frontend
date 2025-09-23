import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CategoryList from "./category-list";
import DetailItem from "./detail-item";
import AboutPage from "./about-page";
import Footer from "./footer";
import NotFound from "./not-found";
import Header from "./header";

const App: React.FC = () => {
    const scrollTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <Router>
            <div>
                <Header />

                <Routes>
                    <Route
                        path="/dev"
                        element={<CategoryList navToggle={scrollTop} />}
                    />
                    <Route
                        path="/design"
                        element={<CategoryList navToggle={scrollTop} />}
                    />
                    <Route
                        path="/photo"
                        element={<CategoryList navToggle={scrollTop} />}
                    />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/:category/:slug" element={<DetailItem />} />
                    <Route path="/" element={<Navigate to="/dev" replace />} />
                    <Route path="/web" element={<Navigate to="/dev" replace />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>

                <Footer />
            </div>
        </Router>
    );
};

export default App;
