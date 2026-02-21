// src/services/fetchClient.ts
const API_BASE_URL = "https://franchisemooncake.onrender.com/api";

interface FetchOptions extends RequestInit {
    params?: Record<string, string>;
}

class FetchClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private getToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem("token");
        }
        return null;
    }

    private handleUnauthorized() {
        if (typeof window !== 'undefined') {
            // Don't redirect if already on login page
            if (!window.location.pathname.includes('/auth/login')) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/auth/login";
            }
        }
    }

    private async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
        const { params, ...fetchOptions } = options;

        // Build URL with query params
        let url = `${this.baseURL}${endpoint}`;
        if (params) {
            const queryString = new URLSearchParams(params).toString();
            url += `?${queryString}`;
        }

        // Set default headers
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        // Merge with custom headers
        if (fetchOptions.headers) {
            Object.assign(headers, fetchOptions.headers);
        }

        // Add auth token if available
        const token = this.getToken();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, {
                ...fetchOptions,
                headers,
            });

            // Handle unauthorized
            if (response.status === 401) {
                this.handleUnauthorized();
                throw new Error("Unauthorized");
            }

            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}`);
            }

            // Parse response
            const data = await response.json();
            console.log('API Response:', { url, status: response.status, data });

            // Handle non-OK responses
            if (!response.ok) {
                console.error('API Error:', { url, status: response.status, data });
                throw {
                    response: {
                        status: response.status,
                        data,
                    },
                    message: data.message || "Request failed",
                };
            }

            return data;
        } catch (error) {
            console.error('FetchClient error:', { url, error });
            // Re-throw for caller to handle
            throw error;
        }
    }

    async get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: "GET" });
    }

    async post<T>(endpoint: string, body?: unknown, options?: FetchOptions): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: "POST",
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    async put<T>(endpoint: string, body?: unknown, options?: FetchOptions): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: "PUT",
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    async delete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: "DELETE" });
    }

    async patch<T>(endpoint: string, body?: unknown, options?: FetchOptions): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: "PATCH",
            body: body ? JSON.stringify(body) : undefined,
        });
    }
}

const fetchClient = new FetchClient(API_BASE_URL);

export default fetchClient;

