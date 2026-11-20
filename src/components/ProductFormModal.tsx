import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { Product, ProductFormErrors, ProductFormValues, ProductPayload } from '../types/product';

const defaults: ProductFormValues = {
  sku: '', name: '', description: '', price: '', stock: '', category: '', is_active: true,
};

type ProductFormModalProps = {
  product: Product | null;
  onClose: () => void;
  onSave: (values: ProductPayload) => Promise<void>;
};

function ProductFormModal({ product, onClose, onSave }: ProductFormModalProps) {
  const [values, setValues] = useState<ProductFormValues>(product
    ? { ...product, price: String(product.price), stock: String(product.stock) }
    : defaults);
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [saving, setSaving] = useState(false);

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    const nextValue = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value;
    setValues((current) => ({ ...current, [name]: nextValue }));
  };

  const validate = () => {
    const nextErrors: ProductFormErrors = {};
    if (!values.sku.trim()) nextErrors.sku = 'El SKU es obligatorio';
    if (!values.name.trim()) nextErrors.name = 'El nombre es obligatorio';
    if (!values.category.trim()) nextErrors.category = 'La categoria es obligatoria';
    if (!Number(values.price) || Number(values.price) <= 0) nextErrors.price = 'El precio debe ser positivo';
    if (!Number.isInteger(Number(values.stock)) || Number(values.stock) < 0) nextErrors.stock = 'El stock debe ser un entero no negativo';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      await onSave({ ...values, price: Number(values.price), stock: Number(values.stock) });
    } catch (error) {
      const response = (error as { response?: { data?: { error?: string } } }).response;
      setErrors({ form: response?.data?.error || 'No se pudo guardar el producto' });
    } finally {
      setSaving(false);
    }
  };

  const fields: Array<[keyof ProductFormValues, string]> = [['sku', 'SKU'], ['name', 'Nombre'], ['price', 'Precio'], ['stock', 'Stock'], ['category', 'Categoria']];
  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-slate-950/50 p-4" role="dialog" aria-modal="true">
      <form onSubmit={submit} className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-bold">{product ? 'Editar producto' : 'Nuevo producto'}</h2><button type="button" onClick={onClose} className="text-2xl text-slate-400">&times;</button></div>
        {errors.form && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{errors.form}</p>}
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map(([name, label]) => <label key={name} className="text-sm font-semibold text-slate-700">{label}<input name={name} type={name === 'price' || name === 'stock' ? 'number' : 'text'} min={name === 'price' ? '0.01' : name === 'stock' ? '0' : undefined} step={name === 'price' ? '0.01' : name === 'stock' ? '1' : undefined} value={values[name] as string} onChange={updateField} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal outline-none focus:border-indigo-500" />{errors[name] && <span className="mt-1 block text-xs text-red-600">{errors[name]}</span>}</label>)}
        </div>
        <label className="mt-4 block text-sm font-semibold text-slate-700">Descripcion<textarea name="description" value={values.description} onChange={updateField} rows={3} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal outline-none focus:border-indigo-500" /></label>
        <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-lg border border-slate-300 px-4 py-2 font-semibold">Cancelar</button><button type="submit" disabled={saving} className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white disabled:opacity-60">{saving ? 'Guardando...' : 'Guardar'}</button></div>
      </form>
    </div>
  );
}

export default ProductFormModal;
