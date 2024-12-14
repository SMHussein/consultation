"use server";
import { createClient } from "../_utils/supabase/server";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

// await new Promise((resolve) => setTimeout(resolve, 5000));

const jobIds = {
  "associate-consultant": 1,
  "marketing-specialist": 2,
  manager: 3,
  "market-research-associate": 4,
  "finance-manager": 5,
  "office-administrator": 6,
  hr: 7,
  it: 8,
  "partnership-specialist": 9,
  "senior-advisory-operations-specialist": 10,
};

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

export async function jobApply(currentState, formData) {
  const t = await getTranslations("responses");
  const supabase = await createClient();
  const email = formData.get("email");
  const name = formData.get("name");
  const phone = formData.get("phone");
  const location = formData.get("location");
  const company = formData.get("company");
  const linkedin = formData.get("linkedin");
  const nationality = formData.get("nationality");
  const university = formData.get("university");
  const arabic = formData.get("arabic");
  const english = formData.get("english");
  const salary = formData.get("salary");
  const extraInfo = formData.get("extraInfo");
  const cv = formData.get("cv");
  const job = formData.get("job");
  const storageUrl = process.env.SUPABASE_STORAGE_URL;
  const cvName = `${Math.random()}-${cv?.name}`.replaceAll(" ", "-");
  const cvPath = `${storageUrl}/${cvName}`;
  const jobId = jobIds[job];

  if (!jobId) {
    return {
      error: t("error.job"),
    };
  }
  if (cv?.size > 1000000) {
    return {
      error: t("error.size"),
    };
  }

  if (
    !name ||
    !email ||
    !phone ||
    !cv ||
    !location ||
    !linkedin ||
    !nationality ||
    !university ||
    !arabic ||
    !english ||
    !salary
  ) {
    return {
      error: t("error.fields"),
    };
  }

  const { data, error } = await supabase
    .from("applicants")
    .insert([
      {
        name,
        email,
        phone,
        location,
        company,
        linkedin,
        nationality,
        university,
        arabic,
        english,
        salary,
        extraInfo,
        cv: cvPath,
        job_id: jobId,
      },
    ])
    .select();

  if (error) {
    console.log(error);
    return {
      error: t("error.generic"),
    };
  }

  const { error: storageError } = await supabase.storage
    .from("cvs")
    .upload(cvName, cv);

  if (storageError) {
    await supabase.from("applicants").delete().eq("id", data.at(0).id);
    throw new Error(`CV could not be uploaded - ${storageError.message}`);
  }

  return {
    success: t("success.apply"),
  };
}

export async function logout(params) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
  }

  redirect("/");
}

export async function login(currentState, formData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error);
    return {
      error: "Username or password are invalid",
    };
  }

  redirect("/admin");
}
