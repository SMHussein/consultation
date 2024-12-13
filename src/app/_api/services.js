import { createClient } from "../_utils/supabase/server";

export async function getJobs() {
  const supabase = await createClient();
  let { data: jobs, error } = await supabase.from("jobs").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return jobs;
}

export async function getApplicants(id) {
  const supabase = await createClient();
  let { data: applicants, error } = await supabase
    .from("applicants")
    .select("*")
    .eq("job_id", id);

  if (error) {
    throw new Error(error.message);
  }

  return applicants;
}

export async function getUser() {
  const supabase = await createClient();

  let { data: user, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error.message);
    return null;
  }
  return user;
}
