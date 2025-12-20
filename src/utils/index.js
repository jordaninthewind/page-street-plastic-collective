import { addMarkerToMapState } from "@app/utils/map/mapUtils";
import supabase from "@app/utils/supabase/supabaseClient";
import {
  addMarkerToMapRemote,
  getCoversFromSupabase,
} from "@app/utils/supabase/supabaseUtils";

export {
  getCoversFromSupabase,
  supabase,
  addMarkerToMapState,
  addMarkerToMapRemote,
};
