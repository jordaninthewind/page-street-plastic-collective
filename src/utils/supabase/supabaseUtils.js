import supabase from "@app/utils/supabase/supabaseClient";

export const getCoversFromSupabase = async () => {
  const { data } = await supabase.from("drain_covers").select("*");

  return data;
};

export const addMarkerToMapRemote = async ({ lng, lat }) => {
  const { error } = await supabase
    .from("drain_covers")
    .insert({ location: `Point(${lng} ${lat})`, lng, lat });

  if (error) {
    throw error;
  }

  return;
};
