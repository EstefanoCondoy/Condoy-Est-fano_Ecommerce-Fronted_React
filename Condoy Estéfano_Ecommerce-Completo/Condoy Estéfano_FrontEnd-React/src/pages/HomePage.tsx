import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiMessage, ecommerceApi } from "../api/client";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import LoadingState from "../components/states/LoadingState";
import type { Product } from "../types";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    ecommerceApi.products.list()
      .then(setProducts)
      .catch(cause => setError(apiMessage(cause)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Hero />

      <section className="feature-strip page-container">
        <article>
          <span><LocalShippingOutlinedIcon /></span>
          <div><strong>Entrega confiable</strong><p>Stock validado desde PostgreSQL.</p></div>
        </article>
        <article>
          <span><SecurityOutlinedIcon /></span>
          <div><strong>Cuenta protegida</strong><p>Contraseñas cifradas con BCrypt.</p></div>
        </article>
        <article>
          <span><CodeOutlinedIcon /></span>
          <div><strong>Arquitectura moderna</strong><p>React, TypeScript y Spring Boot.</p></div>
        </article>
      </section>

      <section className="section page-container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Selección destacada</span>
            <h2>Productos para crear sin límites</h2>
          </div>
          <Link className="text-link" to="/shop">Ver toda la tienda →</Link>
        </div>
        {error && <div className="alert error">{error}</div>}
        {loading ? <LoadingState label="Consultando el catálogo..." /> : (
          <ProductGrid products={products.slice(0, 6)} />
        )}
      </section>

      <section className="cta-section page-container">
        <div>
          <span className="eyebrow">Una compra, un recibo claro</span>
          <h2>El total se calcula siempre con el precio real del servidor.</h2>
          <p>El carrito nunca decide el precio final: Spring Boot consulta PostgreSQL y actualiza el stock.</p>
        </div>
        <Link className="button light" to="/shop">Comenzar a comprar</Link>
      </section>
    </>
  );
}
