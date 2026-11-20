import axios from 'axios';
import type { Product, ProductPayload, ProductResponse } from '../types/product';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

export const getAll = () => api.get<ProductResponse>('/products');
export const getById = (id: number) => api.get<Product>(`/products/${id}`);
export const create = (product: ProductPayload) => api.post<Product>('/products', product);
export const update = (id: number, product: ProductPayload) => api.put<Product>(`/products/${id}`, product);
export const remove = (id: number) => api.delete(`/products/${id}`);
