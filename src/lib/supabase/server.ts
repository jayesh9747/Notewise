import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react";
import type { Note, Folder } from "./client";

// Use createServerClient from @supabase/ssr package
export const createServerSupabaseClient = cache(async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) => {
          cookieStore.set(name, value, options);
        },
        remove: (name, options) => {
          cookieStore.set(name, "", { ...options, maxAge: 0 });
        },
      },
    }
  );
});

// Get the current authenticated user
export async function getCurrentUser() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("user", user);

  return user;
}

// Get all notes for the current user
export async function getNotesFromServer() {
  const supabase = await createServerSupabaseClient();

  // The RLS policy will automatically filter to only show the user's own notes
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("updated_at", { ascending: false });

  console.log("data", data);

  if (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }

  return data as Note[];
}

// Get starred notes for the current user
export async function getStarredNotesFromServer() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("is_starred", true)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching starred notes:", error);
    throw error;
  }

  return data as Note[];
}

// Get recent notes for the current user
export async function getRecentNotesFromServer() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching recent notes:", error);
    throw error;
  }

  return data as Note[];
}

// Get folders for the current user
export async function getFoldersFromServer() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("folders")
    .select("*")
    .order("name", { ascending: true });

    console.log("data", data);

  if (error) {
    console.error("Error fetching folders:", error);
    throw error;
  }

  return data as Folder[];
}

// Get notes by folder for the current user
export async function getNotesByFolderFromServer(folderId: string) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("folder_id", folderId)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching notes by folder:", error);
    throw error;
  }

  return data as Note[];
}

// Get a specific note by ID for the current user
export async function getNoteFromServer(id: string) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching note:", error);
    throw error;
  }

  return data as Note;
}
