import { useCallback, useEffect, useState } from 'react';
import * as productService from '../services/productService';
import type { Product, ProductPayload } from '../types/product';

function getErrorMessage(error: unknown, fallback: string) {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const response = (error as { response?: { data?: { error?: string } } }).response;
    if (response?.data?.error) return response.data.error;
  }
  return fallback;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await productService.getAll();
      setProducts(response.data.data);
    } catch (requestError) {
      setError(getErrorMessage(requestError, 'No se pudo cargar el catalogo'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const saveProduct = async (product: ProductPayload, selectedProduct: Product | null) => {
    if (selectedProduct) {
      await productService.update(selectedProduct.id, product);
      return 'Producto actualizado';
    }
    await productService.create(product);
    return 'Producto creado';
  };

  const deleteProduct = async (product: Product) => {
    await productService.remove(product.id);
    setProducts((current) => current.filter((item) => item.id !== product.id));
  };

  return {
    products,
    loading,
    error,
    setError,
    loadProducts,
    saveProduct,
    deleteProduct,
  };
}

export { getErrorMessage };
