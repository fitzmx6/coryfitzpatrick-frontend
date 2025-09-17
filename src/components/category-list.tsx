import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getContentByCategory } from '../js/api';

interface ContentItem {
    id: number;
    name: string;
    url: string;
    thumbnailImage: string;
}

interface CategoryListProps {
    navToggle: () => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ navToggle }) => {
    const [items, setItems] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();

    const category = location.pathname.substring(1);

    useEffect(() => {
        if (!category) return;

        (async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await getContentByCategory(category);
                setItems(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [category]);

    if (loading) {
        return (
            <div id="content">
                <div className="grid-d-12">
                    <div className="loading">Loading {category} content...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div id="content">
                <div className="grid-d-12">
                    <div className="error">Error loading content: {error}</div>
                </div>
            </div>
        );
    }

    if (!items.length) {
        return (
            <div id="content">
                <div className="grid-d-12">
                    <div>No content found for "{category}".</div>
                </div>
            </div>
        );
    }

    return (
        <div id="content">
            {items.map(item => (
                <div key={item.id || item.name} className="grid-d-4 grid-t-6 grid-panel">
                    <Link to={item.url} onClick={navToggle}>
                        <figure>
                            <img
                                src={item.thumbnailImage}
                                alt={item.name}
                                onError={(e) => { e.currentTarget.src = '/images/placeholder.jpg'; }}
                            />
                            <figcaption>
                                <h2>{item.name}</h2>
                                <div className="view">View</div>
                            </figcaption>
                        </figure>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
