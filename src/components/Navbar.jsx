import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tasks", path: "/tasks" },
    { name: "API", path: "/api" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white shadow-md">
      <h1 className="text-xl font-bold">TaskManager</h1>

      <ul className="flex gap-4">
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`hover:underline ${
                location.pathname === link.path ? "font-semibold text-blue-600 dark:text-blue-400" : ""
              }`}
            >
              {link.name}
            </Link>
            
          </li>
        ))}
      </ul>

      <button
        onClick={toggleTheme}
        className="text-2xl hover:scale-110 transition-transform duration-200"
        aria-label="Toggle theme"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </nav>
  );
}
