import { searchNearbyAddresses } from "@app/services/map/MapDataService";
import {
  addCommentToSupabase,
  addMarkerToMapRemote,
  getCommentsFromSupabase,
  getCoversFromSupabase,
  getSingleCoverFromSupabase,
  logInUserRemote,
  logOutUserRemote,
  recordEventInSupabase,
  signUpUserRemote,
  supabase,
  updateMarkerRemote,
  updateMarkerStateInSupabase,
} from "@app/services/supabase/supabaseService";

export {
  addCommentToSupabase,
  addMarkerToMapRemote,
  getCommentsFromSupabase,
  getCoversFromSupabase,
  getSingleCoverFromSupabase,
  logInUserRemote,
  logOutUserRemote,
  recordEventInSupabase,
  searchNearbyAddresses,
  signUpUserRemote,
  supabase,
  updateMarkerRemote,
  updateMarkerStateInSupabase,
};
