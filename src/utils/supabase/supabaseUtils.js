import supabase from "@app/utils/supabase/supabaseClient";

export const getSingleCoverFromSupabase = async (id) => {
  const { data } = await supabase.from("drain_covers").select("*").eq("id", id);

  return data;
};

export const getCoversFromSupabase = async () => {
  const { data } = await supabase.from("drain_covers").select("*");

  return data;
};

export const addMarkerToMapRemote = async ({ lng, lat }) => {
  const { error, data } = await supabase
    .from("drain_covers")
    .insert({ location: `Point(${lng} ${lat})`, lng, lat });

  if (error) {
    throw error;
  }

  return data;
};

export const updateMarkerRemote = async ({ id, state }) => {
  const { error } = await supabase
    .from("drain_covers")
    .update({ state })
    .eq("id", id);

  if (error) {
    throw error;
  }

  return;
};
