import { Link } from "react-router";

const Header = () => (
  <header className="topbar">
    <span className="topbar-logo">
      <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
        PSPC
      </Link>
    </span>
    <span className="topbar-subtitle">PAGE STREET PLASTIC COLLECTIVE</span>
  </header>
);

export default Header;
