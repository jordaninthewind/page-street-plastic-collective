import { PostHogProvider } from 'posthog-js/react';

import { Layout } from '@app/containers';
import { Contact, CoverTheCity, Model3D, Partners, Privacy, Problem, SocialLinks, Solution } from '@app/sections';

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: '2025-05-24',
}

const App = () => (
  <PostHogProvider
    options={options}
    apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
  >
    <Layout>
      <Problem />
      <Solution />
      <Model3D />
      <Partners />
      <CoverTheCity />
      <Contact />
      <SocialLinks />
      <Privacy />
    </Layout>
  </PostHogProvider>
 );

export default App;
