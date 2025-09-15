import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getContentByUrl } from "../js/api";
import NotFound from "./not-found";

export default function DetailItem() {
    const location = useLocation();
    const url = location.pathname; // e.g., "/dev/jj"

    const [detailItem, setDetailItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        (async () => {
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
            } catch (err) {
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        })();
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

    if (notFound) {
        return <NotFound />;
    }

    const videoSrc = detailItem.videoUrl;

    return (
        <div id="sub-content">
            <div className="grid-d-12">
                {/* Title */}
                <h2>{detailItem.name}</h2>

                {/* Description */}
                {detailItem.description && (
                    <p dangerouslySetInnerHTML={{ __html: detailItem.description }} />
                )}

                {/* Video */}
                {videoSrc && (
                    <video preload="true" controls>
                        <source src={`/video/${videoSrc}.webm`} type='video/webm; codecs="vp8, vorbis"' />
                        <source src={`/video/${videoSrc}.mp4`} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
                        This web browser does not support HTML5 video.
                    </video>
                )}

                {/* Image gallery */}
                {detailItem.images && (
                    <div className="images">
                        {detailItem.images.map((img, idx) => (
                            <img key={idx} src={img} alt="" />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
