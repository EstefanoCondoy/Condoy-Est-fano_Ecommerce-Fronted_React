import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { Badge } from "@mui/material";
import { useRef, type FormEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppTheme } from "../context/AppThemeContext";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);
  const { cartCount, setSearch } = useCart();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { darkMode, toggleTheme } = useAppTheme();

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    setSearch(searchRef.current?.value.trim() ?? "");
    navigate("/shop");
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link className="brand" to="/" aria-label="Ir al inicio">
          <span className="brand-mark"><StorefrontOutlinedIcon /></span>
          <span>
            <strong>COLTIS</strong>
            <small>TECH STORE</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Navegación principal">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/shop">Tienda</NavLink>
          <NavLink to="/profile">Mis compras</NavLink>
        </nav>

        <form className="nav-search" onSubmit={handleSearch}>
          <input
            ref={searchRef}
            aria-label="Buscar productos"
            placeholder="Buscar tecnología..."
          />
          <button aria-label="Buscar" type="submit"><SearchIcon /></button>
        </form>

        <div className="nav-actions">
          <button
            className="icon-button"
            onClick={toggleTheme}
            aria-label={darkMode ? "Activar tema claro" : "Activar tema oscuro"}
          >
            {darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </button>
          <Link className="icon-button profile-link" to={isAuthenticated ? "/profile" : "/login"}>
            <AccountCircleOutlinedIcon />
            <span>{currentUser?.firstName ?? "Ingresar"}</span>
          </Link>
          <Link className="icon-button" to="/cart" aria-label="Abrir carrito">
            <Badge badgeContent={cartCount} color="error">
              <ShoppingBagOutlinedIcon />
            </Badge>
          </Link>
          {isAuthenticated && (
            <button className="icon-button" onClick={handleLogout} aria-label="Cerrar sesión">
              <LogoutOutlinedIcon />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
