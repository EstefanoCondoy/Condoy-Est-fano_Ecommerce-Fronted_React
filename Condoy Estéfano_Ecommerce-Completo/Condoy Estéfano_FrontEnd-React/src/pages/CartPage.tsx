import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link } from "react-router-dom";
import EmptyState from "../components/states/EmptyState";
import ProductVisual from "../components/ProductVisual";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, total, updateQuantity, removeFromCart } = useCart();

  if (!items.length) {
    return (
      <section className="page-container page-section">
        <EmptyState
          title="Tu carrito está esperando"
          description="Agrega productos de la tienda y vuelve cuando estés listo."
          action={<Link className="button primary" to="/shop">Ir a la tienda</Link>}
        />
      </section>
    );
  }

  return (
    <section className="page-container page-section">
      <div className="page-hero compact">
        <span className="eyebrow">Tu selección</span>
        <h1>Carrito de compras</h1>
        <p>Revisa las cantidades antes de crear el recibo.</p>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {items.map(({ product, quantity }) => (
            <article className="cart-item" key={product.productId}>
              <ProductVisual compact imageUrl={product.imageUrl} name={product.name} />
              <div className="cart-item-info">
                <span>Tecnología · ID {product.productId}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
              <div className="quantity-control" aria-label={`Cantidad de ${product.name}`}>
                <button onClick={() => updateQuantity(product.productId, quantity - 1)}>
                  <RemoveIcon fontSize="small" />
                </button>
                <strong>{quantity}</strong>
                <button onClick={() => updateQuantity(product.productId, quantity + 1)}>
                  <AddIcon fontSize="small" />
                </button>
              </div>
              <div className="cart-item-price">
                <strong>${(product.price * quantity).toFixed(2)}</strong>
                <small>${Number(product.price).toFixed(2)} c/u</small>
              </div>
              <button
                className="delete-button"
                onClick={() => removeFromCart(product.productId)}
                aria-label={`Eliminar ${product.name}`}
              >
                <DeleteOutlineIcon />
              </button>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <span className="summary-icon"><ShoppingBagOutlinedIcon /></span>
          <h2>Resumen</h2>
          <div><span>Productos</span><strong>{items.length}</strong></div>
          <div><span>Unidades</span><strong>{items.reduce((sum, item) => sum + item.quantity, 0)}</strong></div>
          <div><span>Envío</span><strong className="success-text">Gratis</strong></div>
          <hr />
          <div className="summary-total"><span>Total estimado</span><strong>${total.toFixed(2)}</strong></div>
          <p>El total definitivo se valida en el backend al confirmar la compra.</p>
          <Link className="button primary full" to="/checkout">Continuar al checkout</Link>
          <Link className="button ghost full" to="/shop">Seguir comprando</Link>
        </aside>
      </div>
    </section>
  );
}
