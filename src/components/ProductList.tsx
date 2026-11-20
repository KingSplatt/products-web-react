import type { Product } from '../types/product';
import ProductCard from './ProductCard';

type ProductListProps = {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

function ProductList({ products, loading, onEdit, onDelete }: ProductListProps) {
  if (loading) {
    return <div className="grid place-items-center rounded-xl bg-white py-20 shadow-sm"><div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" /></div>;
  }

  if (products.length === 0) {
    return <div className="rounded-xl bg-white py-16 text-center text-slate-500 shadow-sm">No hay productos que mostrar</div>;
  }

  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} />)}</div>;
}

export default ProductList;
