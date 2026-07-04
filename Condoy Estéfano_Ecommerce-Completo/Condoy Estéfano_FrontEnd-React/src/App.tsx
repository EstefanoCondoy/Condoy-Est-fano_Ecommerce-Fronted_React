import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAppTheme } from "./context/AppThemeContext";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import ShopPage from "./pages/ShopPage";

const AppSurface = styled.div`
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
`;

const themes = {
  dark: { background: "#080d18", text: "#f8fafc" },
  light: { background: "#f7f9fc", text: "#101828" }
};

export default function App() {
  const { darkMode } = useAppTheme();

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <ThemeProvider theme={darkMode ? themes.dark : themes.light}>
      <AppSurface>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/checkout"
              element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AppSurface>
    </ThemeProvider>
  );
}
