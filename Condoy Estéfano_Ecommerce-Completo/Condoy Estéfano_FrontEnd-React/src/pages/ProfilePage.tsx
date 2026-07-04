import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { apiMessage, ecommerceApi } from "../api/client";
import ReceiptCard from "../components/ReceiptCard";
import EmptyState from "../components/states/EmptyState";
import LoadingState from "../components/states/LoadingState";
import { useAuth } from "../context/AuthContext";
import type { Receipt, UpdateUserPayload } from "../types";

export default function ProfilePage() {
  const { currentUser, updateProfile, logout } = useAuth();
  const [tab, setTab] = useState<"account" | "orders">("account");
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loadingReceipts, setLoadingReceipts] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState<UpdateUserPayload>({
    firstName: currentUser?.firstName,
    lastName: currentUser?.lastName,
    email: currentUser?.email,
    address: currentUser?.address ?? "",
    phoneNumber: currentUser?.phoneNumber ?? "",
    password: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (tab !== "orders" || !currentUser) return;
    setLoadingReceipts(true);
    ecommerceApi.receipts.byUser(currentUser.userId)
      .then(setReceipts)
      .catch(cause => setMessage(apiMessage(cause)))
      .finally(() => setLoadingReceipts(false));
  }, [tab, currentUser]);

  async function saveProfile(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const payload = { ...form };
      if (!payload.password) delete payload.password;
      await updateProfile(payload);
      setMessage("Perfil actualizado correctamente.");
    } catch (cause) {
      setMessage(apiMessage(cause));
    } finally {
      setSubmitting(false);
    }
  }

  function signOut() {
    logout();
    navigate("/");
  }

  return (
    <section className="page-container page-section profile-page">
      <div className="profile-header">
        <div className="profile-avatar">{currentUser?.firstName.charAt(0)}{currentUser?.lastName.charAt(0)}</div>
        <div>
          <span className="eyebrow">Mi cuenta</span>
          <h1>{currentUser?.firstName} {currentUser?.lastName}</h1>
          <p>{currentUser?.email} · Usuario #{currentUser?.userId}</p>
        </div>
        <button className="button ghost" onClick={signOut}><LogoutOutlinedIcon /> Cerrar sesión</button>
      </div>

      <div className="profile-layout">
        <aside className="profile-nav">
          <button className={tab === "account" ? "active" : ""} onClick={() => {
            setTab("account");
            setMessage("");
          }}>
            <AccountCircleOutlinedIcon /> Datos de cuenta
          </button>
          <button className={tab === "orders" ? "active" : ""} onClick={() => {
            setTab("orders");
            setMessage("");
          }}>
            <ReceiptLongOutlinedIcon /> Historial de compras
          </button>
        </aside>

        <div className="profile-content">
          {message && <div className={`alert ${message.includes("correctamente") ? "success" : "error"}`}>{message}</div>}

          {tab === "account" ? (
            <form className="profile-form" onSubmit={saveProfile}>
              <div className="panel-heading">
                <EditOutlinedIcon />
                <div><h2>Información personal</h2><p>Actualiza los datos almacenados en PostgreSQL.</p></div>
              </div>
              <div className="form-grid">
                <label>Nombre<input value={form.firstName ?? ""} onChange={event => setForm({ ...form, firstName: event.target.value })} /></label>
                <label>Apellido<input value={form.lastName ?? ""} onChange={event => setForm({ ...form, lastName: event.target.value })} /></label>
              </div>
              <label>Correo<input type="email" value={form.email ?? ""} onChange={event => setForm({ ...form, email: event.target.value })} /></label>
              <div className="form-grid">
                <label>Dirección<input value={form.address ?? ""} onChange={event => setForm({ ...form, address: event.target.value })} /></label>
                <label>Teléfono<input value={form.phoneNumber ?? ""} onChange={event => setForm({ ...form, phoneNumber: event.target.value })} /></label>
              </div>
              <label>Nueva contraseña <small>(opcional)</small><input type="password" value={form.password ?? ""} onChange={event => setForm({ ...form, password: event.target.value })} /></label>
              <button className="button primary" disabled={submitting}>{submitting ? "Guardando..." : "Guardar cambios"}</button>
            </form>
          ) : (
            <div className="orders-panel">
              <div className="panel-heading">
                <ReceiptLongOutlinedIcon />
                <div><h2>Compras anteriores</h2><p>Recibos creados por la API.</p></div>
              </div>
              {loadingReceipts ? <LoadingState label="Consultando recibos..." /> : (
                receipts.length ? (
                  <div className="receipt-grid">{receipts.map(receipt => <ReceiptCard key={receipt.receiptId} receipt={receipt} />)}</div>
                ) : (
                  <EmptyState title="Aún no tienes compras" description="Cuando confirmes un pedido aparecerá aquí." />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
