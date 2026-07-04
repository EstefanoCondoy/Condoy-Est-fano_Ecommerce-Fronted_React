import GitHubIcon from "@mui/icons-material/GitHub";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">COLTIS TECH</div>
          <p>Una experiencia de compra conectada con Spring Boot y PostgreSQL.</p>
        </div>
        <div>
          <h3>Explorar</h3>
          <Link to="/">Inicio</Link>
          <Link to="/shop">Productos</Link>
          <Link to="/cart">Carrito</Link>
        </div>
        <div>
          <h3>Cuenta</h3>
          <Link to="/login">Registro e ingreso</Link>
          <Link to="/profile">Perfil e historial</Link>
        </div>
        <div>
          <h3>Proyecto</h3>
          <span><GitHubIcon fontSize="small" /> React + TypeScript</span>
          <span><MailOutlineIcon fontSize="small" /> Condoy Estéfano</span>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 Coltis Tech Store · Aplicaciones Web
      </div>
    </footer>
  );
}
