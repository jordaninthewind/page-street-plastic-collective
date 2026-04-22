import { createClient } from "@supabase/supabase-js";

import { formatEntry } from "@app/helpers";
import type { Cover } from "@app/types";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string
);

export const signUpUserRemote = async (
  email: string,
  firstName: string,
  lastName: string,
  phone: string
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: Math.random().toString(36).substring(2, 15),
      phone,
      options: {
        data: { first_name: firstName, last_name: lastName },
        emailRedirectTo: import.meta.env.VITE_SUPABASE_REDIRECT_URL as string,
      },
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const logInUserWithOtpRemote = async (phone: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({ phone });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error logging in user with OTP:", error);
    throw error;
  }
};

export const logInUserRemote = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const logOutUserRemote = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};

export const getSingleCoverFromSupabase = async (id: string | number): Promise<Cover | undefined> => {
  try {
    const { data, error } = await supabase
      .from("drain_covers")
      .select("*")
      .eq("id", id);

    if (error) throw error;
    return data[0] as Cover | undefined;
  } catch (error) {
    console.error("Error getting single cover from Supabase:", error);
    throw error;
  }
};

export const getCommentsFromSupabase = async (id: string | number) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .limit(10)
      .order("created_at", { ascending: false })
      .eq("cover_id", id);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting comments from Supabase:", error);
    throw error;
  }
};

export const addCommentToSupabase = async (comment: unknown): Promise<void> => {
  try {
    const { error } = await supabase.from("comments").insert(comment);
    if (error) throw error;
  } catch (error) {
    console.error("Error adding comment to Supabase:", error);
    throw error;
  }
};

export const updateCoverStateInSupabase = async ({
  id,
  covered,
}: {
  id: string | number;
  covered: boolean;
}): Promise<void> => {
  try {
    const { error } = await supabase
      .from("drain_covers")
      .update({ covered })
      .eq("id", id);

    if (error) throw error;
  } catch (error) {
    console.error("Error updating marker state in Supabase:", error);
    throw error;
  }
};

export const getCoversFromSupabase = async (): Promise<Cover[]> => {
  try {
    const { data, error } = await supabase
      .from("drain_covers")
      .select("id, created_at, covered, lat, lng, requested_by, address, events(*), comments(*)");

    if (error) throw error;
    return data as Cover[];
  } catch (error) {
    console.error("Error getting covers from Supabase:", error);
    throw error;
  }
};

export const createCoverRemote = async (fields: unknown): Promise<void> => {
  try {
    const { error } = await supabase
      .from("drain_covers")
      .insert(formatEntry(fields as Parameters<typeof formatEntry>[0]));

    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};

export const updateCoverRemote = async ({
  id,
  state,
}: {
  id: string | number;
  state: unknown;
}): Promise<void> => {
  try {
    const { error } = await supabase
      .from("drain_covers")
      .update({ state })
      .eq("id", id);

    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};

export const getEventsFromSupabase = async (id: string | number) => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("cover_id", id);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting events from Supabase:", error);
    throw error;
  }
};

export const getCoverInfoFromSupabase = async (id: string | number): Promise<Cover | undefined> => {
  try {
    const { data, error } = await supabase
      .from("drain_covers")
      .select("*, events(*), comments(*)")
      .eq("id", id);

    if (error) throw error;
    return data[0] as Cover | undefined;
  } catch (error) {
    console.error("Error getting cover info from Supabase:", error);
    throw error;
  }
};

export const recordEventInSupabase = async ({ event }: { event: unknown }): Promise<void> => {
  try {
    const { error } = await supabase.from("events").insert(event);
    if (error) throw error;
  } catch (error) {
    console.error("Error recording event in Supabase:", error);
    throw error;
  }
};
