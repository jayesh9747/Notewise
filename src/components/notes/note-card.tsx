'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Trash2, Star as StarEmpty } from 'lucide-react';
import type { Note } from '@/lib/supabase/client';

import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { useUpdateNote, useDeleteNote } from '@/hooks/use-notes';

interface NoteCardProps {
    note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
    const router = useRouter();
    const updateNoteMutation = useUpdateNote();
    const deleteNoteMutation = useDeleteNote();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleToggleStar = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        await updateNoteMutation.mutateAsync({
            id: note.id,
            note: { is_starred: !note.is_starred }
        });
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDeleting(true);

        try {
            await deleteNoteMutation.mutateAsync(note.id);
            router.refresh();
        } catch (error) {
            console.error('Failed to delete note:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Link href={`/notes/${note.id}`}>
            <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                        <CardTitle className="line-clamp-2">{note.title}</CardTitle>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleToggleStar}
                            className="h-8 w-8 text-amber-500"
                        >
                            {note.is_starred ? (
                                <Star className="h-5 w-5 fill-current" />
                            ) : (
                                <StarEmpty className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-500 line-clamp-3">
                        {note.content?.substring(0, 150) || "No content"}
                    </p>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                    <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className={cn("h-8 w-8 text-gray-500 hover:text-red-500",
                            isDeleting && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}