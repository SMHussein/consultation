import { createClient } from '../_utils/supabase/server';

export async function getJobs() {
  const supabase = await createClient();
  let { data: jobs, error } = await supabase.from('jobs').select('*');
  let { data: applicants, error: applicantsError } = await supabase
    .from('applicants')
    .select('*');
  let { data: archivedApplicants, error: archivedError } = await supabase
    .from('archive')
    .select('*');

  if (error || applicantsError || archivedError) {
    throw new Error(error);
  }

  return { applicants, jobs, archivedApplicants };
}

export async function getArchivedApplicants() {
  const supabase = await createClient();
  let { data: applicants, error: applicantsError } = await supabase
    .from('archive')
    .select('*');

  if (applicantsError) {
    throw new Error(error);
  }

  return applicants;
}

export async function getApplicants(id) {
  const supabase = await createClient();
  let { data: applicants, error } = await supabase
    .from('applicants')
    .select('*')
    .eq('job_id', id);

  if (error) {
    throw new Error(error.message);
  }

  return applicants;
}

export async function getNewsletterEmails() {
  const supabase = await createClient();

  let { data: emails, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error.message);
    return null;
  }
  return emails;
}

export async function getMessages() {
  const supabase = await createClient();

  let { data: messages, error } = await supabase
    .from('messages')
    .select('*')
    .eq('origin', 'ecmc')
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error.message);
    return null;
  }
  return messages;
}

export async function getApplicantById(id) {
  const supabase = await createClient();
  let { data: applicant, error } = await supabase
    .from('applicants')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return applicant;
}

export async function getArchivedApplicantById(id) {
  const supabase = await createClient();
  let { data: applicant, error } = await supabase
    .from('archive')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return applicant;
}
