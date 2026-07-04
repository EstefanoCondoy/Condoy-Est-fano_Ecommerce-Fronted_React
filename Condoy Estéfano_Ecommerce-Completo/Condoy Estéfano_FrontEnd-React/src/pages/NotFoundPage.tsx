import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="not-found page-container">
      <TravelExploreOutlinedIcon />
      <span>404</span>
      <h1>Esta página no está en el catálogo.</h1>
      <p>Vuelve al inicio o continúa explorando los productos disponibles.</p>
      <Link className="button primary" to="/">Volver al inicio</Link>
    </section>
  );
}
