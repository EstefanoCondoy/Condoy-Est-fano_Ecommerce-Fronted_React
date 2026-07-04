import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiMessage } from "../api/client";
import { useAuth } from "../context/AuthContext";
import type { RegisterPayload } from "../types";

const EMPTY_REGISTER: RegisterPayload = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  address: "",
  phoneNumber: ""
};

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState(EMPTY_REGISTER);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function submitLogin(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    setSubmitting(true);
    try {
      await login(loginData);
      navigate((location.state as { from?: string } | null)?.from ?? "/profile");
    } catch (error) {
      setMessage(apiMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  async function submitRegister(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    setSubmitting(true);
    try {
      await register(registerData);
      navigate("/profile");
    } catch (error) {
      setMessage(apiMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-promo">
        <div className="auth-orb one" />
        <div className="auth-orb two" />
        <span className="eyebrow">Tu cuenta Coltis</span>
        <h1>Compra, guarda tus datos y consulta tus recibos.</h1>
        <p>
          La sesión se conserva en este navegador y la contraseña nunca se
          devuelve en las respuestas de la API.
        </p>
        <ul>
          <li>Carrito persistente</li>
          <li>Historial de compras</li>
          <li>Perfil editable</li>
        </ul>
      </div>

      <div className="auth-card">
        <div className="auth-tabs">
          <button className={mode === "login" ? "active" : ""} onClick={() => {
            setMode("login");
            setMessage("");
          }}>
            <LockOutlinedIcon /> Iniciar sesión
          </button>
          <button className={mode === "register" ? "active" : ""} onClick={() => {
            setMode("register");
            setMessage("");
          }}>
            <PersonAddAltOutlinedIcon /> Registrarse
          </button>
        </div>

        {message && <div className="alert error">{message}</div>}

        {mode === "login" ? (
          <form className="form-stack" onSubmit={submitLogin}>
            <div className="form-title">
              <h2>Bienvenido de nuevo</h2>
              <p>Ingresa con las credenciales registradas en PostgreSQL.</p>
            </div>
            <label>
              Correo electrónico
              <input
                type="email"
                required
                value={loginData.email}
                onChange={event => setLoginData({ ...loginData, email: event.target.value })}
                placeholder="nombre@correo.com"
              />
            </label>
            <label>
              Contraseña
              <input
                type="password"
                required
                value={loginData.password}
                onChange={event => setLoginData({ ...loginData, password: event.target.value })}
                placeholder="••••••••"
              />
            </label>
            <button className="button primary full" disabled={submitting}>
              {submitting ? "Verificando..." : "Ingresar a mi cuenta"}
            </button>
            <p className="form-hint">Prueba disponible: estefano@epn.edu.ec / 123456</p>
          </form>
        ) : (
          <form className="form-stack" onSubmit={submitRegister}>
            <div className="form-title">
              <h2>Crea tu cuenta</h2>
              <p>Todos los campos marcados son validados por el backend.</p>
            </div>
            <div className="form-grid">
              <label>
                Nombre
                <input required value={registerData.firstName} onChange={event =>
                  setRegisterData({ ...registerData, firstName: event.target.value })
                } />
              </label>
              <label>
                Apellido
                <input required value={registerData.lastName} onChange={event =>
                  setRegisterData({ ...registerData, lastName: event.target.value })
                } />
              </label>
            </div>
            <label>
              Correo electrónico
              <input type="email" required value={registerData.email} onChange={event =>
                setRegisterData({ ...registerData, email: event.target.value })
              } />
            </label>
            <label>
              Contraseña
              <input type="password" minLength={6} required value={registerData.password} onChange={event =>
                setRegisterData({ ...registerData, password: event.target.value })
              } />
            </label>
            <div className="form-grid">
              <label>
                Ciudad / dirección
                <input value={registerData.address} onChange={event =>
                  setRegisterData({ ...registerData, address: event.target.value })
                } />
              </label>
              <label>
                Teléfono
                <input value={registerData.phoneNumber} onChange={event =>
                  setRegisterData({ ...registerData, phoneNumber: event.target.value })
                } />
              </label>
            </div>
            <button className="button primary full" disabled={submitting}>
              {submitting ? "Creando cuenta..." : "Crear mi cuenta"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
