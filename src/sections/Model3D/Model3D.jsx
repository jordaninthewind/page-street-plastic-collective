import { Button } from '@mui/material';
import { usePostHog } from 'posthog-js/react';
import { useState } from 'react';
import { StlViewer } from 'react-stl-viewer';

import { COPY_PROPS } from '@app/constants';
import { Section } from '@app/containers';

import '@app/sections/Model3D/Model3D.css';

const modelUrl = 'https://cwzlegpvruihgjyzqemv.supabase.co/storage/v1/object/sign/models/Pipe%20Cover%20v4.stl?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kYTg4MzExZi0wOTVjLTQ1OWEtYmZhYS05YTdlNWI4YjY2NTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtb2RlbHMvUGlwZSBDb3ZlciB2NC5zdGwiLCJpYXQiOjE3NjAzMDQ0NTYsImV4cCI6MTc2Mjg5NjQ1Nn0.4ncYPjv3LCwSsTv8YA_E5rvDjNZxwFCDNWdkU6m8JoY';

const Model3D = () => {
  const { capture } = usePostHog();
  const [load, setLoad] = useState(false);

  const onViewClick = () => {
    setLoad(true);
    capture('model_viewed');
  };

  return (
    <Section id="model-3d" {...COPY_PROPS.model3D}>
      <div className="model-3d-container">
        <div className="model-3d-content">
          {load ?
            <div className="model-viewer">
              <StlViewer
                style={{
                  width: '100%',
                  height: '500px',
                  backgroundColor: 'darkgray',
                  borderRadius: '10px',
                }}
                orbitControls
                shadows
                url={modelUrl}
                modelProps={{
                  color: 'black',
                  metalness: 0.3,
                  roughness: 0.4,
                  scale: 3
                }}
              />
            </div>
            :
            <div className="model-viewer">
              <Button onClick={onViewClick} variant="contained" size="large" color="secondary">View V4 Model</Button>
            </div>
          }
          <div className="model-actions">
            <a href={modelUrl} download className="download-btn">
              📥 Download STL File
            </a>
            <div className="model-info">
              <h4>Model Specifications</h4>
              <ul>
                <li>Format: STL (Stereolithography)</li>
                <li>Compatible with all 3D printers</li>
                <li>Optimized for FDM printing</li>
                <li>Material: PLA or ABS recommended, or stronger materials</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Model3D;
