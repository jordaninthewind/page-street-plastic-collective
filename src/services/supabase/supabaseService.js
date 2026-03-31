import { createClient } from "@supabase/supabase-js";

import { formatEntry } from "@app/helpers";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const signUpUserRemote = async (email, password, name) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const logInUserRemote = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const logOutUserRemote = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};

// Get a single cover from the database
export const getSingleCoverFromSupabase = async (id) => {
  try {
    const { data, error } = await supabase
      .from("drain_covers")
      .select("*")
      .eq("id", id);

    if (error) {
      throw error;
    }

    return data[0];
  } catch (error) {
    console.error("Error getting single cover from Supabase:", error);
    throw error;
  }
};

export const getCommentsFromSupabase = async (id) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("marker_id", id);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error getting comments from Supabase:", error);
    throw error;
  }
};

export const addCommentToSupabase = async (comment) => {
  try {
    const { error } = await supabase.from("comments").insert(comment);

    if (error) {
      throw error;
    }

    return;
  } catch (error) {
    console.error("Error adding comment to Supabase:", error);
    throw error;
  }
};

export const updateCoverStateInSupabase = async ({ id, covered }) => {
  try {
    const { error } = await supabase
      .from("drain_covers")
      .update({ covered })
      .eq("id", id);

    if (error) {
      throw error;
    }

    return;
  } catch (error) {
    console.error("Error updating marker state in Supabase:", error);
    throw error;
  }
};

// Get all covers from the database
export const getCoversFromSupabase = async () =>
  await supabase.from("drain_covers").select("*");

// Add a marker to the map
export const addCoverToMapRemote = async (fields) => {
  try {
    const { error } = await supabase
      .from("drain_covers")
      .insert(formatEntry(fields));

    if (error) {
      throw error;
    }

    return;
  } catch (error) {
    console.error(error);
  }
};

// Update a marker in the database
export const updateCoverRemote = async ({ id, state }) => {
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

export const getEventsFromSupabase = async (id) => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("cover_id", id);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error getting events from Supabase:", error);
    throw error;
  }
};

export const recordEventInSupabase = async ({ event }) => {
  try {
    const { error } = await supabase.from("events").insert(event);

    if (error) {
      throw error;
    }

    return;
  } catch (error) {
    console.error("Error recording event in Supabase:", error);
    throw error;
  }
};
