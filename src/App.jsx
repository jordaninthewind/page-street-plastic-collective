import React from 'react';

import { Layout } from './containers';
import { Contact, CoverTheCity, Model3D, Models, Partners, Privacy, Problem, Solution } from './sections';

const App = () => (
    <Layout>
      <Problem />
      <Solution />
      <CoverTheCity />
      <Partners />
      <Models />
      <Model3D />
      <Contact />
      <Privacy />
    </Layout>
  );

export default App;
