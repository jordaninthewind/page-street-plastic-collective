import React from 'react';

import { Layout } from './containers';
import { Contact, CoverTheCity, Models, Partners, Privacy, Problem, Solution } from './sections';

const App = () => (
    <Layout>
      <Problem />
      <Solution />
      <CoverTheCity />
      <Partners />
      <Models />
      <Contact />
      <Privacy />
    </Layout>
  );

export default App;
