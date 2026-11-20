import { useMemo, useState } from 'react';
import type { Product } from '../types/product';

export function useProductFilters(products: Product[]) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort(),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    const [minimum, maximum] = price.split('-').map(Number);
    const hasPriceRange = price.includes('-') && !Number.isNaN(minimum) && !Number.isNaN(maximum);

    return products.filter((product) => (
      (!category || product.category === category)
      && (!term
        || product.name.toLowerCase().includes(term)
        || product.sku.toLowerCase().includes(term))
      && (!price
        || (hasPriceRange
          ? product.price >= minimum && product.price <= maximum
          : product.price === Number(price)))
    ));
  }, [category, price, products, search]);

  return {
    search,
    setSearch,
    category,
    setCategory,
    price,
    setPrice,
    categories,
    filteredProducts,
  };
}
