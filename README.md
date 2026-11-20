# Products Web React

Interfaz React con Vite y Tailwind CSS para administrar el catalogo de productos.

## Instalacion

```bash
npm install
cp .env.example .env
npm run dev
```

Abre `http://localhost:5173`. El backend debe estar activo en `http://localhost:3000`.

## Funcionalidades

- Listado de productos
- Busqueda por nombre o SKU
- Filtro por categoria y rango de precio
- Creacion y edicion mediante modal
- Validacion de formulario
- Eliminacion con confirmacion
- Estados de carga, error y notificacion

## Scripts

- `npm run dev`: servidor de desarrollo
- `npm run build`: compilacion de produccion
- `npm test`: pruebas
