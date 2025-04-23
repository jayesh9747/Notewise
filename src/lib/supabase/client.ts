import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Note = {
  id: string;
  user_id: string;
  title: string;
  content: string | null;
  is_starred: boolean;
  folder_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Folder = {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
};

export async function getNotes() {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data as Note[];
}

export async function getNote(id: string) {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Note;
}

export async function createNote(
  note: Omit<Note, "id" | "user_id" | "created_at" | "updated_at">
) {
  // Get the current authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("notes")
    .insert([
      {
        ...note,
        user_id: user.id,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data as Note;
}

export async function updateNote(id: string, note: Partial<Note>) {
  const { data, error } = await supabase
    .from("notes")
    .update({ ...note, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Note;
}

export async function deleteNote(id: string) {
  const { error } = await supabase.from("notes").delete().eq("id", id);

  if (error) throw error;
  return true;
}

export async function getStarredNotes() {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("is_starred", true)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data as Note[];
}

export async function getRecentNotes() {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(10);

  if (error) throw error;
  return data as Note[];
}

export async function searchNotes(query: string) {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data as Note[];
}

export async function getFolders() {
  const { data, error } = await supabase
    .from("folders")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;
  return data as Folder[];
}

export async function createFolder(name: string) {
  // Get the current authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("folders")
    .insert([
      {
        name,
        user_id: user.id,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data as Folder;
}

export async function getNotesByFolder(folderId: string) {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("folder_id", folderId)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data as Note[];
}
