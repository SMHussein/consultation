"use server";

import { createClient } from "../_utils/supabase/server";
// await new Promise((resolve) => setTimeout(resolve, 5000));

export async function newsLetterSubsribe(currentState, formData) {
  const supabase = await createClient();
  const email = formData.get("email");
  const name = formData.get("name");

  if (!name || !email) {
    return {
      error: "Please fill out the fields correctly",
    };
  }

  const { data, error } = await supabase
    .from("news")
    .insert([{ name, email }])
    .select();

  if (error) {
    return {
      error: "Something went wrong. Please try again later.",
    };
  }

  return {
    success: "Thank you for subscribing to our newsletter!",
  };
}

export async function sendMessage(currentState, formData) {
  const supabase = await createClient();
  const email = formData.get("email");
  const name = formData.get("name");
  const phone = formData.get("phone");
  const message = formData.get("message");

  if (!name || !email || !phone || !message) {
    return {
      error: "Please fill out the fields correctly",
    };
  }

  const { data, error } = await supabase
    .from("messages")
    .insert([{ message, phone, name, email }])
    .select();

  if (error) {
    return {
      error: "Something went wrong. Please try again later.",
    };
  }

  return {
    success: "Thank you for reaching out to us!",
  };
}
