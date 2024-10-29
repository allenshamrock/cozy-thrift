import { Tprofile } from "@/types/supabaseTypes";
import { createClient } from "./supabase/server";

export interface TuserSession extends Tprofile {
  email: string | undefined;
}

export const getUserSession = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  //get user profile
  const { data: profile, error } = await supabase
    .from("users")
    .select()
    .eq("id", user.id)
    .single();

  if (error) throw new Error("Could not fetch user profile");
  return {
    ...profile,
    email: user.email,
  };
};
