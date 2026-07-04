import FilterListIcon from "@mui/icons-material/FilterList";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useEffect, useMemo, useState } from "react";
import { apiMessage, ecommerceApi } from "../api/client";
import ProductGrid from "../components/ProductGrid";
import LoadingState from "../components/states/LoadingState";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";

type SortMode = "featured" | "price-asc" | "price-desc" | "stock";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState<SortMode>("featured");
  const { search, setSearch } = useCart();

  useEffect(() => {
    ecommerceApi.products.list()
      .then(setProducts)
      .catch(cause => setError(apiMessage(cause)))
      .finally(() => setLoading(false));
  }, []);

  const visibleProducts = useMemo(() => {
    const term = search.toLocaleLowerCase();
    const filtered = products.filter(product =>
      product.name.toLocaleLowerCase().includes(term)
      || product.description?.toLocaleLowerCase().includes(term)
    );
    return [...filtered].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "stock") return b.amount - a.amount;
      return a.productId - b.productId;
    });
  }, [products, search, sort]);

  return (
    <section className="page-container page-section">
      <div className="page-hero compact">
        <span className="eyebrow">Catálogo conectado</span>
        <h1>Encuentra tu próxima herramienta</h1>
        <p>{products.length} productos consultados directamente desde la API.</p>
      </div>

      <div className="shop-toolbar">
        <div className="search-summary">
          <SearchOffIcon />
          <input
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Filtrar por nombre o descripción"
            aria-label="Filtrar productos"
          />
          {search && <button onClick={() => setSearch("")}>Limpiar</button>}
        </div>
        <label className="sort-control">
          <FilterListIcon />
          <span>Ordenar</span>
          <select value={sort} onChange={event => setSort(event.target.value as SortMode)}>
            <option value="featured">Destacados</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
            <option value="stock">Mayor stock</option>
          </select>
        </label>
      </div>

      {error && <div className="alert error">{error}</div>}
      {loading ? <LoadingState label="Cargando productos..." /> : (
        <>
          <p className="results-count">{visibleProducts.length} resultados</p>
          <ProductGrid products={visibleProducts} />
        </>
      )}
    </section>
  );
}
