'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { File, FilePlus, Star, StarOff } from 'lucide-react';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { useUpdateNote } from '@/hooks/use-notes';
import type { Note } from '@/lib/supabase/client';

interface NotesGridProps {
    notes: Note[] | undefined;
    emptyMessage: string;
    isLoading?: boolean;
}

export function NotesGrid({ notes, emptyMessage, isLoading = false }: NotesGridProps) {
    const pathname = usePathname();
    const updateNoteMutation = useUpdateNote();

    const toggleStar = (note: Note) => {
        updateNoteMutation.mutate({
            id: note.id,
            note: { is_starred: !note.is_starred }
        });
    };

    if (isLoading) {
        return <div className="flex justify-center p-8">Loading notes...</div>;
    }

    if (!notes || notes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <File className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">{emptyMessage}</p>
                <Link href="/notes/new">
                    <Button className="gap-2">
                        <FilePlus className="h-4 w-4" />
                        Create your first note
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {notes.map((note) => (
                <Card
                    key={note.id}
                    className={cn(
                        "h-full cursor-pointer hover:shadow-md transition-shadow",
                        pathname === `/notes/${note.id}` && "border-primary"
                    )}
                >
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                            <CardTitle className="flex items-center gap-2 truncate">
                                <File className="h-5 w-5 text-primary flex-shrink-0" />
                                <span className="truncate">{note.title}</span>
                            </CardTitle>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleStar(note);
                                }}
                            >
                                {note.is_starred ? (
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ) : (
                                    <StarOff className="h-4 w-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                            {note.content || 'No content'}
                        </p>
                    </CardContent>
                    <CardFooter className="pt-1">
                        <p className="text-xs text-muted-foreground">
                            {note.updated_at ? format(new Date(note.updated_at), 'MMM d, yyyy') : 'N/A'}
                        </p>
                    </CardFooter>
                    <Link href={`/notes/${note.id}`} className="absolute inset-0">
                        <span className="sr-only">View note</span>
                    </Link>
                </Card>
            ))}
        </div>
    );
}