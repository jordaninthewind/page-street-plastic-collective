import { searchNearbyAddresses } from "@app/services/map/MapDataService";
import {
  addCommentToSupabase,
  addCoverToMapRemote,
  getCommentsFromSupabase,
  getCoversFromSupabase,
  getEventsFromSupabase,
  getSingleCoverFromSupabase,
  logInUserRemote,
  logOutUserRemote,
  recordEventInSupabase,
  signUpUserRemote,
  supabase,
  updateCoverRemote,
  updateCoverStateInSupabase,
} from "@app/services/supabase/supabaseService";

export {
  addCommentToSupabase,
  addCoverToMapRemote,
  getCommentsFromSupabase,
  getCoversFromSupabase,
  getEventsFromSupabase,
  getSingleCoverFromSupabase,
  logInUserRemote,
  logOutUserRemote,
  recordEventInSupabase,
  searchNearbyAddresses,
  signUpUserRemote,
  supabase,
  updateCoverRemote,
  updateCoverStateInSupabase,
};
