import { supabase } from "./supabaseClient";
import { Database } from "./database.types";
import dayjs from "dayjs";

export const getAllProfiles = async () => {
  const { data, error } = await supabase.from("profiles").select("*");

  if (error) {
    throw error;
  }

  return data;
};

export const deleteProfile = async (profileUid: string) => {
  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("uid", profileUid);

  if (error) {
    throw error;
  }
};

export const editProfile = async (
  profileUid: string,
  profileData: Database["public"]["Tables"]["profiles"]["Update"],
) => {
  const { error } = await supabase
    .from("profiles")
    .update(profileData)
    .eq("uid", profileUid);

  if (error) {
    throw error;
  }
};

export const getAllEventsInlastYear = async () => {
  const { data, error } = await supabase
    .from("tazpi_events")
    .select("*")
    .gte("event_date", dayjs().subtract(1, "year").format("YYYY-MM-DD"));

  if (error) {
    throw error;
  }

  return data.map((event) => {
    return {
      ...event,
      event_date: dayjs(event.event_date).format("YYYY-MM-DD"),
    };
  });
};
