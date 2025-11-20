import DrainVaderImage from '@app/assets/draINvader.png';
import { COPY_PROPS } from '@app/constants';
import { Section } from '@app/containers';

import '@app/sections/Partners/Partners.css';

const Partners = () => (
  <Section id="partners" {...COPY_PROPS.partners}>
    <div className="partners-container">
      <div className="partners-content">
        <div className="partners-grid">
          <div className="partner-item">
            <h3>draINvader</h3>
            <p>Inspired by Space Invader, draINvader uses multi-colored filament to create art and cover the city!</p>
            <img src={DrainVaderImage} alt="draINvader" width="100%" />
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
