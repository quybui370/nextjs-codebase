import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL, fetchConfig, handleResponse } from "./config";
import type { ApiResponse, Product } from "./types";

// API functions
const productApi = {
  getProducts: async (signal: AbortSignal): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      ...fetchConfig,
      signal,
    });
    return handleResponse<Product[]>(response);
  },

  getProduct: async (id: string, signal: AbortSignal): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/product/${id}`, {
      ...fetchConfig,
      signal,
    });
    return handleResponse<Product>(response);
  },

  updateProduct: async (
    product: Product,
    signal: AbortSignal
  ): Promise<ApiResponse<Product>> => {
    const response = await fetch(`${API_BASE_URL}/product/${product.id}`, {
      ...fetchConfig,
      method: "PUT",
      body: JSON.stringify(product),
      signal,
    });
    return handleResponse<ApiResponse<Product>>(response);
  },

  deleteProduct: async (
    id: number,
    signal: AbortSignal
  ): Promise<ApiResponse<Product>> => {
    const response = await fetch(`${API_BASE_URL}/product/${id}`, {
      ...fetchConfig,
      method: "DELETE",
      signal,
    });
    return handleResponse<ApiResponse<Product>>(response);
  },
};

// React Query hooks
export const useProducts = (isFetched: boolean) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: ({ signal }) => productApi.getProducts(signal),
    enabled: isFetched,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: ({ signal }) => productApi.getProduct(id, signal),
    enabled: !!id, // Only run the query if id is available
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      product,
      signal,
    }: {
      product: Product;
      signal: AbortSignal;
    }) => {
      return productApi.updateProduct(product, signal);
    },
    onSuccess: () => {
      // Invalidate the products query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => {
      console.error("Error updating product:", error);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      const abortController = new AbortController();
      return productApi.deleteProduct(id, abortController.signal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });
};
