import supabase from "@app/utils/supabase/supabaseClient";

export const getCoversFromSupabase = async () => {
  const { data, error } = await supabase.from("drain_covers").select();

  if (error) {
    throw error;
  }
  console.log("data", data);
  return data;
};

export const addMarkerToMap = async (lngLat) => {
  const { data, error } = await supabase
    .from("drain_covers")
    .insert({ longitude: lngLat[0], latitude: lngLat[1] });

  if (error) {
    throw error;
  }
  return data;
};
