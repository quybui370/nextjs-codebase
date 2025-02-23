"use client";

import { useDeleteProduct, useProduct, useUpdateProduct } from "@/apis";
import { useParams } from "next/navigation";
import { useState } from "react";
import Layout from "../../components/Layout";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useProduct(id as string);
  const { mutate: updateProduct, isPending } = useUpdateProduct();
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  // Ref to store the AbortController
  const [abortController, setAbortController] = useState<AbortController>(
    new AbortController()
  );

  if (isLoading) {
    return (
      <Layout>
        <div>Loading product details...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div>Error loading product: {error.message}</div>
      </Layout>
    );
  }

  const handleEdit = (id: number | undefined) => {
    if (!id) return;

    const updatedProduct = {
      id,
      name: "Updated Product",
      description: "Updated Description",
      price: 100,
      category: "Updated Category",
      brand: "Updated Brand",
      stock: 100,
    };

    updateProduct({
      product: updatedProduct,
      signal: abortController.signal,
    });
  };

  const handleDelete = (id: number | undefined) => {
    if (!id) return;
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  const handleCancel = () => {
    abortController.abort();
    setAbortController(new AbortController());
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold">{product?.name}</h1>
        <p className="text-gray-600">{product?.description}</p>
        <p className="text-lg font-semibold mt-2">${product?.price}</p>
        <p className="text-sm text-gray-500">Category: {product?.category}</p>
        <p className="text-sm text-gray-500">Brand: {product?.brand}</p>
        <p className="text-sm text-gray-500">Stock: {product?.stock}</p>
        <div className="mt-4 space-x-4">
          <a href="#" onClick={() => handleEdit(product?.id)}>
            {isPending ? "Updating..." : "Edit"}
          </a>
          {isPending ? (
            <a href="#" onClick={handleCancel}>
              Cancel
            </a>
          ) : null}
          <a
            href="#"
            onClick={() => handleDelete(product?.id)}
            className="text-red-600"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </a>
        </div>
      </div>
    </Layout>
  );
}
