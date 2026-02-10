import { createClient } from "@supabase/supabase-js";

import { formatEntry } from "@app/helpers";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Get a single cover from the database
export const getSingleCoverFromSupabase = async (id) => {
  try {
    const { data, error } = await supabase
      .from("drain_covers")
      .select("*")
      .eq("id", id);

    if (error) {
      throw error;
    }

    return data[0];
  } catch (error) {
    console.error("Error getting single cover from Supabase:", error);
    throw error;
  }
};

// Get all covers from the database
export const getCoversFromSupabase = async () =>
  await supabase.from("drain_covers").select("*");

// Add a marker to the map
export const addMarkerToMapRemote = async (fields) => {
  try {
    const { error } = await supabase
      .from("drain_covers")
      .insert(formatEntry(fields));

    if (error) {
      throw error;
    }

    return;
  } catch (error) {
    console.error(error);
  }
};

// Update a marker in the database
export const updateMarkerRemote = async ({ id, state }) => {
  try {
    const { error } = await supabase
      .from("drain_covers")
      .update({ state })
      .eq("id", id);

    if (error) {
      throw error;
    }

    return;
  } catch (error) {
    console.error(error);
  }
};
