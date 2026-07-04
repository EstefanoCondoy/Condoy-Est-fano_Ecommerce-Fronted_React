import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Announcement from "./Announcement";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <div className="app-shell">
      <Announcement />
      <Navbar />
      <main className="main-content">{children ?? <Outlet />}</main>
      <Footer />
    </div>
  );
}
