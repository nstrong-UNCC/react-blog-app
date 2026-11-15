import { Link } from "react-router";
import { useTheme } from "./ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        WebDev Circle
      </Link>

      <div className="navbar-links">
        <Link to="/">Blog Posts</Link>
        <Link to="/post/1">Individual Post</Link>
        <Link to="/contact">Contact</Link>

        <button onClick={toggleTheme} className="theme-button">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;