import React from 'react';

import { Layout } from './containers';
import { Contact, CoverTheCity, Model3D, Partners, Privacy, Problem, Solution } from './sections';

const App = () => (
    <Layout>
      <Problem />
      <Solution />
      <CoverTheCity />
      <Partners />
      <Model3D />
      <Contact />
      <Privacy />
    </Layout>
  );

export default App;
