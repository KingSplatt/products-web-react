type ProductFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  price: string;
  onPriceChange: (value: string) => void;
};

function ProductFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  price,
  onPriceChange,
}: ProductFiltersProps) {
  return (
    <div className="mb-6 grid gap-3 rounded-xl bg-white p-4 shadow-sm sm:grid-cols-2 contenedor">
      <input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Buscar por nombre o SKU" className="rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-indigo-500" />
      <select value={category} onChange={(event) => onCategoryChange(event.target.value)} className="rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-indigo-500">
        <option value="">Todas las categorias</option>
        {categories.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
      <input value={price} onChange={(event) => onPriceChange(event.target.value)} className="rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-indigo-500" placeholder="Precio" />
    </div>
  );
}

export default ProductFilters;
