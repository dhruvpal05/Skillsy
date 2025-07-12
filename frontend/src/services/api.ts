/**
 * API client for making HTTP requests to the backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

class ApiClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const token = localStorage.getItem('authToken');
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        };

        const response = await fetch(`${this.baseURL}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
        }

        return response.json();
    }

    // Auth endpoints
    async login(email: string, password: string): Promise<ApiResponse<{ user: any; token: string }>> {
        return this.request('/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    }

    async register(userData: any): Promise<ApiResponse<{ user: any; token: string }>> {
        return this.request('/users/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async logout(): Promise<ApiResponse<null>> {
        return this.request('/users/logout', {
            method: 'POST',
        });
    }

    // User endpoints
    async searchUsers(filters: any): Promise<PaginatedResponse<any>> {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(key, String(value));
            }
        });

        const response = await this.request(`/users/search?${params.toString()}`);
        return response.data;
    }

    async getUserById(id: string): Promise<any> {
        const response = await this.request(`/users/${id}`);
        return response.data;
    }

    async getUserProfile(): Promise<any> {
        const response = await this.request('/users/profile');
        return response.data;
    }

    async updateUserProfile(updates: any): Promise<ApiResponse<any>> {
        return this.request('/users/profile', {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    }

    async getUserFeedback(userId: string): Promise<any[]> {
        const response = await this.request(`/users/${userId}/feedback`);
        return response.data;
    }

    // Swap endpoints
    async createSwapRequest(requestData: any): Promise<any> {
        const response = await this.request('/swaps/create', {
            method: 'POST',
            body: JSON.stringify(requestData),
        });
        return response.data;
    }

    async updateSwapRequest(id: string, updates: any): Promise<any> {
        const response = await this.request('/swaps/update', {
            method: 'PUT',
            body: JSON.stringify({ id, ...updates }),
        });
        return response.data;
    }

    async getUserSwapRequests(): Promise<any[]> {
        const response = await this.request('/swaps/user');
        return response.data;
    }

    async getAllSwapRequests(): Promise<any[]> {
        const response = await this.request('/swaps/all');
        return response.data;
    }

    async deleteSwapRequest(id: string): Promise<ApiResponse<null>> {
        return this.request('/swaps/delete', {
            method: 'DELETE',
            body: JSON.stringify({ id }),
        });
    }
}

export const apiClient = new ApiClient(API_BASE_URL); 