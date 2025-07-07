const SUPABASE_URL = import.meta.env.VITE_REACT_APP_SAVE_ENDPOINT_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_REACT_APP_AUTHORIZATION_TOKEN;

export const saveMessage = async (message) => {
  const response = await fetch(SUPABASE_URL, {
    method: 'POST',
    body: JSON.stringify(message),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': SUPABASE_ANON_KEY
    }
  });

  return response.json();
};