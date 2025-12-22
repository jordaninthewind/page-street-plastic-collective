import supabase from "@app/services/supabase/supabaseClient";
import {
  addMarkerToMapRemote,
  getCoversFromSupabase,
  getSingleCoverFromSupabase,
  updateMarkerRemote,
} from "@app/services/supabase/supabaseUtils";

export {
  supabase,
  addMarkerToMapRemote,
  getCoversFromSupabase,
  updateMarkerRemote,
  getSingleCoverFromSupabase,
};
