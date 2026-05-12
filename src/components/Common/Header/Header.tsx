import { useState } from "react";
import { Link } from "react-router";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Map", href: "/map" },
  { label: "Print a Cover", href: "/?overlay=model" },
  { label: "Contribute", href: "/?overlay=contribute" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="topbar">
      <span className="topbar-logo">
        <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
          PSPC
        </Link>
      </span>
      <span className="topbar-subtitle">PAGE STREET PLASTIC COLLECTIVE</span>
      <button
        className={`hamburger${menuOpen ? " hamburger--open" : ""}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>
      {menuOpen && (
        <nav className="topbar-dropdown">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="topbar-dropdown-item"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
