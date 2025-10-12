import DrainVaderImage from '@app/assets/draINvader.png';
import { Section } from '@app/containers';

import './Partners.css';

const title = 'Partners';
const subtitle = 'We are a loose collective of neighbors who want to solve local problems creatively and sustainably.';

const Partners = () =>  (
  <Section id="partners" title={title} subtitle={subtitle}>
    <div className="partners-container">
      <div className="partners-content">
        <div className="partners-grid">
          <div className="partner-item">
            <h3>draINvader</h3>
            <p>Inspired by Space Invader, draINvader uses multi-colored filament to create art and cover the city!</p>
            <img src={DrainVaderImage} alt="draINvader" />
            <a 
              href="https://www.instagram.com/drainvader/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="instagram-link"
            >
              Follow @draINvader for more updates!
            </a>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

export default Partners;
