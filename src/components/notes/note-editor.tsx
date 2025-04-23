'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Star, Save, ArrowLeft, Trash2, FolderIcon, Clock } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

import type { Note } from '@/lib/supabase/client';
import { useFolders } from '@/hooks/use-folders';
import { useNote, useUpdateNote, useDeleteNote } from '@/hooks/use-notes';

interface NoteEditorProps {
    noteId: string;
}

export function NoteEditor({ noteId }: NoteEditorProps) {
    const router = useRouter();
    const { data: note, isLoading } = useNote(noteId);
    const updateNote = useUpdateNote();
    const deleteNote = useDeleteNote();
    const { data: folders } = useFolders();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [folderId, setFolderId] = useState('');
    const [isStarred, setIsStarred] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content || '');
            setFolderId(note.folder_id || '');
            setIsStarred(note.is_starred);
            if (note.updated_at) {
                setLastSaved(new Date(note.updated_at));
            }
        }
    }, [note]);

    const handleSave = async () => {
        if (!note) return;

        setIsSaving(true);
        try {
            await updateNote.mutateAsync({
                id: note.id,
                note: {
                    title,
                    content,
                    folder_id: folderId || null
                }
            });
            setLastSaved(new Date());
            toast.success('Note saved successfully');
        } catch (error) {
            console.error('Error saving note:', error);
            toast.error('Failed to save note');
        } finally {
            setIsSaving(false);
        }
    };

    const handleToggleStar = async () => {
        if (!note) return;

        try {
            await updateNote.mutateAsync({
                id: note.id,
                note: { is_starred: !isStarred }
            });
            setIsStarred(!isStarred);
            toast.success(isStarred ? 'Note removed from starred' : 'Note added to starred');
        } catch (error) {
            console.error('Error toggling star:', error);
            toast.error('Failed to update star status');
        }
    };

    const handleDelete = async () => {
        if (!note) return;

        if (!confirm('Are you sure you want to delete this note?')) {
            return;
        }

        setIsDeleting(true);
        try {
            await deleteNote.mutateAsync(note.id);
            toast.success('Note deleted successfully');
            router.push('/notes');
        } catch (error) {
            console.error('Error deleting note:', error);
            toast.error('Failed to delete note');
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <div className="animate-pulse text-lg font-medium">Loading note...</div>
            </div>
        );
    }

    if (!note) {
        return (
            <div className="flex flex-col justify-center items-center h-[70vh] space-y-4">
                <div className="text-xl font-medium text-red-500">Note not found</div>
                <Button onClick={() => router.push('/notes')}>Back to Notes</Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <Card className="border border-gray-100 shadow-md">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <Button variant="ghost" onClick={() => router.back()} className="gap-2 hover:bg-gray-100">
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleToggleStar}
                                className={`rounded-full ${isStarred ? 'text-yellow-500 hover:bg-yellow-50' : 'text-gray-400 hover:bg-gray-100'}`}
                                title={isStarred ? "Unstar note" : "Star note"}
                            >
                                <Star className={`h-5 w-5 ${isStarred ? 'fill-current' : ''}`} />
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleSave}
                                disabled={isSaving}
                                className="gap-2 bg-white hover:bg-gray-50"
                            >
                                <Save className="h-4 w-4" />
                                {isSaving ? 'Saving...' : 'Save'}
                            </Button>

                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="gap-2"
                            >
                                <Trash2 className="h-4 w-4" />
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Note title"
                            className="text-2xl  font-bold border-b-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 shadow-none rounded-none focus-visible:ring-0 px-4 py-3 transition-colors duration-200 mb-4 bg-gray-50 bg-opacity-30"
                        />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2">
                            <div className="flex items-center gap-2">
                                <FolderIcon className="h-4 w-4 text-gray-500" />
                                <Select value={folderId} onValueChange={setFolderId}>
                                    <SelectTrigger className="w-48 border-gray-200">
                                        <SelectValue placeholder="No folder" />
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
                            {lastSaved && (
                                <div className="flex items-center text-xs text-gray-500 gap-1">
                                    <Clock className="h-3 w-3" />
                                    Last saved: {format(lastSaved, 'MMM d, yyyy h:mm a')}
                                </div>
                            )}
                        </div>

                        <div className="relative mt-4">
                            <Textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write your note here..."
                                className="min-h-[400px] border rounded-lg p-4 resize-none text-gray-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}