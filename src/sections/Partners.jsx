import { Section } from '../containers';

import './Partners.css';

const Partners = () => (
    <Section id="partners" title="Partners">
      <div className="partners-container">
        <div className="partners-content">
          <p>We are a loose collective of neighbors who want to solve local problems creatively and sustainably.</p>
          <div className="partners-grid">
            <div className="partner-item">
              <h3>draINvader</h3>
              <p>Inspired by Space Invader, draINvader uses multi-colored filament to create art and cover the city!</p>
              <a href="https://www.instagram.com/drainvader/" target="_blank" rel="noopener noreferrer">draINvader</a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );

export default Partners;
