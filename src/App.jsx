import React from 'react';

import { Layout } from './containers';
import { Contact, CoverTheCity, Model3D, Partners, Privacy, Problem, Solution } from './sections';

const App = () => (
    <Layout>
      <Problem />
      <Solution />
      <Model3D />
      <Partners />
      <CoverTheCity />
      <Contact />
      <Privacy />
    </Layout>
  );

export default App;
