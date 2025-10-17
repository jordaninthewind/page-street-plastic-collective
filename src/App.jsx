import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

import { Header, Sections } from '@app/components';
import { Layout } from '@app/containers';

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: '2025-05-24'
});

const App = () => (
  <PostHogProvider client={posthog}>
    <Layout>
      <Header />
      <Sections />
    </Layout>
  </PostHogProvider>
);

export default App;
