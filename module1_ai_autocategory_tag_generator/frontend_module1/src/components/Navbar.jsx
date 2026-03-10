import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      pathname === path
        ? "bg-rose-500 text-white"
        : "text-gray-300 hover:text-white hover:bg-white/10"
    }`;

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-8 py-4 flex items-center gap-6">
      <span className="text-rose-500 font-bold text-xl mr-4">⚡ Rayeva AI</span>
      <Link to="/" className={linkClass("/")}>Catalog</Link>
      <Link to="/analyze" className={linkClass("/analyze")}>Analyze</Link>
      <Link to="/logs" className={linkClass("/logs")}>AI Logs</Link>
    </nav>
  );
}