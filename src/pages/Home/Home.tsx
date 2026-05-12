import CoverLogo from "@app/assets/cover-logo.svg";

import "./Home.css";

const STATS = [
  { number: "10K+", label: "Drain Covers" },
  { number: "100%", label: "Open Source" },
  { number: "SF", label: "Based" },
];

const Home = () => (
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
  </div>
);

export default Home;
