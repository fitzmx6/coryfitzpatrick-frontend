const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

export const getContentByCategory = async (category: string) => {
    const response = await fetch(`${API_BASE_URL}/content/category?category=${category}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.status}`);
    }

    return await response.json();
};

export async function getContentByUrl(url: string) {
    const response = await fetch(`${API_BASE_URL}/content/item?url=${encodeURIComponent(url)}`);

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.status}`);
    }

    return await response.json();
}