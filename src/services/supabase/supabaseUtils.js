import { formatEntry } from "@app/helpers";
import { supabase } from "@app/services";

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

export const getCoversFromSupabase = async () => {
  try {
    const { data } = await supabase.from("drain_covers").select("*");

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addMarkerToMapRemote = async (fields) => {
  try {
    const { data, error } = await supabase
      .from("drain_covers")
      .insert(formatEntry(fields));

    if (error) {
      throw error;
    }

    return data[0];
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
