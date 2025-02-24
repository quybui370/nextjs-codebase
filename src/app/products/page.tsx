"use client";

import { useProducts } from "@/apis";
import { Product } from "@/apis/types";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Layout from "../components/Layout";
import { useState } from "react";
export default function Products() {
  const [fetchProducts, setFetchProducts] = useState<boolean>(false);
  const { data, isLoading, error } = useProducts(fetchProducts);
  const queryClient = useQueryClient();

  const handleCancel = () => {
    queryClient.cancelQueries({ queryKey: ["products"] });
    setFetchProducts(false);
  };

  if (isLoading) {
    return (
      <Layout>
        <div>Loading products...</div>
        <a href="#" className="text-red-600" onClick={handleCancel}>
          Cancel
        </a>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div>Error loading products: {error.message}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      {!data && (
        <a href="#" onClick={() => setFetchProducts(true)}>
          Fetch Products
        </a>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((product: Product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="block border p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-semibold mt-2">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
