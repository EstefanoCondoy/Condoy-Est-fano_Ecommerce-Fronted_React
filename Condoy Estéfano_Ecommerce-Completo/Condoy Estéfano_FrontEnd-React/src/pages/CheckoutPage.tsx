import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { useState } from "react";
import { Link } from "react-router-dom";
import { apiMessage, ecommerceApi } from "../api/client";
import ReceiptCard from "../components/ReceiptCard";
import EmptyState from "../components/states/EmptyState";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import type { Receipt } from "../types";

export default function CheckoutPage() {
  const { currentUser } = useAuth();
  const { items, total, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  async function confirmOrder() {
    if (!currentUser) return;
    setError("");
    setSubmitting(true);
    try {
      const created = await ecommerceApi.receipts.create(
        currentUser.userId,
        items.map(item => ({
          productId: item.product.productId,
          quantity: item.quantity
        }))
      );
      clearCart();
      setReceipt(created);
    } catch (cause) {
      setError(apiMessage(cause));
    } finally {
      setSubmitting(false);
    }
  }

  if (receipt) {
    return (
      <section className="page-container page-section checkout-success">
        <span className="success-check"><CheckCircleOutlineIcon /></span>
        <span className="eyebrow">Compra confirmada</span>
        <h1>¡Gracias, {currentUser?.firstName}!</h1>
        <p>Spring Boot calculó el total, guardó el recibo y actualizó el stock.</p>
        <ReceiptCard receipt={receipt} />
        <div className="success-actions">
          <Link className="button primary" to="/profile">Ver mis compras</Link>
          <Link className="button ghost" to="/shop">Volver a la tienda</Link>
        </div>
      </section>
    );
  }

  if (!items.length) {
    return (
      <section className="page-container page-section">
        <EmptyState
          title="No hay artículos para confirmar"
          description="Agrega productos antes de abrir el checkout."
          action={<Link className="button primary" to="/shop">Explorar productos</Link>}
        />
      </section>
    );
  }

  return (
    <section className="page-container page-section">
      <div className="page-hero compact">
        <span className="eyebrow">Último paso</span>
        <h1>Confirma tu compra</h1>
        <p>Revisa los datos; el servidor realizará el cálculo definitivo.</p>
      </div>

      {error && <div className="alert error">{error}</div>}

      <div className="checkout-layout">
        <div className="checkout-details">
          <article className="checkout-panel">
            <div className="panel-heading">
              <LocalShippingOutlinedIcon />
              <div><h2>Datos de entrega</h2><p>Información de tu perfil</p></div>
            </div>
            <div className="checkout-user">
              <div><span>Nombre</span><strong>{currentUser?.firstName} {currentUser?.lastName}</strong></div>
              <div><span>Correo</span><strong>{currentUser?.email}</strong></div>
              <div><span>Dirección</span><strong>{currentUser?.address || "Sin dirección registrada"}</strong></div>
              <div><span>Teléfono</span><strong>{currentUser?.phoneNumber || "Sin teléfono registrado"}</strong></div>
            </div>
          </article>

          <article className="checkout-panel">
            <div className="panel-heading">
              <CreditCardOutlinedIcon />
              <div><h2>Método de pago</h2><p>Simulación académica</p></div>
            </div>
            <label className="payment-option">
              <input type="radio" defaultChecked name="payment" />
              <span>
                <strong>Pago contra entrega</strong>
                <small>No se recopilan datos bancarios.</small>
              </span>
            </label>
          </article>
        </div>

        <aside className="order-summary">
          <div className="panel-heading">
            <ReceiptLongOutlinedIcon />
            <div><h2>Tu pedido</h2><p>{items.length} productos</p></div>
          </div>
          <div className="order-lines">
            {items.map(item => (
              <div key={item.product.productId}>
                <span>{item.product.name} × {item.quantity}</span>
                <strong>${(item.product.price * item.quantity).toFixed(2)}</strong>
              </div>
            ))}
          </div>
          <hr />
          <div className="order-total"><span>Total estimado</span><strong>${total.toFixed(2)}</strong></div>
          <button
            className="button primary full"
            onClick={confirmOrder}
            disabled={submitting}
          >
            {submitting ? "Procesando..." : "Confirmar y crear recibo"}
          </button>
          <p className="secure-note">El precio se verifica nuevamente en PostgreSQL.</p>
        </aside>
      </div>
    </section>
  );
}
