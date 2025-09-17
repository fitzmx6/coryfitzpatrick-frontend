import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getContentByUrl } from "../js/api";
import NotFound from "./not-found";

interface ContentItem {
    id: number;
    name: string;
    description?: string;
    videoUrl?: string;
    images?: string[];
}

export default function DetailItem() {
    const location = useLocation();
    const url = location.pathname;

    const [detailItem, setDetailItem] = useState<ContentItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            setNotFound(false);

            try {
                const data = await getContentByUrl(url);

                if (!data) {
                    setNotFound(true);
                } else {
                    setDetailItem(data);
                }
            } catch (err: any) {
                setError(err?.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        void fetchData(); // <-- Fix: explicitly ignore the returned Promise
    }, [url]);

    if (loading) {
        return (
            <div id="content">
                <div className="grid-d-12">
                    <div className="loading">Loading content...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div id="content">
                <div className="grid-d-12">
                    <div className="error">Error: {error}</div>
                </div>
            </div>
        );
    }

    if (notFound || !detailItem) {
        return <NotFound />;
    }

    const { name, description, videoUrl, images } = detailItem;

    return (
        <div id="sub-content">
            <div className="grid-d-12">
                <h2>{name}</h2>

                {description && <p dangerouslySetInnerHTML={{ __html: description }} />}

                {videoUrl && (
                    <video preload="true" controls>
                        <source src={`/video/${videoUrl}.webm`} type='video/webm; codecs="vp8, vorbis"' />
                        <source src={`/video/${videoUrl}.mp4`} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
                        This web browser does not support HTML5 video.
                    </video>
                )}

                {images && images.length > 0 && (
                    <div className="images">
                        {images.map((img, idx) => (
                            <img key={idx} src={img} alt={name} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
