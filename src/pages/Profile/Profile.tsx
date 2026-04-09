import "./Profile.css";

import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Map", href: "/map" },
  { label: "Print a Cover", href: "/#model-3d" },
  { label: "Support Us", href: "/?overlay=support-us" },
  { label: "Contribute", href: "/#contributors" },
];

const STATS = [
  { number: "10K+", label: "Drain Covers" },
  { number: "100%", label: "Open Source" },
  { number: "SF", label: "Based" },
];

const Profile = () => {
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
      {/* Top bar */}
      <header className="profile-topbar">
        <span className="profile-topbar-logo">PSPC</span>
        <span className="profile-topbar-subtitle">
          PAGE STREET PLASTIC COLLECTIVE
        </span>
        <a href="/" className="profile-topbar-back">
          ← BACK
        </a>
      </header>

      {/* Main content */}
      <main className="profile-main">
        {/* Left: Identity */}
        <section className="profile-identity">
          <div className="profile-eyebrow">COLLECTIVE PROFILE — SF, CA</div>

          <h1 className="profile-name">
            PAGE
            <br />
            STREET
            <br />
            PLASTIC
          </h1>

          <div className="profile-rule" />

          <p className="profile-bio">
            A loose collective of neighbors who want to solve local problems
            creatively and sustainably. We replace stolen steel drain covers
            with open-source, 3D-printable ones.
          </p>

          <div className="profile-tags">
            <span className="profile-tag">HAIGHT / SF</span>
            <span className="profile-tag">3D PRINT</span>
            <span className="profile-tag">OPEN SOURCE</span>
            <span className="profile-tag">COMMUNITY</span>
          </div>
        </section>

        {/* Right: Visual + stats */}
        <section className="profile-visual">
          <div className="profile-image-frame">
            <div className="profile-image-hatch">
              <div className="profile-image-badge">COLLECTIVE</div>
            </div>
          </div>

          <div className="profile-stats">
            {STATS.map((stat) => (
              <div key={stat.label} className="profile-stat">
                <span className="profile-stat-number">{stat.number}</span>
                <span className="profile-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Scroll hint */}
      <div
        className={`profile-scroll-hint${menuVisible ? " profile-scroll-hint--hidden" : ""}`}
      >
        SCROLL DOWN FOR MENU ↓
      </div>

      {/* Scroll-triggered bottom menu */}
      <nav
        className={`profile-menu${menuVisible ? " profile-menu--visible" : ""}`}
      >
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href} className="profile-menu-item">
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Profile;
