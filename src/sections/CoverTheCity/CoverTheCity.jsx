import { Divider } from '@mui/material';

import { Section } from '@app/containers';

import '@app/sections/CoverTheCity/CoverTheCity.css';

const CoverTheCity = (props) => (
  <Section id="cover-the-city" {...props}>
    <div className="cover-city-container">
      <div className="cover-city-content">
        <div className="city-phases">
          <div className="phase-item phase-item-active">
            <div className="phase-number">1</div>
            <h3>Page Street</h3>
            <p>Starting with our local neighborhood from Market to Stanyan Street.</p>
            <Divider sx={{ margin: '10px 0' }} />
            <p style={{ color: '#ff00cc', fontStyle: 'italic' }}>We have nearly covered 100% of the drain covers in Page Street.</p>
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
          <div className="phase-item">
            <div className="phase-number">4</div>
            <h3>WORLDWIDE</h3>
            <p>Scaling our solution across the world.</p>
            <p>(Okay, maybe not the whole world, but we can dream!)</p>
          </div>
        </div>
        <div className="impact-stats">
          <div className="stat-item">
            <h4>10,000+</h4>
            <p>Building drain covers in San Francisco</p>
          </div>
          <div className="stat-item">
            <h4>100%</h4>
            <p>Coverage goal for all drain covers in San Francisco</p>
          </div>
          <div className="stat-item">
            <h4>Community</h4>
            <p>Driven by local residents and organizations</p>
          </div>
          <div className="stat-item">
            <h4>Worldwide</h4>
            <p>Scaling our solution across the world.</p>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

export default CoverTheCity;
