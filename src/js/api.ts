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

interface ApiErrorResponse {
    message?: string;
    error?: string;
}

class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public response?: ApiErrorResponse
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

const handleApiResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        let errorMessage = `HTTP error ${response.status}`;
        try {
            const errorData: ApiErrorResponse = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
            errorMessage = response.statusText || errorMessage;
        }
        throw new ApiError(errorMessage, response.status);
    }
    return await response.json();
};

export const getContentByCategory = async (category: string): Promise<ContentItem[]> => {
    const response = await fetch(`${API_BASE_URL}/content/category?category=${encodeURIComponent(category)}`);
    return handleApiResponse<ContentItem[]>(response);
};

export const getContentByUrl = async (url: string): Promise<ContentItem | null> => {
    const response = await fetch(`${API_BASE_URL}/content/item?url=${encodeURIComponent(url)}`);

    if (response.status === 404) {
        return null;
    }

    return handleApiResponse<ContentItem>(response);
};
