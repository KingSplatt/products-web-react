import type { Product } from '../types/product';

type ProductCardProps = {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 cardchida">
      <div className="mb-3 flex items-start justify-between gap-3">
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">{product.category}</span>
        <span className="text-xs text-slate-400">#{product.sku}</span>
      </div>
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="mt-2 min-h-12 text-sm text-slate-500">{product.description || 'Sin descripcion'}</p>
      <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
        <div>
          <p className="text-xl font-bold text-indigo-700">${Number(product.price).toFixed(2)}</p>
          <p className="text-xs text-slate-500">Stock: {product.stock}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(product)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-50">Editar</button>
          <button onClick={() => onDelete(product)} className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100">Eliminar</button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
