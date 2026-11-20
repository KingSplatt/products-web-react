import { useState } from 'react';
import ProductFilters from './components/ProductFilters';
import ProductFormModal from './components/ProductFormModal';
import ProductList from './components/ProductList';
import { useProductFilters } from './hooks/useProductFilters';
import { getErrorMessage, useProducts } from './hooks/useProducts';
import { useToast } from './hooks/useToast';
import type { Product, ProductPayload } from './types/product';

function App() {
  const { products, loading, error, setError, loadProducts, saveProduct, deleteProduct } = useProducts();
  const filters = useProductFilters(products);
  const { message: toast, showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openCreate = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleSave = async (values: ProductPayload) => {
    const message = await saveProduct(values, selectedProduct);
    setModalOpen(false);
    showToast(message);
    await loadProducts();
  };

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`¿Eliminar "${product.name}"?`)) return;
    try {
      await deleteProduct(product);
      showToast('Producto eliminado');
    } catch (requestError) {
      setError(getErrorMessage(requestError, 'No se pudo eliminar el producto'));
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {toast && <div className="fixed right-5 top-5 z-50 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg">{toast}</div>}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 ">Inventario</p>
            <h1 className="mt-1 text-3xl font-bold">Catalogo de productos</h1>
          </div>
          <button onClick={openCreate} className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white shadow hover:bg-indigo-700">+ Nuevo producto</button>
        </header>
        <ProductFilters {...filters} onSearchChange={filters.setSearch} onCategoryChange={filters.setCategory} onPriceChange={filters.setPrice} />
        {error && <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>}
        <ProductList products={filters.filteredProducts} loading={loading} onEdit={openEdit} onDelete={handleDelete} />
      </section>
      {modalOpen && <ProductFormModal product={selectedProduct} onClose={() => setModalOpen(false)} onSave={handleSave} />}
    </main>
  );
}

export default App;
