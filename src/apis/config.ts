// API configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Helper function to handle API responses
export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
}
