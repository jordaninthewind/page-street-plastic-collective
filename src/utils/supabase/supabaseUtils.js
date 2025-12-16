import supabase from "@app/utils/supabase/supabaseClient";

export const getDrainCovers = async () => {
  const { data, error } = await supabase.from("drain_covers").select("*");

  if (error) {
    throw error;
  }
  return data;
};
