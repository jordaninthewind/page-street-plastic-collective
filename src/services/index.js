import { searchNearbyAddresses } from "@app/services/map/mapDataService";
import {
  addCommentToSupabase,
  createCoverRemote,
  getCommentsFromSupabase,
  getCoverInfoFromSupabase,
  getCoversFromSupabase,
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
  createCoverRemote,
  getCommentsFromSupabase,
  getCoverInfoFromSupabase,
  getCoversFromSupabase,
  getSingleCoverFromSupabase,
  logInUserRemote,
  logOutUserRemote,
  recordEventInSupabase,
  searchNearbyAddresses,
  signUpUserRemote,
  supabase,
  updateCoverRemote,
  updateCoverStateInSupabase
};

