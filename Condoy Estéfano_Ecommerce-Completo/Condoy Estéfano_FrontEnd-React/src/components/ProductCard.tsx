import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";
import ProductVisual from "./ProductVisual";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const available = product.amount > 0;

  function add() {
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className="product-card">
      <div className="product-card-visual">
        <ProductVisual imageUrl={product.imageUrl} name={product.name} />
        <span className={`stock-pill ${available ? "" : "out"}`}>
          <Inventory2OutlinedIcon fontSize="inherit" />
          {available ? `${product.amount} disponibles` : "Agotado"}
        </span>
      </div>
      <div className="product-card-body">
        <span className="product-category">Tecnología</span>
        <h3>{product.name}</h3>
        <p>{product.description || "Producto seleccionado para tu espacio de trabajo."}</p>
        <div className="product-card-footer">
          <div className="product-price">
            <small>Precio</small>
            <strong>${Number(product.price).toFixed(2)}</strong>
          </div>
          <button
            className={`add-cart-button ${added ? "added" : ""}`}
            onClick={add}
            disabled={!available}
          >
            <AddShoppingCartIcon fontSize="small" />
            {added ? "Agregado" : "Agregar"}
          </button>
        </div>
      </div>
    </article>
  );
}
