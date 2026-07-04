import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="eyebrow"><VerifiedOutlinedIcon /> Tecnología que impulsa tus ideas</span>
        <h1>Tu próxima gran herramienta está aquí.</h1>
        <p>
          Equipos seleccionados para estudiar, crear y desarrollar. Compra con
          stock real, precios transparentes y recibos automáticos.
        </p>
        <div className="hero-actions">
          <Link className="button primary" to="/shop">
            Explorar productos <ArrowForwardIcon fontSize="small" />
          </Link>
          <Link className="button ghost" to="/login">Crear una cuenta</Link>
        </div>
        <div className="hero-metrics">
          <div><strong>100%</strong><span>Backend conectado</span></div>
          <div><strong>24/7</strong><span>Catálogo disponible</span></div>
          <div><strong>Seguro</strong><span>Contraseñas cifradas</span></div>
        </div>
      </div>
      <div className="hero-art" aria-label="Ilustración de una laptop">
        <div className="hero-glow" />
        <div className="laptop-screen">
          <div className="screen-bar"><i /><i /><i /></div>
          <div className="screen-code">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="screen-chip">SPRING + REACT</div>
        </div>
        <div className="laptop-base" />
        <div className="floating-card card-one"><strong>PostgreSQL</strong><span>Datos persistentes</span></div>
        <div className="floating-card card-two"><strong>REST API</strong><span>Puerto 8000</span></div>
      </div>
    </section>
  );
}
