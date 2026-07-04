import type { Product } from "../types";
import EmptyState from "./states/EmptyState";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <EmptyState
        title="No encontramos productos"
        description="Prueba con otro término de búsqueda."
      />
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  );
}
