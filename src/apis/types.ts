// Define common types for API responses
export interface ApiResponse<T> {
  status: number;
  data?: T;
  message: string;
}

// Product types
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  stock: number;
}
