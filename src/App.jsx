import React from 'react'

import { Layout } from './containers'
import { Contact, Goals, Models, Privacy, Problem, Solution } from './sections'

const App = () => (
    <Layout>
      <Problem />
      <Solution />
      <Models />
      <Goals />
      <Contact />
      <Privacy />
    </Layout>
  );

export default App;
