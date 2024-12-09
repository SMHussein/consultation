"use server";
import { createClient } from "../_utils/supabase/server";
import { getTranslations } from "next-intl/server";
// await new Promise((resolve) => setTimeout(resolve, 5000));

export async function newsLetterSubsribe(currentState, formData) {
  const t = await getTranslations("responses");
  const supabase = await createClient();
  const email = formData.get("email");
  const name = formData.get("name");

  if (!name || !email) {
    return {
      error: t("error.fields"),
    };
  }

  const { data, error } = await supabase
    .from("news")
    .insert([{ name, email }])
    .select();

  if (error) {
    return {
      error: t("error.generic"),
    };
  }

  return {
    success: t("success.subscribe"),
  };
}

export async function sendMessage(currentState, formData) {
  const t = await getTranslations("responses");
  const supabase = await createClient();
  const email = formData.get("email");
  const name = formData.get("name");
  const phone = formData.get("phone");
  const message = formData.get("message");

  if (!name || !email || !phone || !message) {
    return {
      error: t("error.fields"),
    };
  }

  const { data, error } = await supabase
    .from("messages")
    .insert([{ message, phone, name, email }])
    .select();

  if (error) {
    return {
      error: t("error.generic"),
    };
  }

  return {
    success: t("success.contact"),
  };
}
