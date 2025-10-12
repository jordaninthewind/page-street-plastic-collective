import React from 'react'

import { Layout } from './containers'
import { Contact, CoverTheCity, Goals, Models, Partners, Privacy, Problem, Solution } from './sections'

const App = () => (
    <Layout>
      <Problem />
      <Solution />
      <Contact />
      <Goals />
      <CoverTheCity />
      <Partners />
      <Models />
      <Privacy />
    </Layout>
  );

export default App;
