export type Product = {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  is_active: boolean;
};

export type ProductFormValues = Omit<Product, 'id' | 'price' | 'stock'> & {
  price: number | string;
  stock: number | string;
};

export type ProductPayload = Omit<Product, 'id'>;

export type ProductFormErrors = Partial<Record<keyof ProductFormValues | 'form', string>>;

export type ProductResponse = {
  data: Product[];
};
