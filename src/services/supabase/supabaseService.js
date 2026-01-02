import { createClient } from "@supabase/supabase-js";

import { formatEntry } from "@app/helpers";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const getSingleCoverFromSupabase = async (id) => {
  try {
    const { data } = await supabase
      .from("drain_covers")
      .select("*")
      .eq("id", id);

    return data[0];
  } catch (error) {
    console.error(error);
  }
};

export const getCoversFromSupabase = async () =>
  await supabase.from("drain_covers").select("*");

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
