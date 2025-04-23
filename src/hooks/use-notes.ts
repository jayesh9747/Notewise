import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getNotes, 
  getNote, 
  createNote, 
  updateNote, 
  deleteNote, 
  getStarredNotes, 
  getRecentNotes, 
  searchNotes,
  getNotesByFolder
} from '@/lib/supabase/client';
import type { Note } from '@/lib/supabase/client';

export function useNotes() {
  return useQuery({
    queryKey: ['notes'],
    queryFn: getNotes
  });
}

export function useNote(id: string) {
  return useQuery({
    queryKey: ['notes', id],
    queryFn: () => getNote(id),
    enabled: !!id
  });
}

export function useStarredNotes() {
  return useQuery({
    queryKey: ['notes', 'starred'],
    queryFn: getStarredNotes
  });
}

export function useRecentNotes() {
  return useQuery({
    queryKey: ['notes', 'recent'],
    queryFn: getRecentNotes
  });
}

export function useSearchNotes(query: string) {
  return useQuery({
    queryKey: ['notes', 'search', query],
    queryFn: () => searchNotes(query),
    enabled: query.length > 0
  });
}

export function useNotesByFolder(folderId: string) {
  return useQuery({
    queryKey: ['notes', 'folder', folderId],
    queryFn: () => getNotesByFolder(folderId),
    enabled: !!folderId
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (note: Omit<Note, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => 
      createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    }
  });
}

export function useUpdateNote() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, note }: { id: string; note: Partial<Note> }) => 
      updateNote(id, note),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['notes', data.id] });
      
      if (data.is_starred) {
        queryClient.invalidateQueries({ queryKey: ['notes', 'starred'] });
      }
      
      queryClient.invalidateQueries({ queryKey: ['notes', 'recent'] });
      if (data.folder_id) {
        queryClient.invalidateQueries({ queryKey: ['notes', 'folder', data.folder_id] });
      }
    }
  });
}

export function useDeleteNote() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['notes', 'starred'] });
      queryClient.invalidateQueries({ queryKey: ['notes', 'recent'] });
    }
  });
}