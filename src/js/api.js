const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/content';

export const getContentByCategory = async (category) => {
    const response = await fetch(`${API_BASE_URL}/category?category=${category}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.status}`);
    }

    return await response.json();
};

export async function getContentByUrl(url) {
    const response = await fetch(`${API_BASE_URL}/item?url=${encodeURIComponent(url)}`);

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.status}`);
    }

    return await response.json();
}