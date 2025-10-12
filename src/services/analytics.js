import posthog from 'posthog-js';

export const trackEvent = (event, properties) => {
  posthog.capture(event, properties);
};

export const identifyUser = (userId) => {
  posthog.identify(userId);
};

export const resetUser = () => {
  posthog.reset();
};