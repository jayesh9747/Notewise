'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { Note } from '@/lib/supabase/client';
import { useFolders } from '@/hooks/use-folders';
import { useCreateNote, useUpdateNote } from '@/hooks/use-notes';

interface NoteFormProps {
  note?: Note;
  isEditing?: boolean;
}

export function NoteForm({ note, isEditing = false }: NoteFormProps) {
  const router = useRouter();
  const createNote = useCreateNote();
  const updateNote = useUpdateNote();
  const { data: folders } = useFolders();
  
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [folderId, setFolderId] = useState(note?.folder_id || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content || '');
      setFolderId(note.folder_id || '');
    }
  }, [note]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (isEditing && note) {
        await updateNote.mutateAsync({
          id: note.id,
          note: {
            title,
            content,
            folder_id: folderId || null
          }
        });
        
        toast.success('Note updated successfully');
        router.push(`/notes/${note.id}`);
      } else {
        const newNote = await createNote.mutateAsync({
          title,
          content,
          folder_id: folderId || null,
          is_starred: false
        });
        
        toast.success('Note created successfully');
        router.push(`/notes/${newNote.id}`);
      }
    } catch (error) {
      console.error('Error saving note:', error);
      toast.error('Failed to save note. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
          className="min-h-[300px]"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="folder">Folder</Label>
        <Select value={folderId} onValueChange={setFolderId}>
          <SelectTrigger id="folder">
            <SelectValue placeholder="Select a folder" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">No folder</SelectItem>
            {folders?.map((folder) => (
              <SelectItem key={folder.id} value={folder.id}>
                {folder.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Note' : 'Create Note'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}