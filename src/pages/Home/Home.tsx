import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import CoverLogo from "@app/assets/cover-logo.svg";

import "./Home.css";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Map", href: "/map" },
  { label: "Print a Cover", href: "/?overlay=model" },
  { label: "Contribute", href: "/?overlay=contribute" },
];

const STATS = [
  { number: "10K+", label: "Drain Covers" },
  { number: "100%", label: "Open Source" },
  { number: "SF", label: "Based" },
];


const Home = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const touchStartY = useRef(0);


  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) setMenuVisible(true);
      else setMenuVisible(false);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const delta = touchStartY.current - (e.touches[0]?.clientY ?? 0);
      if (delta > 10) setMenuVisible(true);
      else if (delta < -10) setMenuVisible(false);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className="profile">
      <main className="profile-main">
        <section className="profile-identity">
          <div className="eyebrow">One cover at a time</div>

          <h1 className="profile-name">
            PAGE
            <br />
            STREET
            <br />
            PLASTIC
            <br />
            COLLECTIVE
          </h1>

          <div className="rule" />

          <p className="profile-bio">
            A loose collective of neighbors who want to solve local problems
            creatively and sustainably. We replace stolen steel drain covers
            with open-source, 3D-printable ones.
          </p>

          <div className="profile-tags">
            <span className="tag">LOWER HAIGHT / SF</span>
            <span className="tag">COMMUNITY</span>
            <span className="tag">3D PRINT</span>
          </div>
        </section>

        {/* Right: Visual + stats */}
        <section className="profile-visual">
          <div className="profile-image-frame">
            <div className="hatch">
              <div className="hatch-badge">
                <img src={CoverLogo as string} alt="Cover Logo" />
              </div>
            </div>
          </div>

          <div className="profile-stats">
            {STATS.map((stat) => (
              <div key={stat.label} className="stat">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Scroll hint */}
      <div
        className={`scroll-hint${menuVisible ? " scroll-hint--hidden" : ""}`}
      >
        SCROLL DOWN FOR MENU ↓
      </div>

      {/* Scroll-triggered bottom menu */}
      <nav
        className={`bottom-menu${menuVisible ? " bottom-menu--visible" : ""}`}
      >
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} to={item.href} className="bottom-menu-item">
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Home;
