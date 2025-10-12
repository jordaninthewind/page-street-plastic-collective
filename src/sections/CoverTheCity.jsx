import { Section } from '../containers';

import './CoverTheCity.css';

const CoverTheCity = () => (
    <Section id="cover-the-city" title="Cover the City">
      <div className="cover-city-container">
        <div className="cover-city-content">
          <p>Our vision extends beyond Page Street. We aim to enable the whole city to cover their drain covers.</p>
          <div className="city-phases">
            <div className="phase-item">
              <div className="phase-number">1</div>
              <h3>Page Street</h3>
              <p>Starting with our local neighborhood from Market to Stanyan Street.</p>
            </div>
            <div className="phase-item">
              <div className="phase-number">2</div>
              <h3>Lower Haight & Haight Ashbury</h3>
              <p>Expanding to neighboring districts with similar drainage challenges.</p>
            </div>
            <div className="phase-item">
              <div className="phase-number">3</div>
              <h3>Citywide Coverage</h3>
              <p>Scaling our solution across all of San Francisco's storm drain network.</p>
            </div>
          </div>
          <div className="impact-stats">
            <div className="stat-item">
              <h4>10,000+</h4>
              <p>Storm drains in San Francisco</p>
            </div>
            <div className="stat-item">
              <h4>100%</h4>
              <p>Coverage goal for environmental protection</p>
            </div>
            <div className="stat-item">
              <h4>Community</h4>
              <p>Driven by local residents and organizations</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );

export default CoverTheCity;
