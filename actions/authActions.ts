"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FieldValues } from "react-hook-form";
import { signupFormSchema } from "@/components/forms/SignUpForm";
import {createProfile} from './profileAction'
import { signInFormSchema } from "@/components/forms/SignInForm";

export async function authActions(data: FieldValues) {
  const supabase = createClient();
  const { email, password } = data;

  const signInData = {
    email,
    password,
  };

  const { error } = await supabase.auth.signInWithPassword(signInData);
  if (error) {
    redirect(`/signin?message=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(data: FieldValues) {
  const supabase = createClient();
  const { email, password, firstName, lastName } = data;

  const signUpData = {
    email,
    password,
    firstName,
    lastName,
  };

  const { error, data: user } = await supabase.auth.signUp(signUpData);

  if (error) {
    redirect(`/signup?message=${error.message}`);
  }

  const userId = user.user?.id;

  // create user profile
  if (userId) {
     await createProfile({ firstName, lastName, userId });
  }
  revalidatePath("/", "layout");
  redirect("/signin");
}

export async function signout(){
    const supabase = createClient()

    // check if user is logged in
    const {data:{user}} = await supabase.auth.getUser()

    if(user){
        await supabase.auth.signOut()
    }

    revalidatePath('/','layout')
}
