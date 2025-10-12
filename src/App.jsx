import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

import { Layout } from '@app/containers';
import { Contact, CoverTheCity, Model3D, Partners, Privacy, Problem, SocialLinks, Solution, SupportUs } from '@app/sections';

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: '2025-05-24',
});

const App = () => (
  <PostHogProvider client={posthog}>
    <Layout>
      <Problem />
      <Solution />
      <Model3D />
      <Partners />
      <CoverTheCity />
      <Contact />
      <SupportUs />
      <SocialLinks />
      <Privacy />
    </Layout>
  </PostHogProvider>
 );

export default App;
