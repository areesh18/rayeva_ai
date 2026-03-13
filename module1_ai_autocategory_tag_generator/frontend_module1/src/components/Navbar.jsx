import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => pathname === path;

  const links = [
    { path: "/catalog", label: "Catalog" },
    { path: "/analyze", label: "Analyze" },
    { path: "/logs", label: "AI Logs" },
  ];

  return (
    <nav
      style={{ backgroundColor: "#FAFAF7" }}
      className="border-b border-stone-200 px-5 sm:px-8 py-4 sticky top-0 z-50 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#1C3A2A" }}
          >
            <span className="text-white text-xs">✦</span>
          </div>
          <span
            className="font-display font-semibold text-lg tracking-tight"
            style={{ color: "#1C3A2A" }}
          >
            Rayeva
            <span className="font-light ml-1" style={{ color: "#6B8F71" }}>
              AI
            </span>
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-1">
          {links.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: isActive(path) ? "#1C3A2A" : "transparent",
                color: isActive(path) ? "#FAFAF7" : "#4B6B55",
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-200"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{ backgroundColor: menuOpen ? "#F0FDF4" : "transparent" }}
        >
          <span className="text-xl leading-none select-none" style={{ color: "#1C3A2A" }}>
            {menuOpen ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden mt-3 flex flex-col gap-1 pb-2">
          {links.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: isActive(path) ? "#1C3A2A" : "transparent",
                color: isActive(path) ? "#FAFAF7" : "#4B6B55",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}