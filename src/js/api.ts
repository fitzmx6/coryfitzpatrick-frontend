const API_BASE_URL: string = import.meta.env.VITE_API_URL || '';

export interface ContentItem {
    id: number;
    category: string;
    name: string;
    description?: string;
    url: string;
    videoUrl?: string;
    thumbnailImage?: string;
    images?: string[];
}

export const getContentByCategory = async (category: string): Promise<ContentItem[]> => {
    const response = await fetch(`${API_BASE_URL}/content/category?category=${encodeURIComponent(category)}`);

    console.log(API_BASE_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.status}`);
    }

    return await response.json();
};

export const getContentByUrl = async (url: string): Promise<ContentItem | null> => {
    const response = await fetch(`${API_BASE_URL}/content/item?url=${encodeURIComponent(url)}`);

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.status}`);
    }

    return await response.json();
};
